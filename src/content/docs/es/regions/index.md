---
title: Regiones del centro de datos
description: Conoce las regiones de los centros de datos de Onetime Secret y cómo elegir la adecuada para tus necesidades.
---

Onetime Secret ofrece cuatro regiones de centros de datos: Unión Europea (UE), Estados Unidos (EE.UU.), Canadá (CA) y Aotearoa Nueva Zelanda (NZ). Esta guía te ayudará a entender la importancia de la selección de la región y cómo elegir la adecuada para tus necesidades.

## Por qué es importante elegir región

Elegir la región adecuada para el centro de datos es crucial por varias razones:

1. **Soberanía de los datos Diferentes regiones tienen diferentes leyes y reglamentos de protección de datos.
2. **Latencia**: Elegir una región más cercana a su base de usuarios principal puede reducir la latencia.
3. **Cumplimiento**: Algunas organizaciones tienen requisitos específicos sobre dónde pueden almacenarse sus datos.

## Regiones disponibles

### Unión Europea (UE)

- Ubicación**: Dentro de la Unión Europea (Nuremberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- Características principales**:
  - Cumple con GDPR y otras normativas de protección de datos de la UE
  - Ideal para usuarios europeos o que atienden principalmente a clientes europeos

### Canada (CA)

- Ubicación**: Dentro de Canadá (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- Características principales
  - Conforme a la LPRPDE y a las leyes canadienses de protección de datos
  - Adecuado para usuarios canadienses o que atienden principalmente a clientes canadienses

### Aotearoa Nueva Zelanda (NZ)

- Ubicación**: Dentro de Nueva Zelanda (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- Características principales
  - Cumple con la Ley de Privacidad de Nueva Zelanda y la normativa local
  - Adecuado para usuarios de Nueva Zelanda o para clientes de Oceanía

### Estados Unidos (US)

- Ubicación**: Dentro de los Estados Unidos (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- Características principales
  - Cumple la legislación estadounidense sobre protección de datos
  - Adecuado para usuarios establecidos en EE.UU. o que atienden principalmente a clientes de EE.UU.

## Arquitectura Share-Nothing

Onetime Secret emplea una arquitectura de no compartir nada, lo que garantiza el aislamiento total de los datos entre regiones:

- Cuentas separadas**: La creación de una cuenta en cualquier dominio regional es totalmente independiente de las cuentas de otros dominios, incluso si utiliza la misma dirección de correo electrónico.
- **No hay operaciones entre centros de datos**: No se pueden realizar operaciones (como quemar un secreto) entre centros de datos. Cada centro mantiene su propio conjunto de secretos y datos de usuario.
- **Facturación coherente para usuarios de pago**: Para las cuentas de pago, aunque no se comparten datos de usuario entre centros, su estado de suscripción se reconoce en todas las regiones a través de nuestro proveedor de pagos, Stripe.

## Cómo elegir su región

Tenga en cuenta los siguientes factores a la hora de seleccionar la región de su centro de datos:

### Para usuarios anónimos

- Las solicitudes a onetimesecret.com pueden dirigirse a cualquier centro de datos activo.
- La ubicación de tu secreto siempre está clara en el enlace generado (por ejemplo, `us.onetimesecret.com/secret/abcd1234`).
- Puedes elegir una localidad de datos específica navegando directamente a cualquier dominio regional (por ejemplo, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### Para usuarios autentificados

- Al crear una cuenta nueva, debe elegir una ubicación del centro de datos.
- Deberá volver a la misma ubicación para iniciar sesión.
- Las cuentas y secretos existentes permanecen en su centro de datos original.

### Para todos los usuarios

- Los secretos creados sin una jurisdicción de subdominio (por ejemplo, onetimesecret.com/secret/efgh5678) seguirán enviándose por defecto a nuestro centro de datos de la UE.
- Todos los usuarios, tanto de pago como gratuitos, pueden elegir su centro de datos preferido al crear una cuenta.

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

## Precios y planes

Nuestro compromiso con la localización de datos se extiende a nuestro modelo de precios:

- Los cargos se basan en el lugar desde el que se paga, no en el lugar donde se crea la cuenta.
- Los planes Identity Plus incluyen dominios personalizados ilimitados en todos los centros de datos con una única suscripción.

## Planes de futuro

Trabajamos continuamente para ampliar nuestras opciones de centros de datos. Los planes futuros incluyen ubicaciones adicionales de centros de datos en:

- España
- España
- REINO UNIDO

Estas ampliaciones ofrecerán aún más opciones para la localización de datos, mejorando el rendimiento y las capacidades de cumplimiento para usuarios de distintas regiones.

## Configurar su región

Cuando configures tu cuenta Onetime Secret o configures un dominio personalizado, tendrás la opción de elegir la región que prefieras. Aquí te explicamos cómo:

1. Para cuentas nuevas: Seleccione su región preferida durante el proceso de registro.
2. Para cuentas existentes: Póngase en contacto con nuestro equipo de asistencia para analizar las opciones de migración de región.
3. Para dominios personalizados: Especifique la región elegida al configurar los ajustes de DNS (consulte nuestra [Guía de configuración de dominios personalizados](/docs/custom-domains/setup-guide) para obtener instrucciones detalladas).

## Preguntas frecuentes

**P: ¿Puedo cambiar de región después de configurar mi cuenta?
R: Póngase en contacto con nuestro equipo de asistencia para estudiar las opciones de migración de región. Tenga en cuenta que la migración puede implicar cierto tiempo de inactividad y transferencia de datos.

**P: ¿Afecta mi elección de región a la seguridad de mis secretos?
R: No, todas las regiones ofrecen el mismo nivel de seguridad. La elección afecta principalmente a la residencia de los datos y a la latencia potencial.

**P: ¿Existen diferencias de precio entre regiones?
R: Actualmente, nuestros precios son los mismos en todas las regiones. Consulte nuestra [página de precios](https://onetimesecret.com/pricing) para obtener la información más actualizada.

## ¿Necesitas ayuda?

Si no está seguro de qué región elegir o tiene alguna pregunta, no dude en ponerse en contacto con nuestro equipo de asistencia. Estamos aquí para ayudarle a tomar la mejor decisión para sus necesidades específicas.

- Correo electrónico: support@onetimesecret.com
- Formulario de comentarios: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Recuerda que elegir la región adecuada te garantiza el mejor rendimiento y el cumplimiento de cualquier normativa de datos relevante mientras utilizas Onetime Secret.
