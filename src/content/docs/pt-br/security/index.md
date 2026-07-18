---
title: Segurança e Confiança
description: Como o Onetime Secret protege suas mensagens confidenciais — o modelo de segurança, o tratamento de dados, a residência regional e como relatar uma vulnerabilidade.
---

O Onetime Secret existe para levar informações sensíveis de uma pessoa a outra sem deixá-las espalhadas por caixas de entrada, históricos de chat ou sistemas de tickets. Esta seção explica como o serviço foi construído para fazer isso com segurança e onde encontrar os detalhes.

## O Modelo de Segurança em Resumo

- **Acesso único.** Uma mensagem confidencial é projetada para ser visualizada uma única vez e depois destruída permanentemente. Depois de lida (ou expirada), ela desaparece.
- **Criptografia em trânsito e em repouso.** As mensagens confidenciais são criptografadas em trânsito e em repouso em todos os planos.
- **Proteção por frase secreta.** Você pode exigir uma frase secreta para visualizar uma mensagem confidencial, adicionando uma camada que o link sozinho não consegue desbloquear.
- **Tempo limitado por design.** Cada mensagem confidencial tem um prazo de expiração; escolha o menor tempo de vida prático para minimizar a exposição.
- **Queimar antes da leitura.** Se uma mensagem confidencial ainda não foi visualizada, você pode queimá-la para que nunca possa ser lida.
- **Minimização de dados.** Buscamos coletar e reter apenas o necessário — veja [Minimização de Dados](/pt-br/principles/data-minimization).

## Explore Esta Seção

- **[Proteção de Dados](/pt-br/security/data-protection)** — o que armazenamos, por quanto tempo, onde os dados ficam e como isso se relaciona com suas necessidades de conformidade.
- **[Melhores Práticas de Segurança](/pt-br/security-best-practices)** — orientações práticas para compartilhar mensagens confidenciais com segurança, incluindo os benefícios dos Domínios Personalizados.
- **[Divulgação de Vulnerabilidades](/pt-br/security/vulnerability-disclosure)** — como relatar um problema de segurança de forma responsável.

## Relacionados

- **[Nossos Princípios](/pt-br/principles)** — Privacidade em Primeiro Lugar, Comunicação e Minimização de Dados.
- **[Regiões de Data Center](/pt-br/regions)** — escolha onde seus dados são processados e armazenados.
- **[Auto-hospedagem](https://github.com/onetimesecret/onetimesecret)** — execute o Onetime Secret na sua própria infraestrutura para ter controle total.

## Relatando um Problema de Segurança

Se você acredita ter encontrado uma vulnerabilidade, entre em contato com nossa equipe de segurança pelo e-mail **security@onetimesecret.com**. Veja [Divulgação de Vulnerabilidades](/pt-br/security/vulnerability-disclosure) para saber o que incluir e o que esperar.
