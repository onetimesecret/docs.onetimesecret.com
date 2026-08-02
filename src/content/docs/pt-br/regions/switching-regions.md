---
title: Alterando Sua Região
---

O Onetime Secret usa uma [arquitetura de não compartilhamento](/pt-br/regions) em todas as cinco regiões (CA, EU, NZ, UK, US). Cada região opera como um sistema completamente separado, com seu próprio banco de dados, contas e mensagens. Não transferimos dados entre regiões em nenhuma circunstância.

Isso significa que mudar de região é menos uma "migração" e mais uma configuração do zero na região de sua preferência. A boa notícia: leva cerca de dois minutos, e sua assinatura é transferida automaticamente.

## Contas Gratuitas

Navegue diretamente até a região de sua preferência (consulte [Regiões Disponíveis](/pt-br/regions#regiões-disponíveis) para a lista completa) e crie uma nova conta com o mesmo endereço de e-mail. Pronto — sua nova conta está pronta para uso imediatamente.

## Contas Pagas (Identity Plus)

O processo é o mesmo das contas gratuitas, com uma etapa extra:

1. Acesse a URL da região de sua preferência (consulte [Regiões Disponíveis](/pt-br/regions#regiões-disponíveis))
2. Crie uma conta usando o mesmo endereço de e-mail associado à sua assinatura
3. Faça login e navegue até a página da sua conta
4. O status da sua assinatura será reconhecido automaticamente através do Stripe

Pode ser necessário atualizar a página uma vez para que a assinatura seja sincronizada. Isso funciona porque mantemos os dados separados entre regiões, enquanto sua relação de cobrança é gerenciada pelo Stripe, que reconhece seu endereço de e-mail em todas as regiões.

## O Que Acontece com Sua Conta Antiga

Sua conta na região anterior permanece totalmente funcional:

- Quaisquer links de mensagens existentes continuam funcionando até serem visualizados ou expirarem
- Sua conta permanece ativa caso você precise consultar algo
- Nenhuma ação é necessária na conta antiga, a menos que você queira encerrá-la

## Migração de Domínio Personalizado

Se você tiver um domínio personalizado configurado na sua região atual, o processo exige um pouco mais de planejamento. Como seus links de mensagens existentes usam os registros DNS do seu domínio personalizado, você não pode simplesmente apontar o domínio para a nova região sem quebrar os links que ainda não foram visualizados.

### Passo a passo

1. **Adicione um subdomínio temporário** à conta da sua nova região. Por exemplo, se seu domínio atual for `secrets.example.com`, adicione algo como `secrets-new.example.com` ou `secrets-us.example.com`.

2. **Crie um registro CNAME** para o subdomínio temporário apontando para o endpoint de identidade regional apropriado (por exemplo, `identity.us.onetime.co` para a região dos EUA). Consulte o [Guia de Configuração de Domínio Personalizado](/pt-br/custom-domains/setup-guide) para detalhes de configuração de DNS.

3. **Comece a usar o subdomínio temporário** para novas mensagens imediatamente.

4. **Após 30 dias**, quaisquer mensagens criadas no domínio antigo já terão expirado. Você pode então:
   - Remover o domínio personalizado da conta da sua região antiga
   - Adicionar seu subdomínio de preferência (por exemplo, `secrets.example.com`) à conta da sua nova região
   - Atualizar o registro CNAME para apontar para o endpoint da nova região
   - Verificar o domínio no painel da sua conta

5. **Remova** o subdomínio temporário assim que seu domínio de preferência estiver ativo e verificado.

### Por que 30 dias?

O tempo de vida máximo (TTL) de uma mensagem é de 30 dias. Aguardar esse período garante que todas as mensagens criadas sob a configuração DNS da região antiga tenham sido visualizadas ou expirado, de modo que atualizar o registro CNAME não quebrará nenhum link pendente.

Se você sabe que todas as suas mensagens existentes têm TTLs mais curtos ou já foram visualizadas, você pode fazer a mudança antes.

## Contas Sem Domínios Personalizados

Se você não usa um domínio personalizado, a mudança é imediata. Seus links antigos (usando as URLs regionais do onetimesecret.com, como `eu.onetimesecret.com/secret/abcd1234`) continuarão funcionando corretamente, independentemente da região em que sua conta ativa esteja.

## Múltiplas Regiões

Você pode manter contas em várias regiões simultaneamente. Todas as contas que usam o mesmo endereço de e-mail compartilham o mesmo status de assinatura. Isso pode ser útil se você atende usuários em diferentes áreas geográficas e deseja minimizar a latência ou atender a requisitos de residência de dados.

## Instâncias dedicadas

Clientes com instâncias dedicadas devem entrar em contato conosco em [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) para mudanças de região, já que a infraestrutura dedicada requer reconfiguração manual. Você também pode entrar em contato conosco através da [página de feedback](https://onetimesecret.com/feedback).
