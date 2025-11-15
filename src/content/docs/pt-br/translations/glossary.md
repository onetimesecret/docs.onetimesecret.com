---
title: Glossário
description: Um guia de referência para traduzir os termos-chave, elementos de interface e vocabulário técnico do Onetime Secret para manter a consistência no português do Brasil
---

# Glossário de Tradução do Onetime Secret

Este glossário fornece traduções padronizadas para termos-chave no idioma português do Brasil (pt-BR) para garantir consistência na aplicação Onetime Secret.

## Terminologia Principal

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| secret (substantivo) | mensagem confidencial / conteúdo confidencial | Conceito central da aplicação |
| secret (adjetivo) | confidencial / secreto | |
| passphrase | frase secreta | Método de autenticação para segredos |
| password | senha | Credencial de login da conta |
| burn | queimar | Ação para excluir um segredo antes de visualizar |
| view/reveal | visualizar/exibir | Ação para acessar um segredo |
| link | link | O URL que fornece acesso a um segredo |
| encrypt/encrypted | criptografar/criptografado | Método de segurança |
| secure | seguro | Estado de proteção |

## Elementos da Interface do Usuário

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| Share a secret | Compartilhar mensagem confidencial | Ação principal |
| Create Account | Criar conta | Registro |
| Sign In | Entrar | Autenticação |
| Dashboard | Painel | Página principal do usuário |
| Settings | Configurações | Página de configuração |
| Privacy Options | Opções de privacidade | Configurações de segredo |
| Feedback | Feedback | Comentários do usuário |

## Termos de Status

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| received | recebido | Segredo foi visualizado |
| burned | queimado | Segredo foi excluído antes da visualização |
| expired | expirado | Segredo não está mais disponível devido ao tempo |
| created | criado | Segredo foi gerado |
| active | ativo | Segredo está disponível |
| inactive | inativo | Segredo não está disponível |

## Termos Relacionados ao Tempo

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| expires in | expira em | Tempo até o segredo não estar mais disponível |
| day/days | dia/dias | Unidade de tempo |
| hour/hours | hora/horas | Unidade de tempo |
| minute/minutes | minuto/minutos | Unidade de tempo |
| second/seconds | segundo/segundos | Unidade de tempo |

## Recursos de Segurança

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| one-time access | acesso único | Recurso de segurança principal |
| passphrase protection | proteção por frase secreta | Segurança adicional |
| encrypted in transit | criptografado em trânsito | Método de proteção de dados |
| encrypted at rest | criptografado em repouso | Proteção de armazenamento |

## Termos Relacionados à Conta

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| email | e-mail | Identificador do usuário |
| password | senha | Autenticação |
| account | conta | Perfil do usuário |
| subscription | assinatura | Serviço pago |
| customer | cliente | Usuário pagante |

## Termos Relacionados ao Domínio

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| custom domain | domínio personalizado | Recurso premium |
| domain verification | verificação de domínio | Processo de configuração |
| DNS record | registro DNS | Configuração |
| CNAME record | registro CNAME | Configuração de DNS |

## Mensagens de Erro

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| error | erro | Notificação de problema |
| warning | aviso | Notificação de cuidado |
| oops | ops | Introdução de erro amigável |

## Botões e Ações

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| submit | enviar | Ação de submissão |
| cancel | cancelar | Ação negativa |
| confirm | confirmar | Ação positiva |
| copy to clipboard | copiar para área de transferência | Ação utilitária |
| continue | continuar | Navegação |
| back | voltar | Navegação |

## Termos de Marketing

| Inglês | Português (BR) | Contexto |
|---------|----------------|----------|
| secure links | links seguros | Recurso do produto |
| privacy-first design | design com privacidade em primeiro lugar | Filosofia de design |
| custom branding | marca personalizada | Recurso premium |

## Diretrizes de Tradução

1. **Consistência**: Use a mesma tradução para um termo em toda a aplicação
2. **Contexto**: Considere como o termo é usado na aplicação
3. **Adaptação Cultural**: Adapte termos às convenções locais quando necessário
4. **Precisão Técnica**: Certifique-se de que os termos de segurança sejam traduzidos com precisão
5. **Tom**: Mantenha um tom profissional, mas direto

## Considerações Especiais

### Distinção Crucial: "Secret" vs "Segredo"

O termo "secret" é central para a aplicação e deve ser traduzido consistentemente como **"mensagem confidencial"** ou **"conteúdo confidencial"** em vez de simplesmente "segredo", para evitar conotações de informações pessoais.

✅ Correto:
- "Criar mensagem confidencial"
- "Visualizar conteúdo confidencial"
- "3 novas mensagens confidenciais"

❌ Incorreto:
- "Criar segredo" (implica segredo pessoal)
- "Visualizar segredo"
- "3 novos segredos"

### Distinção Password vs Passphrase

- **Senha**: Apenas para login de conta
- **Frase secreta**: Apenas para proteção de mensagens individuais

✅ Correto:
- "Digite sua senha para entrar na conta"
- "Proteja com uma frase secreta"

❌ Incorreto:
- Usar "senha" para ambos os conceitos

### Termos Técnicos

Termos técnicos relacionados à segurança devem priorizar precisão sobre localização:
- encryption → criptografia (não "encriptação")
- hash → hash (manter em inglês)
- API → API (manter em inglês)
- DNS → DNS (manter em inglês)

### Elementos de Interface

Elementos de interface devem seguir convenções da plataforma para português do Brasil:
- Use "Entrar" em vez de "Login" ou "Logar"
- Use "Sair" em vez de "Logout"
- Use "Configurações" em vez de "Ajustes" ou "Opções"
