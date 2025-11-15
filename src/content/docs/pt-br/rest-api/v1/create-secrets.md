---
title: Criando Mensagens
description: Aprenda como criar e recuperar mensagens usando a API REST do Onetime Secret, com suporte para uso autenticado e anônimo.
---

_Atualizado em 02/04/2025_

:::note
**Localidade de Dados e Seleção de Região**
- Escolha entre os data centers dos EUA ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Canadá ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)) ou Nova Zelândia ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/))
- Considere fatores como soberania de dados, latência e requisitos de conformidade
- **NOTA:** O `onetimesecret.com` padrão permanece operacional e direciona para um data center ativo, usar uma localidade específica é recomendado pois esta funcionalidade pode ser descontinuada no futuro.
:::

## Criar uma Mensagem

`POST https://REGION.onetimesecret.com/api/v1/share`

Use este endpoint para armazenar um valor de mensagem confidencial e criar um link de uso único.

### Requisição Autenticada

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Requisição Anônima

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Parâmetros de Consulta

- **secret**: o valor da mensagem confidencial que é criptografado antes de ser armazenado. Existe um comprimento máximo baseado no seu plano que é aplicado (1k-10k).
- **passphrase**: uma string que o destinatário deve conhecer para visualizar a mensagem. Este valor também é usado para criptografar a mensagem e é criptografado com bcrypt antes de ser armazenado, então temos este valor apenas em trânsito.
- **ttl**: a quantidade máxima de tempo, em segundos, que a mensagem deve sobreviver (ou seja, tempo de vida). Uma vez que esse tempo expire, a mensagem será excluída e não recuperável.
- **recipient**: um endereço de e-mail. Enviaremos um e-mail amigável contendo o link da mensagem (NÃO a mensagem em si).
- **share_domain**: o domínio personalizado a ser usado ao gerar o link da mensagem. Se não fornecido, o domínio padrão é usado (por exemplo, eu.onetimesecret.com).

### Atributos

- **custid**: o nome de usuário da conta que criou a mensagem. Este valor será `anon` para requisições anônimas.
- **metadata\_key**: a chave única para os metadados. NÃO compartilhe isso.
- **secret\_key**: a chave única para a mensagem que você criou. Esta é a chave que você pode compartilhar.
- **ttl**: O tempo de vida (em segundos) que foi especificado (ou seja, não o tempo restante)
- **metadata\_ttl**: O tempo restante (em segundos) que os metadados têm para viver.
- **secret\_ttl**: O tempo restante (em segundos) que a mensagem tem para viver.
- **recipient**: se um destinatário foi especificado, esta é uma versão ofuscada do endereço de e-mail.
- **created**: Hora em que a mensagem foi criada em tempo unix (UTC)
- **updated**: idem, mas a hora em que foi atualizada pela última vez.
- **passphrase\_required**: Se uma frase secreta foi fornecida quando a mensagem foi criada, isso será true. Caso contrário, false.
- **share_domain**: o domínio personalizado a ser usado ao gerar o link da mensagem. Caso contrário, "".

### Exemplo de Resposta:

```json
{
  "custid":"USERNAME",
  "metadata_key":"qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Gerar uma Mensagem

`POST https://REGION.onetimesecret.com/api/v1/generate`

Gera uma mensagem curta e única. Isso é útil para senhas temporárias, blocos de notas de uso único, salts, etc.

### Requisição Autenticada

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Requisição Anônima

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```

```json
{
  "custid":"USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key":"2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key":"pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Atributos

Iguais aos de "Compartilhar uma Mensagem" acima, com a adição do campo `value`.
