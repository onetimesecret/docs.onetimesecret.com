---
title: Recuperando Mensagens
description: Aprenda como recuperar mensagens usando a API REST do Onetime Secret, com suporte para acesso autenticado e anônimo.
---

_Atualizado em 02/04/2025_

:::note
**Localidade de Dados e Seleção de Região**
- Escolha uma [região]({getRelativeLocaleUrl(Astro.currentLocale ?? 'en', 'regions')}) (por exemplo, [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/))
- Considere fatores como soberania de dados, latência e requisitos de conformidade
- **NOTA:** O `onetimesecret.com` padrão permanece operacional e direciona para um data center ativo, usar uma localidade específica é recomendado pois esta funcionalidade pode ser descontinuada no futuro.
:::

## Recuperar uma Mensagem

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Requisição Autenticada

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Requisição Anônima

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Parâmetros de Consulta

- **SECRET_KEY**: a chave única para esta mensagem.
- **passphrase** (se necessário): a frase secreta é necessária apenas se a mensagem foi criada com uma.

### Atributos

- **secret_key**: a chave única para a mensagem que você criou. Esta é a chave que você pode compartilhar.
- **value**: A mensagem real. Nem preciso dizer, mas isso estará disponível apenas uma vez.

## Recuperar Metadados

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Cada mensagem também tem metadados associados. Os metadados são destinados a serem usados pelo criador da mensagem (ou seja, não pelo destinatário) e geralmente devem ser mantidos privados. Você pode usar com segurança a chave de metadados para recuperar informações básicas sobre a própria mensagem (por exemplo, se ou quando foi visualizada), pois a chave de metadados é diferente da chave da mensagem.

### Requisição Autenticada

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Parâmetros de Consulta

- **METADATA_KEY**: a chave única para estes metadados.

### Atributos

- **custid**: o nome de usuário da conta que criou a mensagem. Este valor será `anon` para requisições anônimas.
- **metadata\_key**: a chave única para os metadados. NÃO compartilhe isso.
- **secret\_key**: a chave única para a mensagem que você criou. Esta é a chave que você pode compartilhar.
- **ttl**: O tempo de vida que foi especificado (ou seja, não o tempo restante)
- **metadata\_ttl**: O tempo restante (em segundos) que os metadados têm para viver.
- **secret\_ttl**: O tempo restante (em segundos) que a mensagem tem para viver.
- **recipient**: se um destinatário foi especificado, esta é uma versão ofuscada do endereço de e-mail.
- **created**: Hora em que os metadados foram criados em tempo unix (UTC)
- **updated**: idem, mas a hora em que foi atualizada pela última vez.
- **received**: Hora em que a mensagem foi recebida.
- **passphrase\_required**: Se uma frase secreta foi fornecida quando a mensagem foi criada, isso será true. Caso contrário, false.

## Queimar uma Mensagem

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Queime uma mensagem que ainda não foi lida.

### Requisição Autenticada

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Parâmetros de Consulta

- Nenhum

### Atributos

- Iguais aos atributos de metadados com um status de queimado.

## Recuperar Metadados Recentes

**GET https://onetimesecret.com/api/v1/private/recent**

Recupere uma lista de metadados recentes.

### Requisição Autenticada

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Parâmetros de Consulta

- Nenhum

### Atributos

- Iguais aos atributos de metadados, embora como uma lista e o valor da chave da mensagem sempre será null.

::: warning Autenticação Necessária
Nota: Operações de metadados e gerenciamento (recuperar metadados, queimar mensagem, metadados recentes) estão disponíveis apenas para usuários autenticados.
:::
