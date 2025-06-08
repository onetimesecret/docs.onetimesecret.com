---
título: Guía de migración de configuraciones
descripción: Migración de una arquitectura de configuración monolítica a una arquitectura de configuración dividida
---

Esta guía le ayuda a migrar del archivo de configuración monolítico único de OneTimeSecret a la nueva arquitectura de configuración dividida que separa la configuración de la infraestructura central de la configuración del sistema ajustable en tiempo de ejecución.

## Entender el cambio

### Arquitectura anterior
- Un único archivo `config.yaml` que contiene todas las configuraciones
- Reinicio necesario para cualquier cambio de configuración
- Problemas mixtos de infraestructura y funcionamiento

### Nueva Arquitectura
- **Configuración del núcleo** (`config.yaml`) - Parámetros de infraestructura
- Configuración del sistema** (`system_settings.defaults.yaml`) - Parámetros operativos
- Clara separación de intereses
- Parámetros ajustables en tiempo de ejecución a través de la base de datos

## Visión general de la migración

### What Moves Where

| Tipo de Configuración | Ubicación Antigua | Ubicación Nueva | Tiempo de ejecución Ajustable |
|-------------|--------------|--------------|-------------------|
| Conexión Redis | `:redis:` | Core config: `storage.db` No
| Servidor de correo electrónico `:emailer:` Core config: No.
| Site host/SSL | `:site:` | Core config: No
| Personalización de la interfaz de usuario: `:site:interface:` Configuración del sistema: Interfaz de usuario Sí
| Banderas de características: `:site:` (mixto) Configuración del sistema: `features` Sí
| Límites de velocidad | `:limits:` | Configuración del sistema: Sí
| Diagnóstico: `:diagnostics:` Configuración del sistema: `diagnostics` Sí

## Migración paso a paso

### Paso 1: Copia de seguridad de la configuración actual

```bash
# Backup de la configuración existente
cp etc/config.yaml etc/config.yaml.backup
cp etc/config.yaml etc/config.monolithic.yaml

# Si utiliza variables de entorno, documéntelas
env | grep -E '^(HOST|SSL|SECRET|REDIS|SMTP)' > env.backup
```

### Paso 2: Crear nuevos archivos de configuración

Crea `etc/config.yaml` con la configuración del núcleo:

```yaml
# Core infrastructure configuration
sitio:
  host: <%= ENV['HOST'] || 'localhost:3000' %>
  ssl: <%= ENV['SSL'] == 'true' | false %>
  secret: <%= ENV['SECRET'] | nil %>

  autenticación:
    habilitada: <%= ENV['AUTH_ENABLED'] != 'false' %>
    coroneles:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>

  autenticidad:
    tipo: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>

almacenamiento:
  db:
    connection:
      url: <%= ENV['REDIS_URL'] || 'redis://localhost:6379/0' %>
    database_mapping:
      session: <%= ENV['REDIS_DBS_SESSION'] || 1 %>
      secret: <%= ENV['REDIS_DBS_SECRET'] || 8 %>
      metadatos: <%= ENV['REDIS_DBS_METADATA'] || 7 %>
      # ... otras asignaciones

mail:
  connection:
    mode: <%= ENV['EMAILER_MODE'] || 'smtp' %>
    de: <%= ENV['FROM_EMAIL'] || 'CHANGEME@example.com' %>
    # ... otros ajustes de correo

i18n:
  enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>
  default_locale: <%= ENV['I18N_DEFAULT_LOCALE'] || 'en' %>
  # ... configuración regional

desarrollo:
  enabled: <%= ['desarrollo', 'dev'].include?(ENV['RACK_ENV']) %>
  frontend_host: <%= ENV['FRONTEND_HOST'] || 'http://localhost:5173' %>

experimental:
  middleware:
    # Configuración del middleware de seguridad
    utf8_sanitizer: true
    path_traversal: true
    # ... otros middleware
```

Crea `etc/system_settings.defaults.yaml` con la configuración operativa:

