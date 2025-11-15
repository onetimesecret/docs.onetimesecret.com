---
title: Recuperar secretos
description: Aprende a recuperar secretos utilizando la API REST de Onetime Secret, con soporte para acceso autenticado y anónimo.
---

Actualizado 2025-04-02_

:::nota
**Selección de localidad y región de los datos**
- Elija un centro de datos [region](/es/regions/) (por ejemplo, [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/))
- Tenga en cuenta factores como la soberanía de los datos, la latencia y los requisitos de cumplimiento.
- **NOTA:** Por defecto `onetimesecret.com` permanece operativo y dirige a un centro de datos activo, se recomienda utilizar una localidad específica ya que esta funcionalidad puede quedar obsoleta en el futuro.
:::

## Recuperar un Secreto

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Anonymous Request

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Parámetros de consulta

- Clave**: la clave única para este secreto.
- Frase de contraseña** (si es necesaria): la frase de contraseña sólo es necesaria si el secreto se creó con una.

### Atributos

- **clave_secreta**: la clave única para el secreto que crees. Esta es la clave que puedes compartir.
- Valor**: El secreto real. No hace falta decirlo, pero sólo estará disponible una vez.

## Recuperar metadatos

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Cada secreto tiene también metadatos asociados. Los metadatos están destinados a ser utilizados por el creador del secreto (es decir, no por el destinatario) y, por lo general, deben mantenerse en privado. Puedes utilizar la clave de metadatos para obtener información básica sobre el propio secreto (por ejemplo, si fue visto o cuándo), ya que la clave de metadatos es diferente de la clave secreta.

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Parámetros de consulta

- **METADATA_KEY**: la clave única para estos metadatos.

### Atributos

- **custid**: el nombre de usuario de la cuenta que creó el secreto. Este valor será `anon` para peticiones anónimas.
- **clave_metadatos**: la clave única para los metadatos. NO la comparta.
- **clave_secreto**: la clave única para el secreto creado. Esta es la clave que puedes compartir.
- **ttl**: El tiempo de vida especificado (es decir, no el tiempo restante).
- metadatos_ttl**: El tiempo restante (en segundos) que le queda de vida a los metadatos.
- **secret_ttl**: El tiempo de vida restante (en segundos) del secreto.
- Destinatario**: si se ha especificado un destinatario, se trata de una versión ofuscada de la dirección de correo electrónico.
- **creado**: Hora de creación de los metadatos en tiempo unix (UTC).
- actualizado**: ídem, pero la hora de la última actualización.
- Recibido**: Hora en que se recibió el secreto.
- frase_de_pass_requerida**: Si se proporcionó una frase de contraseña cuando se creó el secreto, será verdadero. En caso contrario será false, obviamente.


## Burn a Secret

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Quema un secreto que aún no ha sido leído.

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Parámetros de consulta

- Ninguno

### Atributos

- Igual que los atributos de metadatos con un estado de quemado.

## Recuperar metadatos recientes

**GET https://onetimesecret.com/api/v1/private/recent**

Recuperar una lista de metadatos recientes.

### Authenticated Request

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Parámetros de consulta

- Ninguno

### Atributos

- Igual que los atributos de metadatos, aunque como lista y el valor de la clave secreta siempre será nulo.

::: advertencia Se requiere autenticación
Nota: Las operaciones de metadatos y gestión (recuperar metadatos, quemar secreto, metadatos recientes) sólo están disponibles para usuarios autenticados.
:::
