---
title: Guía de variables de entorno
description: Uso de variables de entorno para configurar OneTimeSecret
---

OneTimeSecret admite anulaciones de variables de entorno para todos los valores de configuración, lo que permite un despliegue flexible en diferentes entornos sin modificar los archivos de configuración.

## Sustituir Sintaxis

Los archivos de configuración utilizan plantillas ERB para las variables de entorno:

```yaml
# Simple override with default
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Conversión booleana
ssl: <%= ENV['SSL'] == 'true' | false %>

# Valor requerido
secret: <%= ENV['SECRET'] || 'CHANGEME' %>

# Valor opcional (nil si no se establece)
api_key: <%= ENV['API_KEY'] %>
```

## Variables de configuración del núcleo

### Essential Settings

```bash
# Identidad de la aplicación
HOST=onetimesecret.com
SSL=verdadero
SECRET=su-clave-secreta

# Acceso de administrador
COLONEL=admin@company.com
```

### Redis Configuration

```bash
# Cadena de conexión completa
REDIS_URL=redis://contraseña@localhost:6379/0

# O bases de datos individuales
REDIS_DBS_SESSION=1
REDIS_DBS_SECRET=8
REDIS_DBS_METADATA=7
```

### Mail Configuration

```bash
# Configuración SMTP
EMAILER_MODE=smtp
FROM_EMAIL=noreply@company.com
FROMNAME="Secretos de empresa"
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=su-clave-api
SMTP_AUTH=inicio de sesión
SMTP_TLS=true

# O AWS SES
EMAILER_MODE=ses
AWS_REGION=europa-este-1
```

### Security Settings

```bash
# Autenticación
AUTH_ENABLED=verdadero
AUTH_SIGNUP=verdadero
AUTH_SIGNIN=true
AUTH_AUTOVERIFY=false

# Protección anti-bot
AUTHENTICITY_TYPE=altcha
AUTHENTICITY_SECRET_KEY=clave-hmac-strong
```

## Variables de configuración del sistema

### Interfaz de usuario

```bash
# Personalización de la cabecera
HEADER_ENABLED=true
LOGO_URL=/activos/empresa-logo.png
LOGO_ALT="Compartir secretos de empresa"
SITE_NAME="SecureShare"
HEADER_NAV_ENABLED=true

# Enlaces a pie de página
FOOTER_LINKS=true
TERMS_URL=/condiciones generales
PRIVACY_URL=/privacidad
```

### Feature Toggles

```bash
# Acceso API
API_ENABLED=true

# Soporte multi-región
REGIONS_ENABLED=true
JURISDICTION=eu

# Dominios personalizados
DOMAINS_ENABLED=true
DEFAULT_DOMAIN=secretos.empresa.com
```

### Diagnostics

```bash
# Seguimiento de errores de Sentry
DIAGNOSTICS_ENABLED=true
SENTRY_DSN=https://key@sentry.io/project
SENTRY_SAMPLE_RATE=0.10
SENTRY_LOG_ERRORS=true

# DSNs frontend/backend separados
SENTRY_DSN_BACKEND=https://key@sentry.io/backend
SENTRY_DSN_FRONTEND=https://key@sentry.io/frontend
```

## Configuración de desarrollo

```bash
# Modo desarrollo
RACK_ENV=desarrollo
ONETIME_DEBUG=true
FRONTEND_HOST=http://localhost:5173

# Seguridad relajada para pruebas
ALLOW_NIL_GLOBAL_SECRET=true
```

## Docker Configuration

Ejemplo `docker-compose.yml` con variables de entorno:

```yaml
versión: '3
servicios:
  app:
    image: onetimesecret/onetimesecret
    entorno:
      - HOST=${HOST:-localhost:3000}
      - SSL=${SSL:-false}
      - SECRET=${SECRET}
      - REDIS_URL=redis://redis:6379/0
      - FROM_EMAIL=${FROM_EMAIL}
      - CORONEL=${CORREO_ADMIN}
    archivo_env:
      - .env
```

## Configuración de Kubernetes

ConfigMap ejemplo:

```yaml
apiVersion: v1
tipo: ConfigMap
metadatos:
  nombre: onetimesecret-config
datos:
  HOST: "secretos.empresa.com"
  SSL: "true"
  AUTH_ENABLED: "true"
  API_ENABLED: "true"
```

Un ejemplo secreto:

```yaml
apiVersion: v1
tipo: Secret
metadatos:
  nombre: onetimesecret-secrets
type: Opaco
stringData:
  SECRET: "tu-clave-secreta"
  REDIS_URL: "redis://contraseña@redis:6379/0"
  SMTP_PASSWORD: "smtp-api-key"
  AUTHENTICITY_SECRET_KEY: "hmac-key"
```

