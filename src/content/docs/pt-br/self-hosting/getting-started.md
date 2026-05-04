---
title: Primeiros Passos
description: Guia de configuração rápida para colocar sua instância auto-hospedada do Onetime Secret em funcionamento
sidebar:
  order: 2
---

Este guia colocará você em funcionamento com uma instância auto-hospedada do Onetime Secret em minutos.

## Pré-requisitos

- **1GB+ de RAM** para desempenho ideal
- **Nota sobre armazenamento Redis**: Dependendo da sua configuração do Redis, mensagens podem ser armazenadas inteiramente na memória sem nunca serem gravadas em disco para segurança aprimorada

## Método 1: Docker (Recomendado)

A maneira mais rápida de começar usa Docker com configuração mínima.

### 1. Iniciar Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Gerar Chave Secreta

```bash
# Gerar e armazenar uma chave secreta persistente
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Chave secreta salva em .ots_secret (mantenha este arquivo seguro!)"
```

### 3. Executar Onetime Secret

```bash
# Execute o container usando a chave secreta
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Acessar Sua Instância

Abra seu navegador em:
- **Interface Web**: http://localhost:3000
- **Endpoint da API**: http://localhost:3000/api/v2/status

## Método 2: Instalação Manual

Para aqueles que preferem configuração manual, você precisará:

- **Ruby 3.2+** (pode não estar disponível em pacotes de sistema padrão)
- **Redis 5+** ou **Valkey** (alternativa ao Redis)
- **Node.js 22+** e **pnpm** (necessário apenas para desenvolvimento e construção de assets frontend)

Você precisará construir os assets frontend com `pnpm install && pnpm run build:local` antes de executar a aplicação.

Consulte [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) para detalhes completos de instalação manual.

## Verificação

1. Navegue até http://localhost:3000
2. Crie uma mensagem de teste para verificar se tudo funciona
3. Verifique o status da API em http://localhost:3000/api/v2/status

## Configuração de Administrador

Para criar um usuário administrador, adicione endereços de e-mail à seção `:colonels:` no seu arquivo de configuração, então cadastre-se com um desses e-mails para obter automaticamente acesso de administrador.

**Nota**: A área de administrador atualmente tem funcionalidade limitada - é visualização readonly de configuração sem gerenciamento de usuários. Mais recursos estão planejados para versões futuras.

## Próximos Passos

Agora que sua instância está em execução:

1. **[Configure sua implantação](./installation)** para uso em produção
2. **[Revise opções de configuração](./configuration)** para personalização

## Obtendo Ajuda

- **Documentação**: Navegue nossa [referência de configuração](./configuration)
- **Comunidade**: Participe de discussões no [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Issues**: Relate bugs em nosso [rastreador de issues](https://github.com/onetimesecret/onetimesecret/issues)
