---
title: Regiões de Data Center
description: Saiba mais sobre as regiões de data center do Onetime Secret e como escolher a certa para suas necessidades.
---

O Onetime Secret oferece cinco regiões de data center: Canadá (CA), União Europeia (EU), Aotearoa Nova Zelândia (NZ), Reino Unido (UK) e Estados Unidos (US). Este guia ajudará você a entender a importância da seleção de região e como escolher a certa para suas necessidades.

## Por Que a Seleção de Região Importa

Escolher a região de data center correta é fundamental por várias razões:

1. **Soberania de Dados**: Diferentes regiões têm diferentes leis e regulamentos de proteção de dados.
2. **Latência**: Escolher uma região mais próxima da sua base de usuários principal pode reduzir a latência.
3. **Conformidade**: Algumas organizações têm requisitos específicos sobre onde seus dados podem ser armazenados.

## Regiões Disponíveis

| Região | Localização | URL |
|--------|----------|-----|
| [Canadá (CA)](/pt-br/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [União Europeia (EU)](/pt-br/regions/european-union) | Nuremberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nova Zelândia (NZ)](/pt-br/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Reino Unido (UK)](/pt-br/regions/united-kingdom) | London | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Estados Unidos (US)](/pt-br/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Cada página de região inclui detalhes sobre o ambiente regulatório local e sobre quando essa região pode ser relevante para o seu caso de uso.

## Arquitetura de Não Compartilhamento

O Onetime Secret emprega uma arquitetura de não compartilhamento, garantindo isolamento completo de dados entre regiões:

- **Contas Separadas**: Criar uma conta em qualquer domínio regional é totalmente separado de contas em outros domínios, mesmo que você use o mesmo endereço de e-mail.
- **Sem Operações entre Centros**: Você não pode realizar operações (como queimar uma mensagem) entre data centers. Cada centro mantém seu próprio conjunto de mensagens e dados de usuário.
- **Faturamento Consistente para Usuários Pagos**: Para contas pagas, embora nenhum dado de usuário seja compartilhado entre centros, o status da sua assinatura é reconhecido em todas as regiões através do nosso provedor de pagamento, Stripe.

## Como Escolher Sua Região

Considere os seguintes fatores ao selecionar sua região de data center:

### Sem Conta

- Solicitações para onetimesecret.com podem ser roteadas para qualquer data center ativo.
- Você pode escolher uma região específica navegando diretamente para um domínio regional (por exemplo, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- O link gerado sempre identifica a região (por exemplo, `us.onetimesecret.com/secret/abcd1234`).

### Com Conta

- Ao criar uma conta, você escolhe uma região de data center. Todos os planos — gratuitos e pagos — têm acesso a todas as regiões.
- Você faz login no mesmo domínio regional em que se cadastrou (por exemplo, se você se registrou em `eu.onetimesecret.com`, é lá que você faz login).

### Considerações Adicionais

1. **Para Indivíduos**:
   - Preferência pessoal
   - Proximidade com sua localização para acesso potencialmente mais rápido
   - Preocupações pessoais com soberania de dados

2. **Para Empresas**:
   - Requisitos legais e regulatórios
   - Localização da sua base de clientes principal
   - Necessidades de conformidade específicas do setor

3. **Considerações Técnicas**:
   - Requisitos de latência para sua aplicação
   - Integração com outros serviços ou sistemas

## Planos Futuros

Estamos trabalhando continuamente para expandir nossas opções de data center. Os planos futuros incluem localizações adicionais de data center em:

- Austrália
- Brasil
- Japão
- México
- Noruega
- Coreia do Sul

Essas expansões fornecerão ainda mais opções de localidade de dados, melhorando o desempenho e as capacidades de conformidade para usuários em diferentes regiões.


## Perguntas Frequentes

**P: Posso mudar minha região depois de configurar minha conta?**
R: Sim. Consulte [Alterando Sua Região](/pt-br/regions/switching-regions) para instruções passo a passo cobrindo contas gratuitas, assinaturas pagas e migração de domínio personalizado.

**P: Minha escolha de região afeta a segurança das minhas mensagens?**
R: Não, todas as regiões oferecem o mesmo alto nível de segurança. A escolha afeta principalmente a residência de dados e a latência potencial.

**P: Existem diferenças de preço entre regiões?**
R: Os preços são específicos para cada região — você pode pagar na sua moeda local, e o Stripe cuida da conversão de moeda automaticamente. Os planos Identity Plus incluem domínios personalizados ilimitados em todos os data centers sob uma única assinatura. Confira nossa [página de preços](https://onetimesecret.com/pricing) para as informações mais atualizadas.

## Precisa de Ajuda?

Se você não tiver certeza sobre qual região escolher ou tiver alguma dúvida, não hesite em entrar em contato com nossa equipe de suporte. Estamos aqui para ajudá-lo a tomar a melhor decisão para suas necessidades específicas.

- E-mail: support@onetimesecret.com
- Formulário de feedback: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Lembre-se de que escolher a região certa garante que você obtenha o melhor desempenho e esteja em conformidade com quaisquer regulamentos de dados relevantes ao usar o Onetime Secret.
