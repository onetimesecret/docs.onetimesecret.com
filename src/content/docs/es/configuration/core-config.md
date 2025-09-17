---
title: Referencia de configuración del núcleo
description: Referencia completa para la configuración de la infraestructura de OneTimeSecret (config.yaml)
---

La configuración del núcleo gestiona los parámetros fundamentales de la infraestructura de OneTimeSecret a través de `etc/config.yaml`. Estos parámetros requieren el reinicio de la aplicación para modificarlos y forman la base de las operaciones del sistema.

## Configuración del sitio

### Configuración básica

```yaml
site:
  # hostname y puerto primario
  host: localhost:3000

  # Habilitar la aplicación de HTTPS
  ssl: false

  # Clave secreta de aplicación para operaciones criptográficas
  # CRITICAL: Debe cambiarse por defecto antes de producción
  secreto: CHANGEME
```

### Sistema de Autenticación

```yaml
sitio:
  authentication:
    # Alternar sistema de autenticación
    activado: true

    # Direcciones de correo electrónico de administradores con privilegios elevados
    # El término "coronel" hace referencia al acceso protegido al núcleo del sistema
    coroneles:
      - admin@example.com
```

### Protección Anti-Bot (Altcha)

```yaml
sitio:
  autenticidad:
    # método de protección (actualmente soporta 'altcha')
    tipo: altcha

    # Clave HMAC para retos de autenticidad
    # CRITICAL: Reemplazar valor por defecto
    clave_secreta: <REPLACE_WITH_STRONG_HMAC_KEY>
```

### Security Middleware

Protecciones de seguridad conmutables individualmente de rack-contrib y rack-protection:

```yaml
middleware:
  # Servir frontend Vue activos de la aplicación
  static_files: true

  # Sanitize request parameters for proper UTF-8 encoding
  utf8_sanitizer: true

  # Protección CSRF mediante validación de origen
  http_origin: true

  # Escape de entidades HTML en los parámetros de la petición
  escaped_params: true

  # Cabecera del navegador X-XSS-Protection
  xss_header: true

  # Protección contra clickjacking mediante X-Frame-Options
  frame_options: true

  # Bloquear ataques de cruce de directorio
  path_traversal: true

  # Prevenir la fijación de sesión a través de la manipulación de cookies
  cookie_tossing: true

  # Validar direcciones IP contra spoofing
  ip_spoofing: true

  # Forzar HTTPS mediante cabeceras HSTS
  strict_transport: true
```

## Configuración de almacenamiento

### Redis Connection

```yaml
almacenamiento:
  db:
    connection:
      # Redis cadena de conexión
      url: redis://localhost:6379
```

### Database Mapping

Asignación de la base de datos Redis por tipo de datos (0-15 disponibles):

```yaml
almacenamiento:
  db:
    database_mapping:
      session: 1 # Almacenamiento de sesión de usuario
      splittest 1 # Datos de pruebas A/B
      custom_domain: 6 # Configuraciones de dominio personalizadas
      customer 6 # Datos de cuenta de cliente
      subdomain: 6 # Asignaciones de subdominio
      metadatos 7 # Metadatos secretos
      email_receipt: 8 # Seguimiento de entrega de correo electrónico
      secret: 8 # Almacenamiento secreto encriptado
      rate_limit: 2 # Contadores de limitación de velocidad
      feedback: 11 # Comentarios de los usuarios
      exception_info: 12 # Datos de seguimiento de errores
      system_settings: 15 # Caché de configuración de tiempo de ejecución
```

## Configuración de correo

### Configuración de la conexión

```yaml
mail:
  connection:
    # Método de entrega: 'ses', 'smtp', etc.
    modo: smtp

    # región AWS SES (para el modo 'ses')
    región: us-east-1

    # Sender configuration
    # CRITICAL: Cambiar de por defecto
    from: CHANGEME@example.com
    fromname: Onetime Secret

    # Configuración SMTP
    host: smtp.ejemplo.com
    puerto 587
    usuario: username
    pass: contraseña
    auth: login
    tls: true
```

### Development Mail Setup

Para el desarrollo local con Mailpit:

```yaml
mail:
  connection:
    modo: smtp
    host: 127.0.0.1
    puerto 1025
    usuario: ~
    pass: ~
    auth: false
    tls: false
```

## Internacionalización

### Configuración básica

```yaml
i18n:
  # Alternar características de internacionalización
  activado: true

  # Código de idioma por defecto
  default_locale: en
```

### Locale Fallbacks

Definir cadenas alternativas cuando faltan traducciones:

```yaml
i18n:
  fallback_locale:
    fr-CA: [fr_CA, fr_FR, en]
    fr: [fr_FR, fr_CA, en]
    de-AT: [de_AT, de, en]
    de: [de, de_AT, en]
    por defecto: [en]
```

### Locales disponibles

Traducciones completas disponibles:

```yaml
i18n:
  locales:
    # European
    - bg
    - da_DK
    - de
    - de_AT
    - el_GR
    - es
    - es
    - fr_CA
    - fr_FR
    - it_IT
    - nl
    - pl
    - sv_SE
    - tr
    - uk

    # Asia
    - ja
    - ko

    # Pacífico
    - mi_NZ

    # América
    - pt_BR
```

Locales parcialmente traducidos:

```yaml
i18n:
  incompleto:
    - ar
    - ca_ES
    - cs
    - he
    - hu
    - pt_PT
    - ru
    - sl_SI
    - vi
    - zh
```

## Configuración de desarrollo

### Modo Desarrollo

```yaml
desarrollo:
  # Auto-detectar desde RACK_ENV
  enabled: <%= ['desarrollo', 'dev'].include?(ENV['RACK_ENV']) %>

  # Habilitar el registro de depuración
  debug: false

  # Servidor de desarrollo frontend
  # Use 'http://localhost:5173' para proxy Vite incorporado
  # Dejar vacío si se utiliza proxy inverso externo
  frontend_host: http://localhost:5173
```

## Características experimentales

### Secret Rotation

```yaml
experimental:
  # Permitir la ejecución sin site.secret (PELIGROSO)
  # Sólo para escenarios de recuperación o migración
  allow_nil_global_secret: false

  # Claves secretas anteriores para rotación
  # Eliminar después de que todos los secretos caduquen o volver a cifrar
  secretos_rotados: []

  # Freeze middleware stack after initialization
  freeze_app: false
```

## Variables de entorno

Todos los valores admiten plantillas ERB:

```yaml
# Simple override with default
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Conversión booleana
ssl: <%= ENV['SSL'] == 'true' | false %>

# Valor requerido (no por defecto)
secret: <%= ENV['SECRET'] || 'CHANGEME' %>

# Valor opcional
api_key: <%= ENV['API_KEY'] %>
```

## Lista de control de seguridad

Antes del despliegue en producción:

1. **Cambiar todos los valores de CHANGEME**
   - `site.secret`
   - site.authenticity.secret_key
   - `mail.connection.from`
   - `site.authentication.colonels`

2. **Configurar la seguridad de Redis
   - Establecer contraseña segura
   - Habilitar SSL si es remoto
   - Restringir el acceso a la red

3. **Habilitar middleware de seguridad
   - Revise cada ajuste
   - Desactivar sólo con protección proxy equivalente

4. **Configurar la entrega del correo**
   - Configurar SMTP o SES
   - Probar la entrega del correo
   - Establecer dirección de remitente válida

5. **Revisar las características experimentales**
   - Asegurarse de que todas están desactivadas
   - Documentar las excepciones
