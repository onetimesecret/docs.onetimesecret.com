---
título: Guía de configuración de seguridad
descripción: Endurecimiento de OneTimeSecret para su despliegue en producción
---

Esta guía cubre los parámetros de configuración críticos para la seguridad y las mejores prácticas para implementar OneTimeSecret en entornos de producción.

## Configuración de seguridad crítica

### Application Secret

El `site.secret` se utiliza para todas las operaciones criptográficas. **Debe modificarse antes de la instalación en producción.

```yaml
site:
  secret: <%= ENV['SECRET'] || 'CHANGEME' %>
```

Generar un secreto fuerte:

```bash
# Usando OpenSSL
openssl rand -hex 32

# Usando Ruby
ruby -rsecurerandom -e 'puts SecureRandom.hex(32)'

# Establecer en el entorno
export SECRET=cadena hexadecimal de 64 caracteres generada por usted
```

**Importante**: Una vez establecido, este secreto nunca debe ser cambiado. Cambiarlo hará que los secretos existentes sean irrecuperables.

### Authentication Protection

Configure la protección anti-bot para los formularios:

```yaml
sitio:
  authenticity:
    tipo: altcha
    secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
```

Generar clave HMAC:

```bash
export AUTHENTICITY_SECRET_KEY=$(openssl rand -hex 32)
```

### Acceso de Administrador

Configure cuidadosamente las cuentas de coronel (admin):

```yaml
sitio:
  autentificación:
    colonel:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
      - security-team@company.com
```

Los coroneles tienen acceso a:
- Estadísticas del sistema
- Resumen de la configuración
- Métricas de rendimiento

## Middleware de seguridad

### Production Configuration

Habilitar todos los middleware de seguridad en producción:

```yaml
experimental:
  middleware:
    # Protecciones esenciales
    utf8_sanitizer: true # Evitar ataques de codificación
    path_traversal: true # Bloquear el cruce de directorios
    ip_spoofing: true # Validar IPs de clientes

    # HTTPS enforcement
    strict_transport: true # Cabeceras HSTS

    # Protecciones adicionales
    http_origin: true # Protección CSRF
    escaped_params: true # Prevención XSS
    xss_header: true # Filtrado XSS del navegador
    frame_options: true # Protección contra clickjacking
    cookie_tossing: true # Prevención de fijación de sesión
```

### Behind a Proxy

Cuando se ejecuta detrás de un proxy de seguridad (nginx, CloudFlare), algunos middleware pueden ser desactivados:

```yaml
experimental:
  middleware:
    # Proxy maneja estos
    strict_transport: false # El proxy añade HSTS
    xss_header: false # El proxy añade protección X-XSS
    frame_options: false # El proxy añade X-Frame-Options

    # La aplicación debe manejar estos
    utf8_sanitizer: true
    path_traversal: true
    ip_spoofing: true
    http_origin: true
    escaped_params: true
    cookie_tossing: true
```

## Redis Security

### Seguridad de la conexión

```yaml
almacenamiento:
  db:
    connection:
      # Usar autenticación por contraseña
      url: redis://:<contraseña>@localhost:6379/0

      # Para Redis 6+ con ACL
      url: redis://nombreusuario:contraseña@localhost:6379/0
```

### Network Security

1. **Bind to localhost** en la configuración de Redis:
   ```
   bind 127.0.0.1 ::1
   ```

2. **Habilitar autenticación** en redis.conf:
   ```
   requirepass your-strong-redis-password
   ```

3. **Desactivar comandos peligrosos**:
   ```
   renombrar comando FLUSHDB ""
   renombrar comando FLUSHALL ""
   renombrar comando CONFIG ""
   ```

## Mail Security

### Configuración SMTP

```yaml
mail:
  conexión:
    # Usar encriptación TLS
    tls: true
    puerto 587
    auth: login

    # Credenciales seguras
    user: <%= ENV['SMTP_USERNAME'] %>
    pass: <%= ENV['SMTP_PASSWORD'] %>

    # Dirección de remitente válida
    from: <%= ENV['FROM_EMAIL'] || 'noreply@company.com' %>
```

### Validación del correo electrónico

Configure la validación estricta para la producción:

