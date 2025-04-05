---
title: Bibliotecas de clientes
description: Explora las librerías cliente disponibles para la API Onetime Secret, incluyendo Ruby, Python, Perl, Java, C#, Go, y más.
---

## Ruby


Página [Github onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
de [Delano](https://delanotes.com/) (actualizado 2024-06-09)

### Ejemplo de uso

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
opciones = {
  secreto: 'Jazz, jazz y más jazz',
  destinatario: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/compartir', opciones)
puts ret['clave_secreta']
```

---

## Python


Página [Github - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
de [slashpass](https://github.com/slashpass) (añadido 2021-07-08)

### Ejemplo de uso

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USUARIO, ONETIMESECRET_KEY)
cli.create_link("secret") # devuelve un enlace como https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Página de Github - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
de [Vladislav Stepanov](https://github.com/utter-step/) (añadido el 2012-06-26)

### Ejemplo de uso

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("TU_EMAIL", "TU_OTS_APIKEY")
secret = o.share(u "test")

print o.recuperar_secreto(secreto["clave_secreta"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[Net::OneTimeSecret en CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
de [Kyle Dawkins](http://www.shoffle.com/) (añadido 2012-01-06)

### Ejemplo de uso

```perl
/usr/bin/env perl

use Net::OneTimeSecret;

# Nota: ¡sustituye estos datos por los tuyos para que esto funcione!
my $customerId = 'YOUR_EMAIL';
my $testApiKey = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz y más jazz',
                   frase de contraseña => 'thepassword',
                   destinatario => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $resultado->{clave_secreta} );

my $secret = $api->retrieveSecret( $result->{clave_secreta}, passphrase => "thepassword" );
printf( "%s\n", $secret->{valor} );
```

---

## Java


[Página de Github - onetime-java](https://github.com/mpawlowski/onetime-java)
de [Marcin Pawlowski](https://github.com/mpawlowski) (añadido 2014-05-22)

### Ejemplo de uso

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

GenerarRespuesta generateResponse = ots.generate(
                nuevo GenerateRequest.Builder()
                        .withPassphrase("supersecreto")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                nuevo RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecreto")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


Página [Github - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
de [Vladislav Stepanov](https://github.com/utter-step/) (añadido 2014-05-29)

### Ejemplo de uso

```csharp
# Puedes usar OneTimeSharp en cualquiera de tus proyectos que sean compatibles con .NET (4.0+) o Mono (2.10.8+).
usando VStepanov.OneTimeSharp;

clase Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("TU_EMAIL", "TU_OTS_APIKEY");

        var generado = ots.GenerarSecreto();

        Console.WriteLine(generado.Valor); // LR*?us*A(UT*

        Console.WriteLine(generada.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("¡Hola, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


Página [Github - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
de [Corbalt](https://github.com/corbaltcode/) (añadido 2021-12-10)

### Ejemplo de uso

```go
import ots "github.com/corbaltcode/go-onetimesecret"

cliente := ots.Cliente{
  Nombre de usuario: "user@example.com",
  Clave: "mi clave api",
}

metadata, err := client.Put("los códigos de lanzamiento", "frase de contraseña", 0, "")
if err != nil {
  // gestionar error
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // gestionar error
}

// imprime "los códigos de lanzamiento"
print(secreto)
```

### Ejemplo de uso como CLI

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'lo esencial es invisible a los ojos'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
lo esencial es invisible a los ojos

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Página de Github](https://github.com/emdneto/otsgo)
de [Emídio Neto](https://github.com/emdneto) (añadido 2024-06-09)

### Ejemplo de uso

```go
// Construir un nuevo cliente
cliente := ots.NuevoCliente(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Enviar una petición con context
ctx := context.Fondo()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(respuesta.Estado)
```

---

## PowerShell


[Página de Github - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
de [Craig Gumbley](https://www.helloitscraig.co.uk) (actualizado 2017-04-28)

### Ejemplo de uso

```powershell
# Instalar desde la galería PowerShell
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Establecer información de conexión
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Generar un nuevo secreto compartido
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Recuperar un secreto
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Ver todas las funciones disponibles
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Página de Github - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
de [Eric Engstrom](https://eengstrom.github.io/) (actualizado 2018-12-19)

### Ejemplo de uso como API de scripting

```bash
# source para uso anónimo (secretos creados anónimamente)
fuente ots.bash

# o, fuente con credenciales auth específicas
APIUSER="NOMBREDEUSUARIO"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# comprobar estado del servidor
ots_status

# crear un secreto y obtener la URL
URL=$(echo "secreto" | ots_compartir)

# compartir un secreto de varias líneas a través de HEREDOC.
URL=$(ots_share <<-EOF
      Esto es un secreto
      ... en múltiples líneas
EOF
)

# pasar opciones para compartir o generar.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# recuperar los datos secretos
local DATA="$(ots_retrieve "$URL")"

# Compartir/generar un nuevo secreto, y recuperar la clave privada de metadatos.
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# obtener una lista de claves privadas de metadatos creadas recientemente.
# tenga en cuenta que esto requiere credenciales de autenticación válidas
local -a RECENT=( $(ots_recent) )

# comprobar el estado actual de un secreto, dada la clave privada
ots_state $KEY

# quemar un secreto, dada la clave privada
ots_burn $KEY
```

### Ejemplo de uso como CLI

```bash
# Compartir un secreto (desde stdin
./ots compartir
SECRET
^D

# Compartir un secreto (vía HEREDOC)
./ots compartir <<-EOF
      Esto es un secreto multilínea via HEREDOC.
      Algo más va aquí.
EOF

# Obtener/Recuperar un secreto:
./ots obtener <clave|url>
./ots recuperar <clave|url>

### Ejemplo de uso como CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
