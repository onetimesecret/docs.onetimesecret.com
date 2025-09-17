---
title: Referencia rápida
description: Hoja de trucos de configuración y guía de solución de problemas
barra lateral:
  pedido: 7
---

# Referencia rápida de configuración

## Recuperación de Emergencia

```bash
# Empieza con la configuración mínima
export SECRET=$(openssl rand -hex 32)
export REDIS_URL="redis://localhost:6379/0"
export FROM_EMAIL="admin@company.com"
export COLONEL="admin@company.com"

# Comprobar la sintaxis de la configuración
ruby -ryaml -e "YAML.load_file('etc/config.yaml')"
```

## Problemas comunes

| Problema | Solución |
|---------|----------|
| La aplicación no se inicia Compruebe que `SECRET` está configurado y que Redis se está ejecutando.
| Los correos electrónicos no se envían Compruebe la configuración de `FROM_EMAIL` y SMTP.
| Los límites de velocidad son demasiado estrictos. Ajuste los valores en la configuración del sistema.
| Los cambios en la interfaz de usuario no se aplican Compruebe si la configuración está en system_settings vs config.

## Valores que deben cambiar

```bash
# Antes de producción
SECRET=<generar-64-caracteres-hex>
AUTHENTICITY_SECRET_KEY=<generar-64-caracteres-hex>
FROM_EMAIL=<email válido>
COLONEL=<email-admin>
```

## Restart Required vs Runtime

**Reinicio obligatorio (config.yaml):**
- Conexiones de base de datos
- Host del sitio/SSL
- Configuración del servidor de correo
- Middleware de seguridad

**Runtime Adjustable (system_settings):**
- Banderas de características
- Límites de velocidad
- Personalización de la interfaz de usuario
- Configuración de la API

## Ubicación de los archivos de configuración

```bash
# Core configuration
etc/config.yaml

# Configuración del sistema
etc/system_settings.defaults.yaml

# Environment overrides
.env
```

## Comandos de validación

```bash
# Probar sintaxis YAML
ruby -ryaml -e "YAML.load_file('etc/config.yaml')"

# Comprobar conexión Redis
redis-cli -u $REDIS_URL ping

# Verificar variables de entorno
env | grep -E '^(SECRET|REDIS|FROM_EMAIL|COLONEL)''
```

## Variables de entorno comunes

```bash
# Esencial
HOST=onetimesecret.com
SSL=verdadero
SECRET=<secreto generado>
REDIS_URL=redis://localhost:6379/0
FROM_EMAIL=noreply@company.com
COLONEL=admin@company.com

# Opcional
AUTH_ENABLED=verdadero
API_ENABLED=verdadero
HEADER_ENABLED=true
SENTRY_DSN=https://key@sentry.io/project
```

## Lista de control de la implantación

- [ ] Generar valor `SECRET` fuerte
- [ ] Configurar dirección válida de `FROM_EMAIL
- [ ] Configurar el correo electrónico de administración `COLONEL
- [ ] Probar la conectividad de Redis
- [ ] Comprobar la entrega del correo
- Comprobar el certificado SSL
- [ ] Establecer límites de velocidad adecuados
- [ ] Activar el seguimiento de errores