```yaml
mail:
  validación:
    recipients:
      # Validación SMTP completa
      default_validation_type: :smtp

      # Aumentar la seguridad
      connection_attempts: 1
      smtp_fail_fast: true

      # Restringir a dominios conocidos
      allowed_domains_only: true
      dominios_permitidos:
        - empresa.com
        - socio-de-confianza.com
```

## Limitación de velocidad

### Límites de producción

Límites conservadores para el despliegue público:

```yaml
límites:
  # Core operations
  crear_secreto: 100 # Cada 20 minutos
  mostrar_secreto: 200
  quemar_secreto: 200

  # Autenticación
  crear_cuenta: 2
  autenticar_sesión: 10
  frase_pass fallida: 5

  # Recuperación
  solicitud_contraseña_olvidada: 2
  forgot_password_reset: 3
```

### Internal Deployment

Límites relajados para uso interno:

```yaml
límites:
  crear_secreto: 1000
  mostrar_secreto: 2000
  autenticar_sesión: 50
  frase_pass fallida: 10
```

## Configuración SSL/TLS

### Configuración de la aplicación

```yaml
site:
  ssl: true
  host: secretos.empresa.com
```

### Configuración SSL de Nginx

``nginx
servidor {
    listen 443 ssl http2;
    nombre_servidor secretos.empresa.com;

    # Configuración SSL moderna
    ssl_certificate /ruta/a/cert.pem;
    ssl_certificate_key /ruta/a/clave.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Cabeceras de seguridad
    add_header Strict-Transport-Security "max-age=63072000" siempre;
    add_header X-Frame-Options "SAMEORIGIN" siempre;
    add_header X-Content-Type-Options "nosniff" siempre;
    add_header X-XSS-Protection "1; mode=block" siempre;
    add_header Referrer-Policy "strict-origin-when-cross-origin" siempre;

    ubicación / {
        proxy_pass http://localhost:3000;
        proxy_set_header X-Real-IP $dirección_remota;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
    }
}
```

## Supervisión y alertas

### Error Tracking

```yaml
diagnósticos:
  sentry:
    defaults:
      dsn: <%= ENV['SENTRY_DSN'] %>
      sampleRate: 0.10
      maxBreadcrumbs: 5
      logErrors: false # Reducir el ruido del registro
```

### Security Alerts

Monitor para:
1. **Intentos de autenticación fallidos** que superen los límites de velocidad.
2. **Patrones inusuales de creación de secretos
3. **Fallos de conexión a Redis
4. **Expiración de certificados SSL

## Lista de control de la implantación

### Pre-deployment

- Generar y proteger el valor `SECRET
- Generar `AUTHENTICITY_SECRET_KEY
- [ ] Configurar correos electrónicos `COLONEL` válidos
- [ ] Configurar autenticación Redis
- [ ] Configurar certificados SSL
- [ ] Configurar límites de velocidad adecuados
- [ ] Configurar la entrega de correo
- [ ] Activar el seguimiento de errores

### Post-deployment

- [ ] Verificar la configuración SSL (SSL Labs)
- [ ] Probar la entrega de correo electrónico
- [ ] Confirmar que funciona la limitación de velocidad
- [ ] Comprobar las cabeceras de seguridad
- [ ] Supervisar las tasas de error
- [ ] Revise los registros de acceso

## Rotación Secreta

Si debe girar el secreto de aplicación:

1. **Agregar viejo secreto a la lista de rotación**:
   ```yaml
   experimental:
     rotated_secrets:
       - old-secret-value
   ```

2. **Set new primary secret**:
   ```yaml
   site:
     secreto: nuevo-valor-secreto
   ```

3. **Eliminar secretos antiguos** una vez expirado el TTL máximo.

## Cabeceras de seguridad

Cabeceras de seguridad recomendadas (a través de proxy o middleware):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
```

## Respuesta a Incidentes

Si se produce un incidente de seguridad:

1. **Rota los secretos inmediatamente**:
   - Secreto de aplicación
   - Contraseña Redis
   - Credenciales SMTP
   - Claves API

2. **Revisar registros** para:
   - Intentos de acceso no autorizados
   - Patrones inusuales de creación de secretos
   - Violaciones del límite de velocidad

3. **Notificar a los usuarios** si sus datos pueden verse afectados.

4. **Actualizar la configuración** para evitar que se repita.
