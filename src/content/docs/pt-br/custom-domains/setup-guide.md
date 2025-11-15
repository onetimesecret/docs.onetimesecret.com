---
title: Guia de Configuração
description: Este guia orientará você no processo de configuração de um domínio personalizado para sua conta do Onetime Secret, incluindo as diferenças entre subdomínios e domínios apex, e escolhendo sua região de data center preferida.
---

# Guia de Configuração de Domínio Personalizado

## Pré-requisitos

- Uma conta ativa do Onetime Secret com recurso de domínio personalizado habilitado
- Um domínio que você possui e pode gerenciar configurações de DNS

## Entendendo Tipos de Domínio

Antes de configurar seu domínio personalizado, é importante entender a diferença entre subdomínios e domínios apex:

1. **Subdomínio**: Uma subdivisão do seu domínio principal (por exemplo, secrets.seudominio.com)
2. **Domínio Apex**: O domínio raiz em si (por exemplo, seudominio.com)

## Escolha Sua Região

O Onetime Secret oferece duas regiões de data center: EU e EUA. Ao configurar seu domínio personalizado, você precisará escolher qual região prefere para armazenar seus dados. Esta escolha é importante por várias razões:

- **Para Indivíduos**: Você pode escolher com base em sua preferência pessoal, como proximidade para acesso potencialmente mais rápido ou preocupações pessoais com soberania de dados.
- **Para Empresas**: Sua escolha pode depender de suas obrigações de localidade de dados, como conformidade com GDPR, diretrizes estaduais ou provinciais. Certifique-se de selecionar a região que melhor se alinha com seus requisitos regulatórios.

Considere suas necessidades e requisitos específicos ao fazer esta escolha. Para informações mais detalhadas sobre nossas regiões de data center e como escolher a certa para suas necessidades, consulte nosso guia [Regiões de Data Center](/pt-br/regions).

## Passo 1: Acessar Painel de Domínios

1. Faça login na sua conta do Onetime Secret
2. Navegue até Painel > Domínios Personalizados
3. Clique em "Adicionar Domínio"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Visualização de domínios personalizados" width="400" />

## Passo 2: Digite Seu Domínio

1. Nas configurações de domínio personalizado, digite seu domínio desejado (por exemplo, secrets.seudominio.com ou seudominio.com)
2. Clique em "Adicionar Domínio" ou botão equivalente para prosseguir

## Passo 3: Configurar Configurações de DNS

Para conectar seu domínio, você precisa atualizar suas configurações de DNS. O processo difere ligeiramente dependendo se você está usando um subdomínio ou um domínio apex, e qual região de data center você escolhe.

### Para Subdomínios (Recomendado)

1. Acesse o painel de gerenciamento de DNS do seu domínio (através do seu registrador de domínio ou provedor de DNS)
2. Crie um registro CNAME com os seguintes detalhes:
   - Host: Seu subdomínio escolhido (por exemplo, secrets)
   - Aponta para / Valor:
     - Para região EU: identity.eu.onetime.co
     - Para região EUA: identity.us.onetime.co
3. Remova quaisquer registros A, AAAA ou CNAME existentes para o mesmo subdomínio

### Para Domínios Apex

1. Acesse o painel de gerenciamento de DNS do seu domínio
2. Crie ou modifique um registro A com os seguintes detalhes:
   - Host: @ (ou deixe em branco, dependendo do seu provedor de DNS)
   - Aponta para / Valor:
     - Para região EU: 109.105.217.207
     - Para região EUA: 66.51.126.41

Importante: Certifique-se de que não há registros conflitantes para o domínio que você está usando.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Configurações de domínio personalizado" width="400" />

### Mais Informações

#### Por Que CNAME para Subdomínios?

Recomendamos usar registros CNAME para subdomínios porque:

1. Eles são mais flexíveis e nos permitem alterar nossos endereços IP de servidor sem exigir que você atualize suas configurações de DNS.
2. Eles se adaptam automaticamente a quaisquer alterações que fazemos em nossa infraestrutura.

#### Por Que Registros A para Domínios Apex?

Domínios apex não podem usar registros CNAME devido aos padrões DNS. Portanto, devemos usar registros A, que têm algumas limitações:

1. Se alterarmos nosso endereço IP (o que é raro), você precisará atualizar suas configurações de DNS manualmente.
2. Eles não se adaptam automaticamente a alterações em nossa infraestrutura.

## Passo 4: Verificar Domínio e Aguardar SSL

1. Após atualizar as configurações de DNS, retorne à página de domínio personalizado do Onetime Secret
2. O sistema tentará verificar automaticamente seu domínio
3. A geração do certificado SSL começará assim que a verificação for bem-sucedida
4. Este processo pode levar alguns minutos para ser concluído

## Passo 5: Confirmar Configuração

Uma vez concluída a configuração, você deverá ver as seguintes informações:

- Status do Domínio: Ativo com SSL
- Endereço de Destino: identity.eu.onetime.co ou identity.us.onetime.co (dependendo da sua região escolhida)
- Status SSL: Ativo
- Data de Renovação SSL: (Será exibida, tipicamente cerca de um ano após a configuração)

## Solução de Problemas

- Se a verificação falhar, verifique novamente suas configurações de DNS
- Certifique-se de ter removido quaisquer registros conflitantes
- A propagação de DNS pode levar até 24 horas, embora geralmente seja muito mais rápida

## Usando Seu Domínio Personalizado

Uma vez ativo, seus links de mensagens usarão seu domínio personalizado. Por exemplo:
`https://secrets-example.onetime.dev/secret/abc123`

## Nós Cuidamos de Você

Cuidamos do resto dos detalhes técnicos para que você não precise.

- Monitoramos continuamente o status do seu domínio
- Certificados SSL são renovados automaticamente sem qualquer ação necessária de sua parte

Para aqueles que gostam de se manter informados, você pode facilmente verificar a saúde do seu domínio:

- Basta olhar o timestamp "Último Monitoramento" no seu painel para confirmar a conectividade contínua

## Dúvidas ou Precisa de Suporte?

Estamos aqui para ajudar. Se você tiver alguma dúvida ou precisar de assistência:

- Envie-nos um e-mail diretamente para support@onetimesecret.com
- Use nosso formulário de feedback em https://onetimesecret.com/feedback

Nossa equipe está comprometida em fornecer o melhor suporte possível para a configuração e uso do seu domínio personalizado, incluindo orientação sobre a escolha da região de data center certa para suas necessidades.