```yaml
# Configuración operativa ajustable en tiempo de ejecución
interfaz_de_usuario:
  header:
    enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
    marca:
      logo:
        url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
        alt: <%= ENV['LOGO_ALT'] | 'Comparte un secreto una sola vez' %>
      site_name: <%= ENV['SITE_NAME'] %>

  footer_links:
    enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
    # ... configuración de enlaces

  registro: <%= ENV['AUTH_SIGNUP'] != 'false' %>
  inicio de sesión: <%= ENV['AUTH_SIGNIN'] != 'false' %>
  autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' | false %>

api:
  enabled: <%= ENV['API_ENABLED'] != 'false' %>

secret_options:
  default_ttl: <%= ENV['DEFAULT_TTL'] | nil %>
  ttl_options: <%= (ENV['TTL_OPTIONS'] | nil) %>

características:
  dominios:
    enabled: <%= ENV['DOMAINS_ENABLED'] == 'true' || false %>
    por defecto: <%= ENV['DEFAULT_DOMAIN'] | nil %>

  planes:
    enabled: <%= ENV['PLANS_ENABLED'] == 'true' | false %>
    stripe_key: <%= ENV['STRIPE_KEY'] | nil %>

  regiones:
    enabled: <%= ENV['REGIONS_ENABLED'] == 'true' | false %>
    jurisdicción_actual: <%= ENV['JURISDICTION'] | nil %>

diagnóstico:
  centinela:
    defaults:
      dsn: <%= ENV['SENTRY_DSN'] | nil %>
      sampleRate: <%= ENV['SENTRY_SAMPLE_RATE'] || '0.10' %>

límites:
  crear_secreto: 100000
  mostrar_secreto: 2000
  # ... otros límites

mail:
  validación:
    recipients:
      default_validation_type: :mx
      # ... ajustes de validación
```

### Paso 3: Asignar los ajustes antiguos a las nuevas ubicaciones

Asignaciones comunes de configuración monolítica a dividida:

```yaml
# OLD (monolítico)
:site:
  :host: localhost:3000
  :interfaz:
    :ui:
      :enabled: true
    :api:
      :enabled: true

# NEW (split)
# En config.yaml:
site:
  host: localhost:3000

# En system_settings.defaults.yaml:
api:
  enabled: true
```

### Paso 4: Actualizar las variables de entorno

Algunos nombres de variables de entorno han cambiado:

```bash
# Antiguos → Nuevos mapeos
REDIS_URL → REDIS_URL (sin cambios)
COLONEL → COLONEL (sin cambios)
FROM → FROM_EMAIL
UI_ENABLED → (eliminado - siempre activado)
HEADER_NAV_ENABLED → HEADER_ENABLED
```

### Paso 5: Probar la configuración

1. **Validación de sintaxis**:
   ```bash
   # Comprueba la sintaxis de YAML
   ruby -ryaml -e "YAML.load_file('etc/config.yaml')"
   ruby -ryaml -e "YAML.load_file('etc/system_settings.defaults.yaml')"
   ```

2. **Iniciar la aplicación en modo de prueba**:
   ```bash
   RACK_ENV=desarrollo bin/rackup -p 3000
   ```

3. **Verificar la configuración crítica**:
   - La conexión a Redis funciona
   - La configuración del correo es correcta
   - La autenticación funciona correctamente
   - Se aplican los límites de velocidad

### Paso 6: Implantar los cambios

1. **Desplegar nuevos archivos de configuración**
2. **Actualizar variables de entorno**
3. **Reiniciar la aplicación
4. **Vigilar errores**

## Problemas comunes de la migración

### Problema: Falta Configuración

**Síntoma**: La aplicación no se inicia con un método indefinido o errores nulos

**Solución**: Compruebe que todos los ajustes de la configuración monolítica se asignan a la configuración del núcleo o a la configuración del sistema.

### Problema: Ubicación incorrecta de la configuración

**Síntoma**: Los cambios en tiempo de ejecución no surten efecto

**Solución**: Asegúrese de que la configuración operativa está en `system_settings.defaults.yaml`, no en `config.yaml`.

### Problema: Conflictos de variables de entorno

**Síntoma**: Los ajustes no se aplican como se esperaba

**Solución**: Compruebe si hay nombres de variables de entorno antiguos y actualícelos a la nueva convención de nomenclatura.

## Rollback Plan

Si surgen problemas, vuelva a la configuración monolítica:

1. **Restaurar copia de seguridad**:
   ```bash
   cp etc/config.monolithic.yaml etc/config.yaml
   ```

2. **Eliminar nuevos archivos**:
   ```bash
   rm etc/system_settings.defaults.yaml
   ```

3. **Reiniciar la aplicación

## Post-Migración

### Verificar Funcionalidad

- [ ] Se pueden crear y recuperar secretos
- [ ] La autenticación funciona
- [ ] Funciona el envío de correo electrónico
- [ ] La limitación de tarifas está activa
- [ ] Aparecen personalizaciones de la interfaz de usuario
- [ ] Los puntos finales de la API responden

