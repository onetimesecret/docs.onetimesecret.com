---
title: Descripción general del autoalojamiento
description: Guía completa para ejecutar su propia instancia de Onetime Secret
sidebar:
  order: 1
---

Ejecute su propia instancia privada de Onetime Secret con control total sobre sus datos, seguridad e implementación.

## ¿Por qué autoalojar?

El autoalojamiento de Onetime Secret le ofrece:

- **Control total de los datos** - Todos los secretos permanecen en su infraestructura y red
- **Políticas de seguridad personalizadas** - Configure la autenticación, las opciones de privacidad y los controles de acceso
- **Cumplimiento normativo** - Cumpla con los requisitos regulatorios para el manejo de datos
- **Marca personalizada** - Personalice la interfaz para su organización

## Opciones de inicio rápido

Elija el método de implementación que mejor se adapte a su entorno:

### Docker (Recomendado)
```bash
# Inicie Redis y Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.25.0
```

Acceda en `http://localhost:3000`.

### Instalación manual
Para entornos de producción que requieren configuraciones personalizadas.

Consulte nuestra guía de [Instalación e implementación](./installation) para conocer los pasos detallados.

## Qué incluye

Su instancia autoalojada incluye:

- **Interfaz web** - Interfaz de usuario completa para crear y compartir secretos
- **API REST** - Acceso programático para integraciones
- **Soporte multilingüe** - Disponible en más de 12 idiomas
- **Dominios personalizados** - Utilice su propio dominio y marca

## Requisitos del sistema

**Recomendado:**
- 2+ núcleos de CPU
- 2 GB+ de RAM
- 10 GB+ de espacio en disco
- Redis para almacenamiento de sesiones
- Node.js 22+ (para desarrollo)

## Próximos pasos

1. **[Primeros pasos](./getting-started)** - Guía de configuración paso a paso
2. **[Instalación e implementación](./installation)** - Opciones detalladas de implementación
3. **[Referencia de configuración](./configuration)** - Documentación completa de ajustes

---

_¿Listo para comenzar? Siga nuestra guía de [Primeros pasos](./getting-started)._
