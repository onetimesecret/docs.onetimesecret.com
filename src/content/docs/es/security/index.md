---
title: Seguridad y confianza
description: Cómo protege Onetime Secret sus secretos — el modelo de seguridad, el tratamiento de los datos, la residencia regional y cómo notificar una vulnerabilidad.
---

Onetime Secret existe para hacer llegar información confidencial de una persona
a otra sin dejarla olvidada en bandejas de entrada, registros de chat o sistemas
de tickets. Esta sección explica cómo está construido el servicio para hacerlo
de forma segura y dónde encontrar los detalles.

## El modelo de seguridad en resumen

- **Acceso de un solo uso.** Un secreto está diseñado para verse una sola vez
  y, después, destruirse de forma permanente. Una vez leído (o expirado), ya no
  existe.
- **Cifrado en tránsito y en reposo.** Los secretos se cifran en tránsito y en
  reposo en todos los planes.
- **Protección con frase de contraseña.** Puede exigir una frase de contraseña
  para ver un secreto, lo que añade una capa que el enlace por sí solo no puede
  desbloquear.
- **Limitado en el tiempo por diseño.** Los secretos tienen una expiración;
  elija la vida útil más corta posible para minimizar la exposición.
- **Destruir antes de leer.** Si un secreto aún no se ha visualizado, puede
  destruirlo para que nunca pueda leerse.
- **Minimización de datos.** Procuramos recopilar y conservar solo lo
  necesario — consulte [Minimización de datos](/es/principles/data-minimization).

## Explore esta sección

- **[Protección de datos](/es/security/data-protection)** — qué almacenamos, durante cuánto tiempo, dónde residen los datos y cómo se corresponde esto con las necesidades de cumplimiento.
- **[Buenas prácticas de seguridad](/es/security-best-practices)** — orientación práctica para compartir secretos de forma segura, incluidas las ventajas de los dominios personalizados.
- **[Notificación de vulnerabilidades](/es/security/vulnerability-disclosure)** — cómo notificar un problema de seguridad de forma responsable.

## Contenido relacionado

- **[Nuestros principios](/es/principles)** — Privacidad ante todo, Comunicación y Minimización de datos.
- **[Regiones del centro de datos](/es/regions)** — elija dónde se procesan y almacenan sus datos.
- **[Autoalojamiento](https://github.com/onetimesecret/onetimesecret)** — ejecute Onetime Secret en su propia infraestructura para tener el control total.

## Notificar un problema de seguridad

Si cree que ha encontrado una vulnerabilidad, póngase en contacto con nuestro
equipo de seguridad en **security@onetimesecret.com**. Consulte
[Notificación de vulnerabilidades](/es/security/vulnerability-disclosure)
para saber qué incluir y qué esperar.
