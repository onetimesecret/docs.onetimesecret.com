---
title: Guía de migración de configuraciones
description: Migración de una arquitectura de configuración monolítica a una arquitectura de configuración dividida
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
