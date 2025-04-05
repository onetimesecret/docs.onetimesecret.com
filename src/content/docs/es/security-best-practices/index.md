---
title: Buenas prácticas de seguridad
description: Mejora la seguridad de tus secretos compartidos con estas mejores prácticas específicas para Onetime Secret, incluyendo los beneficios de seguridad de los Dominios Personalizados.
---

# Prácticas recomendadas de seguridad para Onetime Secret

Aunque Onetime Secret está diseñado pensando en la seguridad, seguir estas buenas prácticas puede mejorar aún más la protección de tu información confidencial, especialmente cuando se utilizan funciones como los dominios personalizados.

## Buenas prácticas para compartir secretos

1. **Establezca tiempos de expiración apropiados**: Elige el tiempo de expiración más corto posible para tus secretos. Así se minimiza la posibilidad de acceso no autorizado.

2. **Utiliza la protección con frase de contraseña**: Para información muy sensible, utiliza la función de protección con frase de contraseña. Esto añade una capa extra de seguridad, requiriendo que el destinatario introduzca una frase de contraseña para ver el secreto.

3. **Compartimentar la información sensible**: Cuando se trate de datos muy sensibles, considere la posibilidad de dividirlos en varios secretos. De este modo, si un secreto se ve comprometido, todo el conjunto de información permanece protegido.

4. **Utiliza canales seguros para compartir metadatos**: Aunque Onetime Secret asegura el contenido de tu secreto, ten en cuenta cómo compartes el enlace y cualquier metadato asociado (como contraseñas). Utiliza canales seguros y encriptados para esta comunicación.

5. **Verificar el destinatario**: Asegúrate de que estás compartiendo secretos con el destinatario previsto. Comprueba dos veces las direcciones de correo electrónico o los nombres de usuario antes de enviarlos.

6. **Educa a los usuarios**: Si utilizas Onetime Secret dentro de una organización, educa a tu equipo sobre el uso adecuado y las prácticas de seguridad específicas para compartir secretos.

## Ventajas de seguridad de los dominios personalizados

El uso de dominios personalizados con Onetime Secret ofrece varias ventajas de seguridad:

1. **Protección contra phishing mejorada**: Con un dominio personalizado, tus usuarios se acostumbran a una URL específica para compartir secretos. Esto hace que sea más fácil identificar posibles intentos de phishing que podrían utilizar dominios de aspecto similar.

2. **Mayor confianza y legitimidad**: Cuando los destinatarios ven un dominio conocido, es más probable que confíen en la fuente del secreto. Esto es especialmente importante para las empresas que comparten información sensible con clientes o socios.

3. **Integración perfecta con la infraestructura de seguridad existente**: Un dominio personalizado puede integrarse más fácilmente con sus herramientas de seguridad y sistemas de supervisión existentes, proporcionando una visión más completa de las actividades de intercambio de secretos de su organización.

4. **Cumplimiento y auditoría**: Para las organizaciones en industrias reguladas, el uso de un dominio personalizado puede ayudar a mantener el cumplimiento al mantener las actividades de intercambio de secretos bajo el control directo de su organización y hacer que los procesos de auditoría sean más sencillos.

Onetime Secret se encarga de los aspectos técnicos de la seguridad de su dominio personalizado, incluida la configuración SSL/TLS y la supervisión de la actividad del dominio, lo que le permite centrarse en estas ventajas estratégicas de seguridad.

## Seguridad en el uso de la API

Si utilizas la API Onetime Secret:

1. **Claves de API seguras**: Almacena las claves API de forma segura y nunca las expongas en código del lado del cliente o repositorios públicos.

2. **Rota las claves API**: Rota regularmente tus claves API, especialmente si sospechas que han sido comprometidas.

3. **Limitar el acceso a la API**: Utilice el principio del menor privilegio al configurar el acceso a la API. Conceda únicamente los permisos necesarios para cada caso de uso específico.

## Seguridad avanzada autoalojada

Esta sección cubre consideraciones avanzadas de seguridad para organizaciones que ejecutan su propia instancia de Onetime Secret. Puedes encontrar el proyecto de código abierto en [GitHub](https://github.com/onetimesecret/onetimesecret) y las imágenes Docker oficiales en [Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret).

Las siguientes recomendaciones pueden aplicarse a nivel de infraestructura cuando se autoaloje Onetime Secret:

1. **Utilizar entornos efímeros**: Cuando sea posible, cree y destruya entornos para cada sesión de intercambio de secretos. Esto puede ser particularmente útil para operaciones altamente sensibles. Nuestra imagen Docker [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md) está diseñada para casos de uso efímero.

2. **Implantar restricciones horarias**: Si su caso de uso lo permite, considere implementar restricciones basadas en el tiempo para acceder a los secretos, como por ejemplo sólo durante las horas de oficina.

3. **Geocercas**: Para operaciones altamente sensibles, considere la implementación de geo-cercas para restringir el acceso a secretos desde ubicaciones geográficas específicas.

4. **Rastreos de auditoría**: Mantenga registros de auditoría detallados de la creación de secretos y los intentos de acceso. Esto puede ser crucial para la respuesta a incidentes y los requisitos de cumplimiento.

5. **Encriptación en reposo**: Aunque Onetime Secret se encarga de la encriptación, para datos altamente sensibles, considera encriptar el contenido antes de crear el secreto para una capa adicional de protección.


## Respuesta a Incidentes

Esta sección presenta recomendaciones generales de seguridad que pueden ser útiles para su organización. Estas recomendaciones no son características específicas de nuestro servicio.

1. **Tenga un plan**: Desarrolle un plan de respuesta a incidentes específico para sus procesos de intercambio de secretos. Debe incluir pasos para revocar el acceso, notificar a las partes afectadas y mitigar los posibles daños.

2. **Acción rápida**: Si sospechas que un secreto ha sido comprometido, utiliza la función de grabación de Onetime Secret inmediatamente si el secreto no ha sido visto todavía. Si ha sido visto, toma las medidas apropiadas para mitigar cualquier daño potencial.

3. **Revisiones periódicas de seguridad**: Revise periódicamente sus prácticas de intercambio de secretos y ajuste sus medidas de seguridad según sea necesario.

---

Siguiendo estas buenas prácticas, puedes mejorar significativamente la seguridad de tus actividades de intercambio de secretos en Onetime Secret. Recuerda, la seguridad es un proceso continuo, y mantenerse alerta es clave para proteger tu información sensible.

Para cualquier problema de seguridad o para informar de posibles vulnerabilidades, póngase en contacto inmediatamente con nuestro equipo de seguridad en security@onetimesecret.com.