### Clean Up

1. **Eliminar los archivos de copia de seguridad** tras una migración correcta
2. **Documentar** cualquier configuración personalizada
3. **Actualizar** los scripts de despliegue
4. **Formar** al equipo en la nueva estructura de configuración

## Beneficios tras la migración

1. **Flexibilidad operativa** - Cambio de funciones sin reinicio
2. **Separación clara** - Infraestructura frente a preocupaciones operativas
3. 3. **Mayor seguridad** - Aislamiento de los parámetros sensibles
4. 4. **Facilitar la gestión** - Organización lógica de las configuraciones
5. **Preparado para el futuro** - Preparado para una configuración dinámica


###FILEID:09149bd7##FILENAME:system-settings.txt###

---
título: Referencia de la configuración del sistema
descripción: Referencia completa para la configuración operativa de OneTimeSecret (system_settings.defaults.yaml)
---

La configuración del sistema define parámetros operativos que pueden modificarse en tiempo de ejecución a través de `etc/system_settings.defaults.yaml`. A diferencia de la configuración del núcleo, estos ajustes se centran en las características orientadas al usuario y los límites operativos.

## Interfaz de usuario

### Configuración de la cabecera

```yaml
interfaz_usuario:
  header:
    # Alternar personalización de cabecera
    enabled: true

    marca:
      logo:
        # Ruta de la imagen del logotipo o nombre del componente Vue
        url: DefaultLogo.vue
        alt: Compartir un secreto de una sola vez
        href: /

      # Override site name (falls back to i18n)
      nombre_sitio: ~

    navegación:
      # Alternar navegación de cabecera
      habilitado: true
```

### Enlaces a pie de página

```yaml
interfaz_usuario:
  footer_links:
    # Interruptor maestro para los enlaces de pie de página
    enabled: false

    grupos:
      - nombre: legales
        i18n_key: web.footer.legales
        enlaces:
          - text: Condiciones del servicio
            i18n_key: términos-de-servicio
            url: /condiciones
            externo: false

          - texto: Política de privacidad
            i18n_key: política-de-privacidad
            url: /privacidad
            externo: false
```

### Authentication UI

```yaml
user_interface:
  # Habilitar registro de usuarios
  registro: true

  # Habilitar inicio de sesión de usuario
  inicio de sesión: true

  # Auto-verificar direcciones de correo electrónico
  autoverify: false
```

## Configuración API

```yaml
api:
  # Alternar acceso API
  enabled: true
```

## Opciones Secretas

```yaml
secret_options:
  # TTL por defecto en segundos cuando no se especifica ninguno
  default_ttl: 604800 # 7 días

  # Opciones TTL disponibles (en segundos)
  ttl_options:
    - 300 # 5 minutos
    - 3600 # 1 hora
    - 86400 # 1 día
    - 604800 # 7 días
```

## Características

### Procesamiento del correo electrónico entrante

```yaml
características:
  incoming:
    enabled: false
    correo electrónico: incoming@example.com
    passphrase: abacus
    # Patrón de validación para el contenido entrante
    regex: ~
```

### Analytics (StatHat)

```yaml
características:
  stathat:
    enabled: false
    apikey: ~
    default_chart: ~
```

### Soporte multirregión

```yaml
características:
  regiones:
    enabled: false
    jurisdicción_actual: us
    jurisdicciones:
      - nombre: us
        dominio: onetimesecret.es
        icono: 🇺🇸
      - nombre: eu
        dominio: eu.onetimesecret.com
        icono: 🇪🇺
```

### Planes de suscripción

```yaml
características:
  planes:
    enabled: false
    stripe_key: ~
    webhook_signing_secret: ~
    enlaces_de_pago:
      nivel1: ~
      nivel2: ~
      nivel3: ~
```

### Dominios personalizados

```yaml
características:
  dominios:
    enabled: false
    # Dominio por defecto para la generación de enlaces
    por defecto: ~

    cluster:
      tipo: ~
      api_key: ~
      cluster_ip: <CLUSTER_IP>
      cluster_host: <CLUSTER_HOST>
      nombre_cluster: <nombre_cluster>
      vhost_target: <VHOST_TARGET>
```

## Diagnóstico

### Sentry Integration

