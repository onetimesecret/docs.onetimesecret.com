---
title: Regiones del centro de datos
description: Conozca las regiones de los centros de datos de Onetime Secret y cómo elegir la adecuada para sus necesidades.
---

Onetime Secret ofrece cinco regiones de centros de datos: Canadá (CA), Unión Europea (UE), Aotearoa Nueva Zelanda (NZ), Reino Unido (UK) y Estados Unidos (US). Esta guía le ayudará a entender la importancia de la selección de la región y cómo elegir la adecuada para sus necesidades.

## Por qué es importante elegir región

Elegir la región adecuada para el centro de datos es crucial por varias razones:

1. **Soberanía de los datos**: Diferentes regiones tienen diferentes leyes y reglamentos de protección de datos.
2. **Latencia**: Elegir una región más cercana a su base de usuarios principal puede reducir la latencia.
3. **Cumplimiento**: Algunas organizaciones tienen requisitos específicos sobre dónde pueden almacenarse sus datos.

## Regiones disponibles

| Región | Ubicación | URL |
|--------|-----------|-----|
| [Canadá (CA)](/es/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Unión Europea (EU)](/es/regions/european-union) | Núremberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nueva Zelanda (NZ)](/es/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Reino Unido (UK)](/es/regions/united-kingdom) | Londres | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Estados Unidos (US)](/es/regions/united-states) | Hillsboro, Oregón | [us.onetimesecret.com](https://us.onetimesecret.com) |

Cada página de región incluye detalles sobre el entorno regulatorio local y cuándo esa región puede ser relevante para su caso de uso.

## Arquitectura Share-Nothing

Onetime Secret emplea una arquitectura de no compartir nada (share-nothing), lo que garantiza el aislamiento total de los datos entre regiones:

- **Cuentas separadas**: La creación de una cuenta en cualquier dominio regional es totalmente independiente de las cuentas de otros dominios, incluso si utiliza la misma dirección de correo electrónico.
- **No hay operaciones entre centros de datos**: No se pueden realizar operaciones (como destruir un secreto) entre centros de datos. Cada centro mantiene su propio conjunto de secretos y datos de usuario.
- **Facturación coherente para usuarios de pago**: Para las cuentas de pago, aunque no se comparten datos de usuario entre centros, su estado de suscripción se reconoce en todas las regiones a través de nuestro proveedor de pagos, Stripe.

## Cómo elegir su región

Tenga en cuenta los siguientes factores a la hora de seleccionar la región de su centro de datos:

### Sin una cuenta

- Las solicitudes a onetimesecret.com pueden dirigirse a cualquier centro de datos activo.
- Puede elegir una región específica navegando directamente a un dominio regional (por ejemplo, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- El enlace generado siempre identifica la región (por ejemplo, `us.onetimesecret.com/secret/abcd1234`).

### Con una cuenta

- Al crear una cuenta, usted elige una región de centro de datos. Todos los planes, gratuitos y de pago, tienen acceso a todas las regiones.
- Inicia sesión en el mismo dominio regional donde se registró (por ejemplo, si se registró en `eu.onetimesecret.com`, ahí es donde debe iniciar sesión).

### Consideraciones adicionales

1. **Para particulares**:
   - Preferencia personal
   - Proximidad a su ubicación para un acceso potencialmente más rápido
   - Preocupación por la soberanía de los datos personales

2. **Para las empresas**:
   - Requisitos legales y reglamentarios
   - Ubicación de su base de clientes principal
   - Necesidades de cumplimiento específicas del sector

3. **Consideraciones técnicas**:
   - Requisitos de latencia para su aplicación
   - Integración con otros servicios o sistemas

## Planes de futuro

Trabajamos continuamente para ampliar nuestras opciones de centros de datos. Los planes futuros incluyen ubicaciones adicionales de centros de datos en:

- Australia
- Brasil
- Corea del Sur
- Japón
- México
- Noruega

Estas ampliaciones ofrecerán aún más opciones para la localización de datos, mejorando el rendimiento y las capacidades de cumplimiento para usuarios de distintas regiones.


## Preguntas frecuentes

**P: ¿Puedo cambiar mi región después de configurar mi cuenta?**
R: Sí. Consulte [Cambiar de región](/es/regions/switching-regions) para obtener instrucciones paso a paso sobre cuentas gratuitas, suscripciones de pago y migración de dominios personalizados.

**P: ¿Afecta mi elección de región a la seguridad de mis secretos?**
R: No, todas las regiones ofrecen el mismo nivel de seguridad. La elección afecta principalmente a la residencia de los datos y a la latencia potencial.

**P: ¿Existen diferencias de precio entre regiones?**
R: Los precios son específicos de cada región; puede pagar en su moneda local y Stripe se encarga automáticamente de la conversión de divisas. Los planes Identity Plus incluyen dominios personalizados ilimitados en todos los centros de datos con una única suscripción. Consulte nuestra [página de precios](https://onetimesecret.com/pricing) para obtener la información más actualizada.

## ¿Necesita ayuda?

Si no está seguro de qué región elegir o tiene alguna pregunta, no dude en ponerse en contacto con nuestro equipo de asistencia. Estamos aquí para ayudarle a tomar la mejor decisión para sus necesidades específicas.

- Correo electrónico: support@onetimesecret.com
- Formulario de comentarios: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Recuerde que elegir la región adecuada le garantiza el mejor rendimiento y el cumplimiento de cualquier normativa de datos relevante mientras utiliza Onetime Secret.
