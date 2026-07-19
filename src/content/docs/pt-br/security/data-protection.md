---
title: Proteção de Dados
description: O que o Onetime Secret armazena, por quanto tempo, onde os dados são processados e como isso apoia suas obrigações de conformidade.
---

Esta página descreve como o Onetime Secret trata seus dados: o que é armazenado, por quanto tempo, onde os dados ficam e como isso apoia seu próprio programa de conformidade.

## O Que Armazenamos e Por Quanto Tempo

- **O conteúdo confidencial** é criptografado e destinado a uma única recuperação. Quando uma mensagem confidencial é visualizada — ou atinge sua expiração — ela é destruída permanentemente.
- **A expiração é integrada.** Cada mensagem confidencial tem um tempo de vida (configurável dentro dos limites do seu plano); nada foi feito para durar indefinidamente.
- **Metadados mínimos.** Em linha com nosso princípio de [Minimização de Dados](/pt-br/principles/data-minimization), buscamos manter apenas os metadados necessários para operar o serviço.

## Criptografia

As mensagens confidenciais são **criptografadas em trânsito e em repouso** em todos os planos. O transporte é protegido com TLS e, para domínios personalizados, gerenciamos automaticamente a emissão e a renovação de certificados SSL/TLS.

Para materiais especialmente sensíveis, você pode adicionar defesa em profundidade ativando uma **frase secreta**, dividindo as informações entre várias mensagens confidenciais e escolhendo a menor expiração prática — veja [Melhores Práticas de Segurança](/pt-br/security-best-practices).

## Onde Seus Dados São Processados (Residência)

Você pode escolher a região onde seus dados são processados e armazenados — atualmente UE, Reino Unido, EUA, Canadá e Nova Zelândia. Isso permite manter os dados perto dos seus usuários e dentro de uma jurisdição adequada aos seus requisitos. Veja [Regiões de Data Center](/pt-br/regions) para detalhes e endpoints.

## Conformidade

O Onetime Secret foi projetado para apoiar seus esforços de conformidade; ele não substitui seus próprios controles, políticas e análise jurídica.

- **GDPR / proteção de dados.** A residência regional de dados, os dados de curta duração e a minimização de dados foram pensados para ajudar você a cumprir obrigações de proteção de dados. Na maioria das implantações, você atua como controlador dos dados, e o Onetime Secret, como operador para os dados limitados envolvidos.
- **HIPAA.** Como observado em nossos [casos de uso](/pt-br/custom-domains/use-cases), o Onetime Secret pode oferecer um canal mais seguro que o e-mail para a troca de credenciais de acesso iniciais, mas deve ser usado como medida provisória, e não como sistema de registro permanente para PHI. Combine-o com um sistema dedicado e em conformidade para fluxos de trabalho contínuos com PHI.
- **Certificações, DPAs e marcos regulatórios específicos.** Para dúvidas sobre certificações, um Acordo de Processamento de Dados (DPA) ou um marco regulatório específico, entre em contato com **support@onetimesecret.com**.

Para organizações com requisitos rígidos de controle de dados, a [auto-hospedagem](https://github.com/onetimesecret/onetimesecret) mantém tudo dentro da sua própria infraestrutura.

## Dúvidas ou Precisa de Suporte?

Estamos aqui para ajudar.

- Geral: support@onetimesecret.com
- Problemas de segurança: security@onetimesecret.com ([política de divulgação](/pt-br/security/vulnerability-disclosure))
