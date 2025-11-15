---
title: Variáveis de Ambiente
description: Referência de variáveis de ambiente para configuração do Onetime Secret
sidebar:
  order: 5
---

# Variáveis de Ambiente

Esta página documenta as variáveis de ambiente disponíveis para configurar sua instância auto-hospedada do Onetime Secret.

## Variáveis Essenciais

### SECRET
- **Obrigatório**: Sim
- **Descrição**: Chave secreta para criptografia de sessão
- **Exemplo**: `SECRET=$(openssl rand -hex 32)`

### REDIS_URL
- **Obrigatório**: Sim
- **Descrição**: URL de conexão para o servidor Redis
- **Exemplo**: `REDIS_URL=redis://localhost:6379/0`

### HOST
- **Obrigatório**: Não
- **Descrição**: Nome do host para a aplicação
- **Padrão**: `localhost:3000`
- **Exemplo**: `HOST=onetimesecret.exemplo.com`

### SSL
- **Obrigatório**: Não
- **Descrição**: Habilitar/desabilitar SSL
- **Padrão**: `true`
- **Valores**: `true`, `false`

### RACK_ENV
- **Obrigatório**: Não
- **Descrição**: Ambiente de execução
- **Padrão**: `development`
- **Valores**: `development`, `production`

## Documentação Completa

Para uma lista completa de variáveis de ambiente e opções de configuração avançadas, consulte:

- [Documentação do GitHub](https://github.com/onetimesecret/onetimesecret/tree/main/docs)
- [Arquivo de configuração de exemplo](https://github.com/onetimesecret/onetimesecret/blob/main/etc/config.example.yaml)

## Suporte

Para dúvidas sobre configuração:
- [GitHub Discussions](https://github.com/onetimesecret/onetimesecret/discussions)
- [Issue Tracker](https://github.com/onetimesecret/onetimesecret/issues)
