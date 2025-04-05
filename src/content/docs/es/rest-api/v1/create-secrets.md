---
title: Creación de secretos
description: Aprende a crear y recuperar secretos utilizando la API REST de Onetime Secret, con soporte para uso autenticado y anónimo.
---

Actualizado 2025-04-02_

:::nota
**Selección de localidad y región de los datos**
- Elija entre centros de datos de EE.UU. ([`us.onetimesecret.com`](https://us.onetimesecret.com/)) o de la UE ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/))
- Tenga en cuenta factores como la soberanía de los datos, la latencia y los requisitos de cumplimiento.
- **NOTA:** Por defecto `onetimesecret.com` permanece operativo y dirige a un centro de datos activo, se recomienda utilizar una localidad específica ya que esta funcionalidad puede quedar obsoleta en el futuro.
:::


## Crear un Secreto

`POST https://REGION.onetimesecret.com/api/v1/share`

Utilice este punto final para almacenar un valor secreto y crear un enlace de un solo uso.


### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Anonymous Request

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Parámetros de consulta

- **secret**: el valor secreto que se cifra antes de ser almacenado. Se aplica una longitud máxima en función del plan (1k-10k).
- Frase de contraseña: cadena que el destinatario debe conocer para ver el secreto. Este valor también se utiliza para cifrar el secreto y es bcrypted antes de ser almacenados por lo que sólo tienen este valor en tránsito.
- **ttl**: la cantidad máxima de tiempo, en segundos, que el secreto debe sobrevivir (es decir, el tiempo de vida). Una vez transcurrido este tiempo, el secreto se borrará y no se podrá recuperar.
- Destinatario**: una dirección de correo electrónico. Le enviaremos un correo electrónico amistoso con el enlace del secreto (NO el secreto en sí).
- Dominio_compartido**: el dominio personalizado que se utilizará para generar el enlace secreto. Si no se proporciona, se utilizará el dominio por defecto (por ejemplo, eu.onetimesecret.com).

### Atributos

- **custid**: el nombre de usuario de la cuenta que creó el secreto. Este valor será `anon` para peticiones anónimas.
- **clave_metadatos**: la clave única para los metadatos. NO la comparta.
- **clave_secreto**: la clave única para el secreto creado. Esta es la clave que puedes compartir.
- **ttl**: El tiempo de vida (en segundos) que se especificó (es decir, no el tiempo restante).
- metadatos_ttl**: El tiempo restante (en segundos) que le queda de vida a los metadatos.
- **secret_ttl**: El tiempo de vida restante (en segundos) del secreto.
- Destinatario**: si se ha especificado un destinatario, se trata de una versión ofuscada de la dirección de correo electrónico.
- **creado**: Hora de creación del secreto en tiempo unix (UTC).
- actualizado**: ídem, pero con la hora de la última actualización.
- frase_de_pass_requerida**: Si se proporcionó una frase de contraseña cuando se creó el secreto, será true. En caso contrario será false, obviamente.
- **dominio_compartido**: el dominio personalizado que se utilizará al generar el enlace secreto. En caso contrario, "".


### Ejemplo de Respuesta:

```json
{
  "custid": "USERNAME",
  "metadata_key": "qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl": "3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Generar un Secreto

`POST https://REGION.onetimesecret.com/api/v1/generate`

Genera un secreto corto y único. Esto es útil para contraseñas temporales, almohadillas Onetime, sales, etc.

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Anonymous Request

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


```json
{
  "custid": "USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key": "2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key": "pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl": "3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Atributos

Igual que "Compartir un secreto", pero añadiendo el campo "valor".
