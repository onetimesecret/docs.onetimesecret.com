---
title: Estados Unidos (US)
description: La región del centro de datos de Onetime Secret en Estados Unidos, ubicada en Hillsboro, Oregón.
---

## Infraestructura

- **Ubicación**: Hillsboro, Oregón, Estados Unidos
- **URL**: [us.onetimesecret.com](https://us.onetimesecret.com)
- **Proveedor de hosting**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **CNAME de dominio personalizado**: `identity.us.onetime.co`

## DNS del dominio personalizado

Para apuntar un dominio personalizado a esta región, cree un registro CNAME:

| Tipo de registro | Host                  | Valor                    |
| ----------------- | --------------------- | ------------------------ |
| CNAME              | `secrets.example.com` | `identity.us.onetime.co` |

Consulte la [Guía de configuración de dominios personalizados](/es/custom-domains/setup-guide) para obtener instrucciones completas.

## Entorno regulatorio

Estados Unidos no cuenta con una única ley federal integral de protección de datos. En su lugar, la protección de datos se aborda mediante una combinación de leyes federales y estatales que se aplican a sectores o tipos de datos específicos.

### Sobre el proveedor de hosting

Esta región está alojada por <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>, un proveedor de hosting alemán con sede en Gunzenhausen, que opera bajo la jurisdicción de la UE. Incluso en sus ubicaciones de centros de datos en Estados Unidos, Hetzner mantiene su enfoque orientado a la privacidad, arraigado en los estándares alemanes y de la UE de protección de datos. Los datos personales de los clientes no se exponen en los registros WHOIS públicos para clientes privados.

### Aspectos regulatorios clave

- Leyes federales como la HIPAA (datos de salud), la GLBA (datos financieros) y la COPPA (datos de menores) se aplican a sectores específicos
- Las leyes de privacidad a nivel estatal son cada vez más relevantes, en particular la **Ley de Privacidad del Consumidor de California (CCPA)** y su enmienda, la **Ley de Derechos de Privacidad de California (CPRA)**
- Otros estados, entre ellos Virginia, Colorado, Connecticut y Utah, han promulgado legislación integral de privacidad
- Oregón, donde se ubica este centro de datos, promulgó la **Ley de Privacidad del Consumidor de Oregón**, vigente desde julio de 2024

## Cuándo considerar esta región

- Su organización o usuarios se encuentran principalmente en Estados Unidos
- Necesita cumplir con las leyes federales o estatales de protección de datos de Estados Unidos
- Desea que la residencia de los datos esté dentro de Estados Unidos
- Atiende a clientes en Norteamérica y desea un acceso de baja latencia desde el oeste de Estados Unidos
