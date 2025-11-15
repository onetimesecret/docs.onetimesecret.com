---
title: Regiões de Data Center
description: Saiba sobre as regiões de data center do Onetime Secret e como escolher a certa para suas necessidades.
---

O Onetime Secret oferece quatro regiões de data center: União Europeia (EU), Estados Unidos (US), Canadá (CA) e Aotearoa Nova Zelândia (NZ). Este guia ajudará você a entender a importância da seleção de região e como escolher a certa para suas necessidades.

## Por Que a Seleção de Região Importa

Escolher a região de data center correta é crucial por várias razões:

1. **Soberania de Dados**: Diferentes regiões têm diferentes leis e regulamentos de proteção de dados.
2. **Latência**: Escolher uma região mais próxima da sua base de usuários principal pode reduzir a latência.
3. **Conformidade**: Algumas organizações têm requisitos específicos sobre onde seus dados podem ser armazenados.

## Regiões Disponíveis

### União Europeia (EU)

- **Localização**: União Europeia (Nuremberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Principais Características**:
  - Conforme com GDPR e outros regulamentos de proteção de dados da EU
  - Ideal para usuários europeus ou aqueles que atendem principalmente clientes europeus

### Canadá (CA)

- **Localização**: Canadá (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Principais Características**:
  - Conforme com PIPEDA e leis canadenses de proteção de dados
  - Adequado para usuários canadenses ou aqueles que atendem principalmente clientes canadenses

### Aotearoa Nova Zelândia (NZ)

- **Localização**: Aotearoa Nova Zelândia (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Principais Características**:
  - Conforme com a Lei de Privacidade da Nova Zelândia e regulamentos locais
  - Adequado para usuários da Nova Zelândia ou aqueles que atendem clientes da Oceania

### Estados Unidos (US)

- **Localização**: Estados Unidos (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Principais Características**:
  - Conforme com leis de proteção de dados dos EUA
  - Adequado para usuários baseados nos EUA ou aqueles que atendem principalmente clientes americanos

## Arquitetura de Não Compartilhamento

O Onetime Secret emprega uma arquitetura de não compartilhamento, garantindo isolamento completo de dados entre regiões:

- **Contas Separadas**: Criar uma conta em qualquer domínio regional é totalmente separado de contas em outros domínios, mesmo se você usar o mesmo endereço de e-mail.
- **Sem Operações entre Centros**: Você não pode executar operações (como queimar uma mensagem) entre data centers. Cada centro mantém seu próprio conjunto de mensagens e dados de usuário.
- **Faturamento Consistente para Usuários Pagos**: Para contas pagas, embora nenhum dado de usuário seja compartilhado entre centros, seu status de assinatura é reconhecido em todas as regiões através de nosso provedor de pagamento, Stripe.

## Como Escolher Sua Região

Considere os seguintes fatores ao selecionar sua região de data center:

### Para Usuários Anônimos

- Solicitações para onetimesecret.com podem ser direcionadas para qualquer data center ativo.
- A localização da sua mensagem é sempre clara no link gerado (por exemplo, `us.onetimesecret.com/secret/abcd1234`).
- Você pode escolher uma localidade de dados específica navegando diretamente para qualquer domínio regional (por exemplo, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### Para Usuários Autenticados

- Ao criar uma nova conta, você deve escolher uma localização de data center.
- Você precisará retornar à mesma localização para fazer login.
- Contas e mensagens existentes permanecem em seu data center original.

### Para Todos os Usuários

- Mensagens criadas sem uma jurisdição de subdomínio (por exemplo, onetimesecret.com/secret/efgh5678) continuarão a usar como padrão nosso data center na EU.
- Todos os usuários, tanto pagos quanto gratuitos, podem escolher seu data center preferido ao criar uma conta.

### Considerações Adicionais

1. **Para Indivíduos**:
   - Preferência pessoal
   - Proximidade à sua localização para acesso potencialmente mais rápido
   - Preocupações pessoais com soberania de dados

2. **Para Empresas**:
   - Requisitos legais e regulatórios
   - Localização da sua base de clientes principal
   - Necessidades de conformidade específicas do setor

3. **Considerações Técnicas**:
   - Requisitos de latência para sua aplicação
   - Integração com outros serviços ou sistemas

## Preços e Planos

Nosso compromisso com a localidade de dados se estende ao nosso modelo de preços:

- As cobranças são baseadas em de onde você está pagando, não onde sua conta foi criada.
- Os planos Identity Plus incluem domínios personalizados ilimitados em todos os data centers sob uma única assinatura.

## Planos Futuros

Estamos trabalhando continuamente para expandir nossas opções de data center. Os planos futuros incluem localizações adicionais de data center em:

- Brasil
- Espanha
- Reino Unido

Essas expansões fornecerão ainda mais opções de localidade de dados, melhorando o desempenho e as capacidades de conformidade para usuários em diferentes regiões.

## Configurando Sua Região

Ao configurar sua conta do Onetime Secret ou configurar um domínio personalizado, você terá a opção de escolher sua região preferida. Veja como:

1. Para novas contas: Selecione sua região preferida durante o processo de registro.
2. Para contas existentes: Entre em contato com nossa equipe de suporte para discutir opções de migração de região.
3. Para domínios personalizados: Especifique sua região escolhida ao configurar suas configurações de DNS (consulte nosso [Guia de Configuração de Domínio Personalizado](custom-domains/setup-guide) para instruções detalhadas).

## Perguntas Frequentes

**P: Posso mudar minha região depois de configurar minha conta?**
R: Sim, você pode mudar sua região criando uma nova conta com o mesmo endereço de e-mail e navegando até a tela da conta. Se você tiver uma assinatura ativa, sua conta será atualizada automaticamente (pode ser necessário atualizar a página).

Observe:
- Os dados existentes não são transferidos entre regiões
- Quaisquer links de mensagens que você criou continuarão a funcionar até serem visualizados ou expirarem
- Para links com domínios personalizados, você precisará:
  1. Adicionar novamente o domínio à sua conta da nova região
  2. Atualizar os registros DNS associados
  3. Usar um subdomínio exclusivo ao adicionar novamente o domínio para evitar conflitos com links existentes
  4. Mais tarde, você pode adicionar seu domínio preferido (se necessário) para começar a enviar novos links com seu domínio preferido

**P: Minha escolha de região afeta a segurança das minhas mensagens?**
R: Não, todas as regiões oferecem o mesmo alto nível de segurança. A escolha afeta principalmente a residência de dados e a latência potencial.

**P: Existem diferenças de preço entre regiões?**
R: Atualmente, nossos preços são consistentes em todas as regiões. Verifique nossa [página de preços](https://onetimesecret.com/pricing) para as informações mais atualizadas.

## Precisa de Ajuda?

Se você não tiver certeza sobre qual região escolher ou tiver alguma dúvida, não hesite em entrar em contato com nossa equipe de suporte. Estamos aqui para ajudá-lo a tomar a melhor decisão para suas necessidades específicas.

- E-mail: support@onetimesecret.com
- Formulário de feedback: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Lembre-se, escolher a região certa garante que você obtenha o melhor desempenho e esteja em conformidade com quaisquer regulamentos de dados relevantes ao usar o Onetime Secret.
