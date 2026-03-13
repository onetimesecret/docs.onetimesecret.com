---
title: Descripción general del autoalojamiento
description: Guía completa para ejecutar tu propia instancia de Onetime Secret
sidebar:
  order: 1
---

Ejecuta tu propia instancia privada de Onetime Secret con control total sobre tus datos, seguridad y despliegue.

:::caution[Marzo 2026 — Documentación de autoalojamiento en transición]
Estamos en medio de la transición entre **v0.23** y **v0.24** (la rama `main`). Parte de nuestra documentación de autoalojamiento está desactualizada y estamos [trabajando activamente para mejorarla](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Si solo quieres poner algo en marcha**, te recomendamos la rama `rel/0.23`. Solo necesita un par de variables de entorno y Redis, y seguimos publicando correcciones y pequeñas actualizaciones en ella.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## ¿Por qué autoalojar?

Autoalojar Onetime Secret te ofrece:

- **Control total de los datos** - Todos los secretos permanecen en tu infraestructura y red
- **Políticas de seguridad personalizadas** - Configura la autenticación, opciones de privacidad y controles de acceso
- **Cumplimiento normativo** - Cumple con los requisitos regulatorios para el manejo de datos
- **Marca personalizada** - Personaliza la interfaz para tu organización

## Opciones de inicio rápido

Elige el método de despliegue que mejor se adapte a tu entorno:

### Docker (Recomendado)
```bash
# Iniciar Redis y Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Accede en `http://localhost:3000`.

### Instalación manual
Para entornos de producción que requieren configuraciones personalizadas.

Consulta nuestra guía de [Instalación y despliegue](./installation) para los pasos detallados.

## Qué incluye

Tu instancia autoalojada incluye:

- **Interfaz web** - UI completa para crear y compartir secretos
- **REST API** - Acceso programático para integraciones
- **Soporte multilingüe** - Disponible en más de 12 idiomas
- **Dominios personalizados** - Usa tu propio dominio y marca

## Requisitos del sistema

**Recomendado:**
- 2+ núcleos de CPU
- 2GB+ de RAM
- 10GB+ de espacio en disco
- Redis para almacenamiento de sesiones
- Node.js 22+ (para desarrollo)

## Próximos pasos

1. **[Primeros pasos](./getting-started)** - Guía de configuración paso a paso
2. **[Instalación y despliegue](./installation)** - Opciones detalladas de despliegue
3. **[Referencia de configuración](./configuration)** - Documentación completa de ajustes

---

_¿Listo para empezar? Sigue nuestra guía de [Primeros pasos](./getting-started)._
