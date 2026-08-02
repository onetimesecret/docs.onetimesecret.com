---
title: Reino Unido (UK)
description: A região de data center do Onetime Secret no Reino Unido, localizada em London.
---

## Infraestrutura

- **Localização**: London, Reino Unido
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Provedor de hospedagem**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finlândia)
- **CNAME de domínio personalizado**: `identity.ingress.onetime.co` (anycast)

## DNS de Domínio Personalizado

Para apontar um domínio personalizado para esta região, crie um registro CNAME:

| Tipo de registro | Host                  | Valor                         |
| ----------------- | --------------------- | ------------------------------ |
| CNAME             | `secrets.example.com` | `identity.ingress.onetime.co` |

Observe que a região do Reino Unido usa um CNAME anycast em vez de um subdomínio específico da região.

Consulte o [Guia de Configuração de Domínio Personalizado](/pt-br/custom-domains/setup-guide) para instruções completas.

## Ambiente Regulatório

O framework de proteção de dados do Reino Unido é regido pelo **UK General Data Protection Regulation (UK GDPR)** e pelo **Data Protection Act 2018**. Após o Brexit, o Reino Unido mantém seu próprio regime de proteção de dados, que permanece estreitamente alinhado com o GDPR da UE.

### Sobre o provedor de hospedagem

Esta região é hospedada pela <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, uma provedora europeia de infraestrutura de nuvem fundada em 2011 e sediada em Helsinki, Finlândia. Como provedora europeia soberana, todos os dados relacionados à conta são armazenados exclusivamente na Finlândia, sob as regulamentações finlandesas e da UE de proteção de dados. A UpCloud opera data centers em múltiplas localidades europeias, incluindo London, que hospeda esta região.

### Principais aspectos regulatórios

- O Information Commissioner's Office (ICO) atua como autoridade de supervisão independente
- O UK GDPR mantém os princípios e direitos essenciais do GDPR da UE, incluindo os direitos dos titulares dos dados e os requisitos de base legal
- O Reino Unido possui uma decisão de adequação da Comissão Europeia, permitindo que os dados fluam livremente a partir da UE/EEE
- O Data Protection Act 2018 complementa o UK GDPR com disposições específicas para as autoridades policiais e os serviços de inteligência do Reino Unido

## Quando Considerar Esta Região

- Sua organização ou usuários estão baseados principalmente no Reino Unido
- Você precisa cumprir o UK GDPR e o Data Protection Act 2018
- Você deseja residência de dados dentro do Reino Unido
- Você atende clientes que exigem processamento de dados baseado no Reino Unido
