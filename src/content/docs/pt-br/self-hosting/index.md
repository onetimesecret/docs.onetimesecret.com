---
title: Visão Geral de Auto-Hospedagem
description: Guia completo para executar sua própria instância do Onetime Secret
sidebar:
  order: 1
---

Execute sua própria instância privada do Onetime Secret com controle total sobre seus dados, segurança e implantação.

:::caution[Março de 2026 — Documentação de auto-hospedagem em transição]
Estamos no meio da transição entre **v0.23** e **v0.24** (a branch `main`). Parte da nossa documentação de auto-hospedagem está desatualizada e estamos [trabalhando ativamente para melhorá-la](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Se você só quer colocar algo para funcionar**, recomendamos a branch `rel/0.23`. Ela precisa apenas de algumas variáveis de ambiente e Redis, e ainda estamos publicando correções e pequenas atualizações nela.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Por Que Auto-Hospedar?

Auto-hospedar o Onetime Secret oferece:

- **Controle completo de dados** - Todas as mensagens permanecem em sua infraestrutura e rede
- **Políticas de segurança personalizadas** - Configure autenticação, opções de privacidade e controles de acesso
- **Conformidade** - Atenda requisitos regulatórios para tratamento de dados
- **Marca personalizada** - Personalize a interface para sua organização

## Opções de Início Rápido

Escolha o método de implantação que melhor se adequa ao seu ambiente:

### Docker (Recomendado)
```bash
# Inicie Redis e Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.25.0
```

Acesse em `http://localhost:3000`.

### Instalação Manual
Para ambientes de produção que requerem configurações personalizadas.

Consulte nosso guia [Instalação e Implantação](./installation) para etapas detalhadas.

## O Que Está Incluído

Sua instância auto-hospedada inclui:

- **Interface web** - UI completa para criar e compartilhar mensagens
- **API REST** - Acesso programático para integrações
- **Suporte multilíngue** - Disponível em mais de 12 idiomas
- **Domínios personalizados** - Use seu próprio domínio e marca

## Requisitos do Sistema

**Recomendado:**
- 2+ núcleos de CPU
- 2GB+ de RAM
- 10GB+ de espaço em disco
- Redis para armazenamento de sessão
- Node.js 22+ (para desenvolvimento)

## Próximos Passos

1. **[Primeiros Passos](./getting-started)** - Guia de configuração passo a passo
2. **[Instalação e Implantação](./installation)** - Opções detalhadas de implantação
3. **[Referência de Configuração](./configuration)** - Documentação completa de configurações

---

_Pronto para começar? Siga nosso guia [Primeiros Passos](./getting-started)._