```yaml
diagnósticos:
  sentry:
    defaults:
      # Primary Sentry DSN
      dsn: ~
      # Porcentaje de eventos a muestrear (0.0 a 1.0)
      sampleRate: 0.10
      # Máximo de migas de pan a capturar
      maxBreadcrumbs: 5
      # Registrar errores en consola
      logErrors: true

    backend:
      # DSN específico de Ruby
      dsn: ~

    frontend:
      # DSN específico de Vue
      dsn: ~
      # Habilitar seguimiento de componentes Vue
      trackComponents: true
```

## Límites de tarifa

Límites por usuario en ventanas móviles de 20 minutos:

### Core Operations

```yaml
límites:
  # Gestión de secretos
  crear_secreto: 100000
  mostrar_secreto: 2000
  quemar_secreto: 2000
  show_metadata: 2000
```

### Authentication

```yaml
límites:
  # Operaciones de cuenta
  crear_cuenta: 10
  autenticar_sesión: 50
  frase_pass fallida: 15

  # Recuperación de contraseña
  solicitud_contraseña_olvidada: 20
  forgot_password_reset: 30
```

### Gestión de cuentas

```yaml
límites:
  # Gestión de perfiles
  actualizar_cuenta: 10
  destroy_account: 2
```

### Gestión de dominios

```yaml
límites:
  # Operaciones de dominio personalizadas
  add_domain: 30
  eliminar_dominio: 30
  listar_dominios: 100
  verificar_dominio: 100
```

## Validación de correo

### Validación del destinatario

```yaml
mail:
  validación:
    recipients:
      # Método de validación: :regex, :mx, :mx_blacklist, :smtp
      tipo_validación_por_defecto: :mx

      # Configuración de verificación SMTP
      correo_verificador: verify@example.com
      dominio_verificador: ejemplo.com
      connection_timeout: 1
      tiempo_espera_respuesta: 1
      intentos de conexión: 2

      # Restricciones de dominio
      allowed_domains_only: false

      # Servidores DNS para búsqueda MX
      dns
        - 1.1.1.1
        - 8.8.4.4
        - 208.67.220.220

      # Configuración SMTP
      smtp_port: 25
      smtp_fail_fast: true

      # Logging configuration
      logger:
        tracking_event: :error
        stdout: true
```

### Validación del correo electrónico de la cuenta

```yaml
mail:
  validación:
    accounts:
      # Estructura idéntica a destinatarios
      # Configuración separada para emails de cuentas
      default_validation_type: :mx
      # ... (mismas opciones que destinatarios)
```

## Variable de entorno Integración

Todas las configuraciones admiten plantillas ERB:

```yaml
# Boolean with environment override
enabled: <%= ENV['FEATURE_ENABLED'] != 'false' %>

# Valor por defecto
api_key: <%= ENV['API_KEY'] || 'default_value' %>

# Valor numérico
tiempo de espera: <%= ENV['TIMEOUT'] || 30 %>

# Lógica condicional
validation_type: <%= ENV['STRICT_VALIDATION'] == 'true' ? :smtp : :mx %>
```

## Configuraciones comunes

### Producción mínima

```yaml
interfaz_usuario:
  header:
    enabled: true
  footer_links:
    enabled: false
  registro: true
  iniciar sesión: true

api:
  activado: true

límites:
  crear_secreto: 1000
  mostrar_secreto: 2000
```

### Enterprise Deployment

```yaml
interfaz_usuario:
  header:
    branding:
      logo:
        url: /activos/empresa-logo.png
        alt: Compartir secretos de empresa
      site_name: SecureShare
  footer_links:
    enabled: true

características:
  dominios:
    activado: true
  planes:
    activado: false

diagnóstico:
  centinela:
    valores predeterminados:
      dsn: https://key@sentry.company.com/project
      sampleRate: 0.25
```

### Entorno de desarrollo

```yaml
interfaz_usuario:
  autoverify: true

límites:
  # Límites relajados para pruebas
  crear_secreto: 1000000
  frase_pass fallida: 100

diagnóstico:
  centinela:
    defaults:
      logErrors: true
      sampleRate: 1.0
```

## Mejores prácticas

1. **La configuración por defecto funciona bien para la mayoría de las implantaciones.

2. **Ajustar los límites de tarifa** en función de:
   - Volumen de usuarios previsto
   - Capacidad de la infraestructura
   - Requisitos de seguridad

3. **Configure la validación de correo** adecuada a sus necesidades de seguridad:
   - `:regex` - Validación rápida y básica
   - `:mx` - Verificación de la existencia del dominio
   - `:smtp` - Verificación de entrega completa

