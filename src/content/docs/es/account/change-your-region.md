---
title: Cambiar de región
---

Onetime Secret utiliza una [arquitectura share-nothing](/es/regions) en las cinco regiones (CA, EU, NZ, UK, US). Cada región funciona como un sistema completamente independiente, con su propia base de datos, cuentas y secretos. No transferimos datos entre regiones bajo ninguna circunstancia.

Esto significa que cambiar de región es menos una "migración" y más una configuración desde cero en la región que prefiera. La buena noticia: toma alrededor de dos minutos, y su suscripción se traslada automáticamente.

## Cuentas gratuitas

Vaya directamente a la región que prefiera (consulte [Regiones disponibles](/es/regions#regiones-disponibles) para ver la lista completa) y cree una cuenta nueva con la misma dirección de correo electrónico. Eso es todo: su nueva cuenta está lista para usarse de inmediato.

## Cuentas de pago (Identity Plus)

El proceso es el mismo que para las cuentas gratuitas, con un paso adicional:

1. Vaya a la URL de la región que prefiera (consulte [Regiones disponibles](/es/regions#regiones-disponibles))
2. Cree una cuenta usando la misma dirección de correo electrónico asociada a su suscripción
3. Inicie sesión y navegue a la página de su cuenta
4. El estado de su suscripción se reconocerá automáticamente a través de Stripe

Puede que necesite actualizar la página una vez para que la suscripción se sincronice. Esto funciona porque mantenemos los datos separados entre regiones, mientras que su relación de facturación se gestiona a través de Stripe, que reconoce su dirección de correo electrónico en todas las regiones.

## Qué sucede con su cuenta anterior

Su cuenta en la región anterior permanece completamente funcional:

- Los enlaces secretos existentes siguen funcionando hasta que se vean o caduquen
- Su cuenta permanece activa por si necesita consultar algo
- No se requiere ninguna acción sobre la cuenta anterior, a menos que desee cerrarla

## Migración de dominio personalizado

Si tiene un dominio personalizado configurado en su región actual, el proceso requiere un poco más de planificación. Dado que sus enlaces secretos existentes usan los registros DNS de su dominio personalizado, no puede simplemente apuntar el dominio a la nueva región sin romper los enlaces que aún no se han visto.

### Paso a paso

1. **Agregue un subdominio temporal** a su cuenta de la nueva región. Por ejemplo, si su dominio actual es `secrets.example.com`, agregue algo como `secrets-new.example.com` o `secrets-us.example.com`.

2. **Cree un registro CNAME** para el subdominio temporal que apunte al punto de conexión de identidad regional correspondiente (por ejemplo, `identity.us.onetime.co` para la región de EE. UU.). Consulte la [Guía de configuración de dominios personalizados](/es/custom-domains/setup-guide) para conocer los detalles de la configuración DNS.

3. **Comience a usar el subdominio temporal** para los secretos nuevos de inmediato.

4. **Después de 30 días**, todos los secretos creados en el dominio anterior habrán caducado. Entonces podrá:
   - Quitar el dominio personalizado de la cuenta de su región anterior
   - Agregar el subdominio que prefiera (por ejemplo, `secrets.example.com`) a la cuenta de su nueva región
   - Actualizar el registro CNAME para que apunte al punto de conexión de la nueva región
   - Verificar el dominio en el panel de su cuenta

5. **Elimine** el subdominio temporal una vez que su dominio preferido esté activo y verificado.

### ¿Por qué 30 días?

El tiempo de vida (TTL) máximo de un secreto es de 30 días. Esperar este período garantiza que todos los secretos creados bajo la configuración DNS de la región anterior hayan sido vistos o hayan caducado, de modo que actualizar el registro CNAME no rompa ningún enlace pendiente.

Si sabe que todos sus secretos existentes tienen TTL más cortos o ya se han visto, puede hacer el cambio antes.

## Cuentas sin dominios personalizados

Si no utiliza un dominio personalizado, el cambio es inmediato. Sus enlaces anteriores (que usan las URL regionales de onetimesecret.com, como `eu.onetimesecret.com/secret/abcd1234`) seguirán resolviéndose correctamente sin importar en qué región se encuentre su cuenta activa.

## Múltiples regiones

Puede mantener cuentas en varias regiones simultáneamente. Todas las cuentas que usan la misma dirección de correo electrónico comparten el mismo estado de suscripción. Esto puede ser útil si atiende a usuarios en distintas áreas geográficas y desea minimizar la latencia o cumplir con requisitos de residencia de datos.

## Instancias dedicadas

Los clientes con instancias dedicadas deben ponerse en contacto con nosotros en [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) para cambios de región, ya que la infraestructura dedicada requiere una reconfiguración manual. También puede contactarnos a través de la [página de comentarios](https://onetimesecret.com/feedback).
