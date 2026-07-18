---
title: Protección de datos
description: Qué almacena Onetime Secret, cuánto tiempo se conserva, dónde se procesa y cómo esto respalda sus obligaciones de cumplimiento.
---

Esta página describe cómo trata Onetime Secret sus datos: qué se almacena,
durante cuánto tiempo, dónde residen y cómo eso respalda su propio programa de
cumplimiento.

## Qué almacenamos y durante cuánto tiempo

- **El contenido de los secretos** se cifra y está pensado para recuperarse una
  sola vez. Cuando un secreto se visualiza (o alcanza su expiración), se
  destruye de forma permanente.
- **La expiración está integrada.** Cada secreto tiene una vida útil
  (configurable dentro de los límites de su plan); nada está pensado para durar
  indefinidamente.
- **Metadatos mínimos.** En consonancia con nuestro principio de [Minimización de datos](/es/principles/data-minimization),
  procuramos conservar solo los metadatos necesarios para operar el servicio.

## Cifrado

Los secretos se **cifran en tránsito y en reposo** en todos los planes. El
transporte está protegido con TLS y, para los dominios personalizados,
gestionamos automáticamente la emisión y renovación de los certificados
SSL/TLS.

Para material especialmente sensible, puede añadir defensa en profundidad
activando una **frase de contraseña**, dividiendo la información en varios
secretos y eligiendo la expiración más corta posible — consulte
[Buenas prácticas de seguridad](/es/security-best-practices).

## Dónde se procesan sus datos (residencia)

Puede elegir la región donde se procesan y almacenan sus datos: actualmente la
UE, el Reino Unido, los EE. UU., Canadá y Nueva Zelanda. Esto le permite
mantener los datos cerca de sus usuarios y dentro de una jurisdicción que se
ajuste a sus requisitos. Consulte
[Regiones del centro de datos](/es/regions) para conocer los detalles y los
puntos de conexión.

## Cumplimiento normativo

Onetime Secret está diseñado para respaldar sus iniciativas de cumplimiento; no
sustituye sus propios controles, políticas y revisión jurídica.

- **RGPD / protección de datos.** La residencia regional de los datos, los
  datos de vida corta y la minimización de datos están diseñados para ayudarle
  a cumplir las obligaciones de protección de datos. En la mayoría de las
  implementaciones, usted actúa como responsable del tratamiento y Onetime
  Secret como encargado del tratamiento de los datos limitados implicados.
- **HIPAA.** Como se indica en nuestros [casos de uso](/es/custom-domains/use-cases),
  Onetime Secret puede ofrecer un canal más seguro que el correo electrónico
  para intercambiar credenciales de acceso iniciales, pero debe utilizarse como
  solución provisional y no como sistema de registro permanente para PHI.
  Combínelo con un sistema especializado y conforme para los flujos de trabajo
  continuos con PHI.
- **Certificaciones, acuerdos de tratamiento de datos y marcos específicos.**
  Para preguntas sobre certificaciones, un acuerdo de tratamiento de datos
  (DPA) o un marco normativo concreto, escriba a **support@onetimesecret.com**.

Para las organizaciones con requisitos estrictos de control de datos, el [autoalojamiento](https://github.com/onetimesecret/onetimesecret)
mantiene todo dentro de su propia infraestructura.

## ¿Preguntas o necesita ayuda?

Estamos aquí para ayudarle.

- Consultas generales: support@onetimesecret.com
- Problemas de seguridad: security@onetimesecret.com ([política de divulgación](/es/security/vulnerability-disclosure))