## Mejores prácticas

### Seguridad

1. **Utilizar archivos `.env` localmente, gestión de secretos en producción.
2. **Especialmente `SECRET` y claves de autenticación.
3. **Utilizar valores fuertes** - Generar claves criptográficamente seguras.

### Organización

1. **Agrupar por propósito**:
   ```bash
   # === Core Settings ===
   HOST=onetimesecret.com
   SECRET=...

   # === Redis ===
   REDIS_URL=...

   # === Mail ===
   FROM_EMAIL=...
   ```

2. **Requisitos del documento**:
   ```bash
   # Requerido: Secreto de aplicación (generado con: openssl rand -hex 32)
   SECRET=

   # Opcional: Dominio personalizado (por defecto HOST)
   DEFAULT_DOMAIN=
   ```

### Deployment

1. **Utilizar archivos específicos del entorno**:
   - `.env.desarrollo`
   - entorno de pruebas
   - entorno de producción

2. **Validar variables requeridas**:
   ```bash
   /bin/bash
   required_vars="SECRET REDIS_URL FROM_EMAIL"
   for var in $variables_requeridas; do
     if [ -z "${!var}" ]; then
       echo "Error: $var es requerido"
       exit 1
     fi
   hecho
   ```

3. **Proporcionar valores por defecto cuando sea razonable**:
   ```bash
   # Valores por defecto de desarrollo
   HOST=${HOST:-localhost:3000}
   SSL=${SSL:-false}
   REDIS_URL=${REDIS_URL:-redis://localhost:6379/0}
   ```

## Patrones comunes

### Producción mínima

```bash
# Requerido
HOST=onetimesecret.com
SSL=verdadero
SECRET=<secreto generado>
REDIS_URL=redis://:<contraseña>@redis:6379/0
FROM_EMAIL=noreply@company.com
COLONEL=admin@company.com

# Recomendado
AUTHENTICITY_SECRET_KEY=<clave generada>
SENTRY_DSN=https://key@sentry.io/project
```

### Full Enterprise

```bash
# Núcleo
HOST=secretos.empresa.com
SSL=verdadero
SECRET=<bóveda:secret/onetimesecret/app-secret>
COLONEL=security-team@company.com

# Características
DOMAINS_ENABLED=true
DEFAULT_DOMAIN=secretos.empresa.com
AUTH_AUTOVERIFY=true
API_ENABLED=true

# Infraestructura
REDIS_URL=<bóveda:secret/onetimesecret/redis-url>
EMAILER_MODE=ses
AWS_REGION=europa-este-1

# Monitorización
DIAGNOSTICS_ENABLED=true
SENTRY_DSN=<bóveda:secret/onetimesecret/sentry-dsn>
SENTRY_SAMPLE_RATE=0.25

# Marca
LOGO_URL=https://cdn.company.com/logo.png
SITE_NAME="Secretos de empresa"
FOOTER_LINKS=true
TERMS_URL=https://company.com/terms
PRIVACY_URL=https://company.com/privacy
```

## Solución de problemas

### Ver configuración resuelta

Compruebe qué variables de entorno se están utilizando:

```bash
# Listar todas las variables relacionadas con OTS
env | grep -E '^(HOST|SSL|SECRET|REDIS|COLONEL|AUTH_|SMTP_|FROM)'

# Probar resolución ERB
erb config.yaml | grep -A5 "site:"
```

### Problemas comunes

1. **Conversión booleana** - Usar coincidencia exacta de cadenas:
   ```bash
   # Corregir
   SSL=true
   AUTH_ENABLED=false

   # Incorrecto (se evalúa como verdadero)
   SSL=1
   AUTH_ENABLED=no
   ```

2. **Faltan comillas** - Interpretación de Shell:
   ```bash
   # Problemático
   REDIS_URL=redis://pass@host:6379

   # Seguro
   REDIS_URL="redis://pass@host:6379"
   ```

3. **Precedencia** - Las variables de entorno siempre prevalecen sobre los valores del fichero:
   ```yaml
   # Este valor por defecto se ignora si ENV['HOST'] está configurado
   host: <%= ENV['HOST'] || 'localhost:3000' %>
   ```

4. **ERB errores de sintaxis** - Comprueba la sintaxis de Ruby:
   ```yaml
   # Incorrecto - faltan comillas
   valor: <%= ENV[HOST] %>

   # Corregir
   valor: <%= ENV['HOST'] %>
   ```
