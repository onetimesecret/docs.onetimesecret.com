---
title: Reino Unido (UK)
description: La región del centro de datos de Onetime Secret en el Reino Unido, ubicada en Londres.
---

## Infraestructura

- **Ubicación**: Londres, Reino Unido
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Proveedor de hosting**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finlandia)
- **CNAME de dominio personalizado**: `identity.ingress.onetime.co` (anycast)

## DNS del dominio personalizado

Para apuntar un dominio personalizado a esta región, cree un registro CNAME:

| Tipo de registro | Host                  | Valor                         |
| ----------------- | --------------------- | ------------------------------ |
| CNAME              | `secrets.example.com` | `identity.ingress.onetime.co` |

Tenga en cuenta que la región del Reino Unido utiliza un CNAME anycast en lugar de un subdominio específico de la región.

Consulte la [Guía de configuración de dominios personalizados](/es/custom-domains/setup-guide) para obtener instrucciones completas.

## Entorno regulatorio

El marco de protección de datos del Reino Unido se rige por el **Reglamento General de Protección de Datos del Reino Unido (UK GDPR)** y la **Ley de Protección de Datos de 2018 (Data Protection Act 2018)**. Tras el Brexit, el Reino Unido mantiene su propio régimen de protección de datos, estrechamente alineado con el RGPD de la UE.

### Sobre el proveedor de hosting

Esta región está alojada por <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, un proveedor europeo de infraestructura en la nube fundado en 2011 y con sede en Helsinki, Finlandia. Como proveedor europeo soberano, todos los datos relacionados con la cuenta se almacenan exclusivamente en Finlandia, bajo las normativas de protección de datos finlandesas y de la UE. UpCloud opera centros de datos en varias ubicaciones europeas, incluida Londres, que alberga esta región.

### Aspectos regulatorios clave

- La Oficina del Comisionado de Información (ICO) actúa como autoridad de supervisión independiente
- El UK GDPR conserva los principios y derechos fundamentales del RGPD de la UE, incluidos los derechos de los interesados y los requisitos de base legal
- El Reino Unido cuenta con una decisión de adecuación de la Comisión Europea, que permite el libre flujo de datos desde la UE/EEE
- La Ley de Protección de Datos de 2018 complementa al UK GDPR con disposiciones específicas para las fuerzas del orden y los servicios de inteligencia del Reino Unido

## Cuándo considerar esta región

- Su organización o usuarios se encuentran principalmente en el Reino Unido
- Necesita cumplir con el UK GDPR y la Ley de Protección de Datos de 2018
- Desea que la residencia de los datos esté dentro del Reino Unido
- Atiende a clientes que requieren el procesamiento de datos dentro del Reino Unido
