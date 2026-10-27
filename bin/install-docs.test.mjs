import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdtempSync, statSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const docker = readFileSync(new URL('../src/content/docs/en/install/docker.md', import.meta.url), 'utf8');
const upgrade = readFileSync(new URL('../src/content/docs/en/self-hosting/upgrading-v0-24.md', import.meta.url), 'utf8');
const blocks = source => [...source.matchAll(/```bash\n([\s\S]*?)```/g)].map(match => match[1]);
const bootstrap = blocks(docker).find(block => block.includes('cp .env.example .env'));
const createKey = source => blocks(source).find(block => block.includes('set -C; openssl'));
const start = blocks(docker).find(block => block.includes('if [ -s .ots_secret ]'));

function fixture(run) {
  const dir = mkdtempSync(join(tmpdir(), 'ots-install-docs-'));
  try { run(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
}
function shell(script, cwd) {
  return spawnSync('/bin/bash', ['-c', script], { cwd, encoding: 'utf8' });
}

describe('published Docker setup commands', () => {
  it('copies the quick-start template privately, including its blank keys', () => fixture(dir => {
    const template = 'SECRET=\nACCOUNT_ID_SECRET=\n';
    writeFileSync(join(dir, '.env.example'), template);
    expect(shell(bootstrap, dir).status).toBe(0);
    expect(readFileSync(join(dir, '.env'), 'utf8')).toBe(template);
    expect(statSync(join(dir, '.env')).mode & 0o777).toBe(0o600);
  }));

  it.each(['SECRET=\nACCOUNT_ID_SECRET=\n', 'SECRET=existing-root\nVALKEY_PASSWORD=existing-password\n'])(
    'preserves an existing configuration across repeated setup: %s', config => fixture(dir => {
      writeFileSync(join(dir, '.env.example'), 'SECRET=\n');
      writeFileSync(join(dir, '.env'), config);
      expect(shell(bootstrap, dir).status).toBe(0);
      expect(shell(bootstrap, dir).status).toBe(0);
      expect(readFileSync(join(dir, '.env'), 'utf8')).toBe(config);
    }),
  );

  it.each([['Docker', docker], ['v0.24', upgrade]])(
    '%s key creation refuses to overwrite either a populated or empty file', (_, source) => fixture(dir => {
      expect(createKey(source)).toBeTruthy();
      expect(shell(createKey(source), dir).status).toBe(0);
      const original = readFileSync(join(dir, '.ots_secret'), 'utf8');
      expect(original).toMatch(/^[a-f0-9]{64}\n$/);
      expect(statSync(join(dir, '.ots_secret')).mode & 0o777).toBe(0o600);
      expect(shell(createKey(source), dir).status).not.toBe(0);
      expect(readFileSync(join(dir, '.ots_secret'), 'utf8')).toBe(original);
      writeFileSync(join(dir, '.ots_secret'), '');
      expect(shell(createKey(source), dir).status).not.toBe(0);
      expect(readFileSync(join(dir, '.ots_secret'), 'utf8')).toBe('');
    }),
  );

  it.each(['missing', 'empty'])('refuses container startup with a %s root key', state => fixture(dir => {
    if (state === 'empty') writeFileSync(join(dir, '.ots_secret'), '');
    const result = shell('docker() { touch docker-was-called; }\n' + start, dir);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('restore the original key');
    expect(existsSync(join(dir, 'docker-was-called'))).toBe(false);
  }));

  it('passes the preserved key to repeated container creation', () => fixture(dir => {
    writeFileSync(join(dir, '.ots_secret'), 'fixture-root-key\n');
    const script = 'docker() { printf "%s\\n" "$@" > docker-args; }\n' + start;
    for (let run = 0; run < 2; run++) {
      expect(shell(script, dir).status).toBe(0);
      expect(readFileSync(join(dir, 'docker-args'), 'utf8')).toContain('SECRET=fixture-root-key\n');
      expect(readFileSync(join(dir, '.ots_secret'), 'utf8')).toBe('fixture-root-key\n');
    }
  }));
});
