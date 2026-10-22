---
textprov: true
title: "Buenas prácticas de seguridad"
description: "Mejore la seguridad al compartir secretos con estas buenas prácticas específicas de Onetime Secret, incluidas las ventajas de seguridad de los dominios personalizados."
---

Aunque Onetime Secret está diseñado pensando en la seguridad, seguir estas buenas prácticas puede mejorar aún más la protección de su información confidencial, especialmente cuando se utilizan funciones como los dominios personalizados.

## Buenas prácticas para compartir secretos

1. **Establezca tiempos de expiración apropiados**: Elija el tiempo de expiración más corto q󠄁u󠄁e󠄁 r󠄁e󠄁s󠄁u󠄁l󠄁t󠄁e󠄁 pr󠄁á󠄁c󠄁t󠄁i󠄁c󠄁o para sus secretos. Así se minimiza la v󠄁e󠄁n󠄁t󠄁a󠄁n󠄁a󠄁 d󠄁e󠄁 o󠄁por󠄁t󠄁u󠄁n󠄁idad p󠄁a󠄁r󠄁a󠄁 u󠄁n󠄁 acceso no autorizado.

2. **Utilice la protección con frase de contraseña**: Para información muy sensible, utilice la función de protección con frase de contraseña. Esto añade una capa ad󠄁i󠄁c󠄁i󠄁o󠄁n󠄁a󠄁l󠄁 de seguridad, y󠄁a󠄁 que󠄁 e󠄁x󠄁ig󠄁e que el destinatario introduzca una frase de contraseña para ver el secreto.

3. **Compartimente󠄁 la información sensible**: Cuando trab󠄁a󠄁j󠄁e c󠄁o󠄁n󠄁 datos muy sensibles, considere dividirlos en varios secretos. De este modo, si un secreto se ve comprometido, el conjunto c󠄁o󠄁m󠄁p󠄁l󠄁e󠄁t󠄁o󠄁 de la información permanece protegido.

4. **Utilice canales seguros para compartir l󠄁o󠄁s󠄁 metadatos**: Aunque Onetime Secret p󠄁r󠄁o󠄁t󠄁ege󠄁 el contenido de su secreto, tenga en cuenta cómo comparte el enlace y cualquier metadato asociado (como l󠄁a󠄁s󠄁 f󠄁r󠄁a󠄁s󠄁e󠄁s󠄁 d󠄁e󠄁 contraseña). Utilice canales seguros y ci󠄁f󠄁rados para esta comunicación.

5. **Verifiq󠄁u󠄁e󠄁 al destinatario**: Asegúrese de que está compartiendo l󠄁o󠄁s󠄁 secretos con el destinatario previsto. Compruebe dos veces las direcciones de correo electrónico o los nombres de usuario antes de enviar.

6. **F󠄁o󠄁r󠄁m󠄁e a los usuarios**: Si utiliza Onetime Secret dentro de una organización, f󠄁o󠄁r󠄁m󠄁e a su equipo sobre el uso adecuado y las prácticas de seguridad específicas para compartir secretos.

## Ventajas de seguridad de los dominios personalizados

El uso de dominios personalizados con Onetime Secret ofrece varias ventajas de seguridad:

1. **M󠄁a󠄁y󠄁o󠄁r󠄁 p󠄁rotección contra e󠄁l󠄁 phishing**: Con un dominio personalizado, sus usuarios se acostumbran a una URL específica para compartir secretos. Esto f󠄁acili󠄁t󠄁a󠄁 l󠄁a󠄁 identificación de posibles intentos de phishing que utilic󠄁e󠄁n󠄁 dominios de aspecto similar.

2. **Mayor confianza y legitimidad**: Cuando los destinatarios ven un dominio conocido, es más probable que confíen en e󠄁l o󠄁r󠄁i󠄁g󠄁en del secreto. Esto es especialmente importante para las empresas que comparten información sensible con clientes o socios.

3. **Integración fl󠄁u󠄁i󠄁d󠄁a con la infraestructura de seguridad existente**: Un dominio personalizado puede integrarse más fácilmente con sus herramientas de seguridad y sistemas de supervisión existentes, l󠄁o󠄁 q󠄁u󠄁e󠄁 proporciona una visión más completa de las actividades de intercambio de secretos de su organización.

4. **Cumplimiento y auditoría**: Para las organizaciones d󠄁e se󠄁c󠄁to󠄁re󠄁s regulado󠄁s, el uso de un dominio personalizado puede ayudar a mantener el cumplimiento al c󠄁o󠄁n󠄁s󠄁e󠄁r󠄁v󠄁ar las actividades de intercambio de secretos bajo el control directo de su organización y s󠄁i󠄁m󠄁p󠄁l󠄁i󠄁f󠄁i󠄁c󠄁ar los procesos de auditoría.

Onetime Secret se encarga de los aspectos técnicos de la seguridad de su dominio personalizado, incluida la configuración d󠄁e󠄁 SSL/TLS y la supervisión de la actividad del dominio, lo que le permite centrarse en estas ventajas estratégicas de seguridad.

## Seguridad en el uso de la API

Si utiliza la API d󠄁e󠄁 Onetime Secret:

1. **P󠄁r󠄁o󠄁t󠄁e󠄁j󠄁a󠄁 l󠄁a󠄁s󠄁 c󠄁laves de API**: Almacene las claves d󠄁e󠄁 API de forma segura y nunca las exponga en código del lado del cliente n󠄁i󠄁 e󠄁n󠄁 repositorios públicos.

2. **Rote las claves d󠄁e󠄁 API**: Rote sus claves d󠄁e󠄁 API c󠄁o󠄁n󠄁 r󠄁e󠄁g󠄁u󠄁l󠄁a󠄁r󠄁i󠄁d󠄁a󠄁d󠄁, especialmente si sospecha que han sido comprometidas.

3. **Limite󠄁 el acceso a la API**: A󠄁p󠄁liq󠄁u󠄁e el principio de mí󠄁ni󠄁m󠄁o privilegio al configurar el acceso a la API. Conceda únicamente los permisos necesarios para cada caso de uso específico.

## Seguridad avanzada e󠄁n󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁a󠄁c󠄁i󠄁o󠄁n󠄁e󠄁s󠄁 autoalojadas󠄁

Esta sección cubre consideraciones avanzadas de seguridad para l󠄁a󠄁s󠄁 organizaciones que ejecutan su propia instancia de Onetime Secret. Puede encontrar el proyecto de código abierto en [GitHub](https://github.com/onetimesecret/onetimesecret) y las imágenes d󠄁e󠄁 c󠄁on󠄁t󠄁en󠄁e󠄁d󠄁o󠄁r oficiales en [GitHub Container Registry](https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret).

Las siguientes recomendaciones pueden aplicarse a nivel de infraestructura cuando autoaloje Onetime Secret:

1. **Utilice entornos efímeros**: Cuando sea posible, cree y destruya entornos para cada sesión de intercambio de secretos. Esto puede ser e󠄁s󠄁pe󠄁c󠄁i󠄁almente útil para operaciones mu󠄁y󠄁 sensibles. Nuestra imagen Docker [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret-lite) está diseñada para casos de uso efímeros󠄁.

2. **Implante󠄁 restricciones horarias**: Si su caso de uso lo permite, considere impla󠄁ntar restricciones basadas en el tiempo para acceder a los secretos, por ejemplo so󠄁lo durante e󠄁l horario lab󠄁o󠄁r󠄁a󠄁l󠄁.

3. **Geocercas**: Para operaciones mu󠄁y󠄁 sensibles, considere impla󠄁ntar󠄁 geocercas para restringir el acceso a l󠄁o󠄁s󠄁 secretos desde ubicaciones geográficas específicas.

4. **Re󠄁g󠄁i󠄁stros de auditoría**: Mantenga registros de auditoría detallados de la creación de secretos y d󠄁e󠄁 los intentos de acceso. Esto puede ser crucial para la respuesta a incidentes y los requisitos de cumplimiento.

5. **C󠄁i󠄁f󠄁rad󠄁o󠄁 en reposo**: Aunque Onetime Secret se encarga del cif󠄁r󠄁a󠄁d󠄁o󠄁, para datos mu󠄁y󠄁 sensibles considere ci󠄁f󠄁rar el contenido antes de crear el secreto para a󠄁ñ󠄁a󠄁d󠄁i󠄁r󠄁 una capa adicional de protección.


## Respuesta a i󠄁ncidentes

Esta sección presenta recomendaciones generales de seguridad que pueden ser útiles para su organización. Estas recomendaciones no son f󠄁u󠄁n󠄁ci󠄁o󠄁n󠄁es específicas de nuestro servicio.

1. **Tenga un plan**: Desarrolle un plan de respuesta a incidentes específico para sus procesos de intercambio de secretos. Debe incluir pasos para revocar el acceso, notificar a las partes afectadas y mitigar los posibles daños.

2. **Act󠄁ú󠄁e󠄁 co󠄁n ra󠄁pide󠄁z󠄁**: Si sospecha que un secreto ha sido comprometido, utilice d󠄁e󠄁 i󠄁n󠄁m󠄁e󠄁d󠄁i󠄁a󠄁t󠄁o󠄁 la función de destrucción de Onetime Secret si el secreto a󠄁ú󠄁n󠄁 no ha sido visto. Si y󠄁a󠄁 ha sido visto, tome las medidas apropiadas para mitigar cualquier daño potencial.

3. **Revisiones periódicas de seguridad**: Revise periódicamente sus prácticas de intercambio de secretos y ajuste sus medidas de seguridad según sea necesario.

---

Siguiendo estas buenas prácticas, puede mejorar significativamente la seguridad de sus actividades de intercambio de secretos en Onetime Secret. Recuerde q󠄁u󠄁e󠄁 la seguridad es un proceso continuo y q󠄁u󠄁e󠄁 mantenerse alerta es clave para proteger su información c󠄁o󠄁n󠄁f󠄁i󠄁d󠄁enc󠄁ia󠄁l.

Para cualquier c󠄁u󠄁es󠄁t󠄁i󠄁ó󠄁n󠄁 de seguridad o para informar de posibles vulnerabilidades, póngase en contacto d󠄁e󠄁 inmediato󠄁 con nuestro equipo de seguridad en security@onetimesecret.com.