4. **Habilitar diagnósticos** en producción:
   - Configurar Sentry para el seguimiento de errores
   - Utilice frecuencias de muestreo conservadoras
   - Supervisar el impacto en el rendimiento

5. **Personalice la interfaz de usuario con cuidado:
   - Mantenga una navegación sencilla
   - Pruebe la personalización de la marca
   - Mantener la accesibilidad

###FILEID:e4418e68##FILENAME:index.txt###

---
título: Visión general de la configuración
descripción: Comprender la arquitectura de configuración de doble capa de OneTimeSecret.
---

OneTimeSecret utiliza un sistema de configuración de doble capa diseñado para separar los problemas de infraestructura de la configuración operativa. Esta arquitectura proporciona flexibilidad al tiempo que mantiene la seguridad y la estabilidad.

## Arquitectura de configuración

```
┌─────────────────────────────────────────────────────┐
│ Inicio de la aplicación │
└─────────────────────┬───────────────────────────────┘
                     │
         ┌───────────┴────────────┐
         ▼ ▼
┌─────────────────┐ ┌─────────────────────┐
│ Core Config │ │ System Settings │ │ Configuración del sistema
│ (config.yaml) │ │ (system_settings.  │
│ │ │ defaults.yaml) │
│ - Infrastructure│ │ - Operational │
Base de datos - Características
Seguridad - UI/UX
│ - Configuración de correo │ │ - Límites de tarifa │ │ │ Límites de tarifa
│ │ │ │
│ Reinicio necesario│ │ Tiempo de funcionamiento ajustable │
└─────────────────┘ └─────────────────────┘
         │ │
         └───────────┬────────────┘
                     ▼
         ┌─────────────────────┐
         │ Medio ambiente │
         │ Variables │
         │ (Anular ambas) │
         └─────────────────────┘
```

### Sistema de dos capas

1. **Configuración del núcleo** (`etc/config.yaml`)
   - Configuración de la infraestructura que requiere reinicio
   - Conexiones de bases de datos y middleware de seguridad
   - Sistemas de autenticación y entrega de correo
   - Parámetros críticos de seguridad

2. **Configuración del sistema** (`etc/system_settings.defaults.yaml`)
   - Parámetros operativos ajustables en tiempo de ejecución
   - Activación de funciones y personalización de la interfaz de usuario
   - Límites de tarifa y reglas de validación
   - Configuración de la lógica de negocio

### Filosofía de diseño

Esta separación sigue el principio de la infraestructura como código, al tiempo que permite flexibilidad operativa:

- Cambios en la implantación**: Configuración básica de los parámetros críticos del sistema
- Cambios en tiempo de ejecución**: Configuración del sistema para la gestión de características
- Aislamiento de seguridad**: Infraestructura sensible separada de los ajustes operativos

## Configuración Carga

### Startup Process

1. La configuración del núcleo se carga desde `config.yaml`.
2. Las variables de entorno anulan los valores del archivo mediante plantillas ERB
3. La configuración del sistema se carga con los valores predeterminados de `system_settings.defaults.yaml`.
4. La configuración de la base de datos puede anular los parámetros operativos en tiempo de ejecución.

### Soporte de variables de entorno

Todos los valores de configuración admiten anulaciones de variables de entorno:

```yaml
# Anulación directa
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Conversión booleana
ssl: <%= ENV['SSL'] == 'true' | false %>

# Presencia condicional
api_key: <%= ENV['API_KEY'] %>
```

## Consideraciones de seguridad

### Critical Settings

Varios valores de configuración deben modificarse con respecto a los valores por defecto antes de la producción:

- `site.secret`: Clave criptográfica de la aplicación
- `site.authenticity.secret_key`: Clave de protección anti-bot
- mail.connection.from`: Dirección de correo electrónico del remitente
- Credenciales de conexión a Redis

### Validación

La validación de la configuración se produce al iniciar la aplicación:
- Los valores no válidos impiden el inicio de la aplicación
- Mensajes de error descriptivos guían las correcciones
- Se valida la solidez de los valores críticos para la seguridad

## Próximos pasos

- Referencia de configuración del núcleo](/configuration/core-config) - Parámetros de infraestructura
- Referencia de configuración del sistema](/configuration/system-settings) - Parámetros operativos
- Variables de entorno](/configuration/environment-variables) - Patrones de anulación
- Security Hardening](/configuration/security) - Guía de seguridad de producción
