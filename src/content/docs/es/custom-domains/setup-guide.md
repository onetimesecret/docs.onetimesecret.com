---
title: Guía de instalación
description: Esta guía te guiará a través del proceso de configuración de un dominio personalizado para tu cuenta Onetime Secret, incluyendo las diferencias entre subdominios y dominios apex, y la elección de tu región de centro de datos preferida.
---

# Guía de configuración de dominios personalizados

## Requisitos previos

- Una cuenta Onetime Secret activa con la función de dominio personalizado activada
- Un dominio que posea y para el que pueda gestionar la configuración DNS

## Comprender los tipos de dominio

Antes de configurar tu dominio personalizado, es importante que entiendas la diferencia entre subdominios y dominios apex:

1. **Subdominio**: Una subdivisión de su dominio principal (por ejemplo, secretos.sudominio.com).
2. **Dominio raíz**: El propio dominio raíz (por ejemplo, sudominio.com).

## Elija su región

Onetime Secret ofrece dos regiones de centros de datos: EU y US. Cuando configures tu dominio personalizado, tendrás que elegir qué región prefieres para almacenar tus datos. Esta elección es importante por varias razones:

- Para particulares**: Puede elegir en función de sus preferencias personales, como la proximidad para un acceso potencialmente más rápido o la preocupación por la soberanía de los datos personales.
- Para empresas**: Su elección puede depender de sus obligaciones de localización de datos, como el cumplimiento del GDPR, las directrices estatales o provinciales. Asegúrese de seleccionar la región que mejor se adapte a sus requisitos normativos.

Tenga en cuenta sus necesidades y requisitos específicos a la hora de tomar esta decisión. Si desea información más detallada sobre las regiones de nuestros centros de datos y cómo elegir la que mejor se adapte a sus necesidades, consulte nuestra guía [Regiones de los centros de datos](/docs/regions).

## Paso 1: Acceder al Panel de Dominios

1. Accede a tu cuenta Onetime Secret
2. Navega a Panel > Dominios personalizados
3. Haz clic en "Añadir dominio"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Vista de dominios personalizados" width="400" />

## Paso 2: Introduzca su dominio

1. En la configuración del dominio personalizado, introduce el dominio que desees (por ejemplo, secretos.tudominio.com o tudominio.com)
2. Haga clic en "Añadir dominio" o en el botón equivalente para continuar.

## Paso 3: Configurar DNS

Para conectar tu dominio, tienes que actualizar la configuración DNS. El proceso difiere ligeramente en función de si utilizas un subdominio o un dominio ápex, y de la región del centro de datos que elijas.

### Para subdominios (recomendado)

1. Acceda al panel de gestión de DNS de su dominio (a través de su registrador de dominios o proveedor de DNS)
2. Cree un registro CNAME con los siguientes datos:
   - Host: Su subdominio elegido (por ejemplo, secretos)
   - Apunta a / Valor:
     - Para la región de la UE: identity.eu.onetime.co
     - Para la región de EE.UU.: identity.us.onetime.co
3. Elimine cualquier registro A, AAAA o CNAME existente para el mismo subdominio.

### Para dominios Apex

1. Acceda al panel de gestión de DNS de su dominio
2. Cree o modifique un registro A con los siguientes datos:
   - Host: @ (o déjelo en blanco, dependiendo de su proveedor de DNS)
   - Apunta a / Valor:
     - Para la región de la UE: 109.105.217.207
     - Para la región de EE.UU.: 66.51.126.41

Importante: Asegúrese de que no hay registros conflictivos para el dominio que está utilizando.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Configuración personalizada del dominio" width="400" />

### Más información

#### ¿Por qué CNAME para subdominios?

Recomendamos utilizar registros CNAME para subdominios porque:

1. Son más flexibles y nos permiten cambiar las direcciones IP de nuestros servidores sin necesidad de que usted actualice la configuración de sus DNS.
2. Se adaptan automáticamente a cualquier cambio que hagamos en nuestra infraestructura.

#### ¿Por qué A Records para Apex Domains?

Los dominios Apex no pueden utilizar registros CNAME debido a las normas DNS. Por lo tanto, debemos utilizar registros A, que tienen algunas limitaciones:

1. Si cambiamos nuestra dirección IP (lo que es poco frecuente), tendrás que actualizar manualmente la configuración DNS.
2. No se adaptan automáticamente a los cambios en nuestra infraestructura.

## Paso 4: Verificar dominio y esperar SSL

1. Después de actualizar la configuración DNS, vuelve a la página del dominio personalizado Onetime Secret
2. El sistema intentará verificar automáticamente tu dominio
3. La generación del certificado SSL comenzará una vez que la verificación sea exitosa
4. Este proceso puede tardar unos minutos en completarse

## Paso 5: Confirmar configuración

Una vez finalizada la configuración, debería ver la siguiente información:

- Estado del dominio: Activo con SSL
- Dirección de destino: identity.eu.onetime.co o identity.us.onetime.co (dependiendo de la región elegida)
- Estado SSL: Activo
- Fecha de Renovación SSL: (Se mostrará, normalmente un año desde la configuración)

## Solución de problemas

- Si la verificación falla, vuelva a comprobar la configuración DNS.
- Asegúrate de haber eliminado cualquier registro conflictivo.
- La propagación de DNS puede tardar hasta 24 horas, aunque suele ser mucho más rápida.

## Usar tu dominio personalizado

Una vez activos, sus enlaces secretos utilizarán su dominio personalizado. Por ejemplo
`https://secrets-example.onetime.dev/secret/abc123`

## We've Got You Covered

Nosotros nos encargamos del resto de los detalles técnicos para que usted no tenga que hacerlo.

- Supervisamos continuamente el estado de su dominio
- Los certificados SSL se renuevan automáticamente sin ninguna acción por su parte

Para aquellos a los que les gusta estar informados, pueden comprobar fácilmente la salud de su dominio:

- Sólo tiene que consultar la fecha y hora de "Última supervisión" en el panel de control para confirmar la conectividad en curso.

## ¿Preguntas o necesitas ayuda?

Estamos aquí para ayudarle. Si tiene alguna pregunta o necesita ayuda:

- Envíenos un correo electrónico directamente a support@onetimesecret.com
- Utilice nuestro formulario de comentarios en https://onetimesecret.com/feedback

Nuestro equipo se compromete a ofrecerle la mejor asistencia posible para la configuración y el uso de su dominio personalizado, incluida la orientación para elegir la región del centro de datos adecuada a sus necesidades.
