# Requerimientos Técnicos y Stack Tecnológico de Tagger Pet

Este documento define el stack tecnológico y la arquitectura de infraestructura para el proyecto Tagger Pet, diseñados para ser modernos, escalables, seguros y costo-eficientes.

## 1. Filosofía de Arquitectura

*   **Backend Unificado:** Una única API centralizada (headless) servirá a todos los clientes: la aplicación web de gestión, la futura aplicación móvil y las integraciones de terceros (API Externa).
*   **Modularidad:** Tanto el backend como el frontend se construirán de forma modular para facilitar el mantenimiento, las pruebas y la escalabilidad.
*   **Infraestructura como Código (IaC):** Se priorizará el uso de herramientas que permitan definir la infraestructura en archivos de configuración, facilitando la replicación de entornos y la recuperación ante desastres.
*   **Serverless-First:** Se optará por servicios gestionados y serverless siempre que sea posible para minimizar la carga de gestión de infraestructura, optimizar costos y garantizar la escalabilidad automática.

## 2. Stack de Desarrollo

| Componente | Tecnología | Framework/Librería | Razón de la Elección |
| :--- | :--- | :--- | :--- |
| **Backend** | **Node.js** | **NestJS** | Arquitectura modular y robusta, excelente integración con TypeScript, alto rendimiento para operaciones I/O. Ideal para APIs complejas. |
| **Lenguaje Backend**| **TypeScript** | - | Añade seguridad de tipos a JavaScript, reduce errores en tiempo de ejecución y mejora la mantenibilidad del código a largo plazo. |
| **Base de Datos** | **PostgreSQL** | **Extensión: PostGIS** | Fiabilidad (ACID), potencia y el mejor soporte del mercado para datos geoespaciales (PostGIS), crucial para la arquitectura geográfica jerárquica. |
| **Frontend (Web)**| **-** | **Next.js (React)** | Ya que existe experiencia previa en el equipo, se capitaliza ese conocimiento. Next.js ofrece una estructura sólida, optimización de rendimiento (SSR/SSG) y un excelente ecosistema. |
| **App Móvil (Futuro)**| **-** | **React Native** | Sinergia total con el stack web (React), permitiendo reutilizar lógica, componentes y conocimiento del equipo de desarrollo. |

## 3. Arquitectura de Infraestructura en Producción (Cloud)

Se utilizará **Amazon Web Services (AWS)** como proveedor de nube principal, aprovechando su capa gratuita y sus servicios gestionados para una operación costo-eficiente y escalable.

| Servicio | Producto AWS | Propósito | Ventajas |
| :--- | :--- | :--- | :--- |
| **Despliegue Frontend**| **Vercel** | **Hosting de la aplicación Next.js** | Plataforma optimizada para Next.js, integración perfecta con GitHub para CI/CD (despliegue continuo), CDN global y escalabilidad automática. |
| **Ejecución de API** | **AWS Lambda** | **Ejecución del código de la API (NestJS)** | Serverless. Paga solo por ejecución, escala de cero a miles de peticiones automáticamente. Generosa capa gratuita. |
| **Gateway de API** | **Amazon API Gateway**| **Punto de entrada público para la API** | Provee una URL segura (HTTPS), gestiona la autenticación, seguridad y `rate limiting`. |
| **Base de Datos** | **Amazon RDS for PostgreSQL** | **Base de datos PostgreSQL gestionada** | Elimina la necesidad de gestionar servidores, parches o backups. Iniciaremos con la capa gratuita de 12 meses. |
| **Almacenamiento Archivos**| **Amazon S3** | **"Casillero Digital" (fotos, PDFs, etc.)** | Almacenamiento de objetos duradero, barato e infinitamente escalable. |
| **Notificaciones Email**| **Amazon SES** | **Envío de correos transaccionales** | Servicio de envío de emails escalable y de bajo costo para notificaciones (ej. solicitud de vinculación). |

Este enfoque combinado de Vercel para el frontend y AWS para el backend/datos nos da lo mejor de ambos mundos: la mejor experiencia de desarrollo para Next.js y la potencia y flexibilidad del ecosistema de AWS.

## 4. Estrategia de Autenticación y Autorización

*   **Autenticación:** Se implementará un sistema basado en **JSON Web Tokens (JWT)**. Para acelerar el desarrollo y aumentar la seguridad, se integrará un proveedor de identidad como **Auth0** o **AWS Cognito**. Esto permitirá de base un inicio de sesión seguro con email/contraseña y facilitará la futura adición de proveedores sociales (Google, Facebook).
*   **Autorización:** La API de NestJS gestionará los permisos mediante un sistema de **Guardias (Guards) basados en Roles**. Cada endpoint de la API especificará qué rol (ej. `Dueño`, `Aliado`, `Administrador`) es necesario para consumirlo, garantizando que los usuarios solo puedan acceder a los recursos que les corresponden.

## 5. Entorno de Desarrollo y Flujo de Trabajo

*   **Control de Versiones:** Se utilizará **Git**, y el código fuente se alojará en un repositorio privado en **GitHub**.
*   **Estructura del Repositorio (Monorepo):** Se optará por un **monorepo** gestionado con **Nx** o **Turborepo**. Esta estructura (un único repositorio para frontend y backend) es ideal para compartir código y tipos entre el proyecto de Next.js y la API de NestJS, asegurando la consistencia.
*   **Flujo de Git:** Se seguirá un flujo de trabajo basado en `feature branches`. Las nuevas funcionalidades se desarrollarán en ramas aisladas y se integrarán a la rama `main` a través de **Pull Requests (PRs)**, que requerirán una revisión de código por al menos otro miembro del equipo (Code Review).
*   **Integración y Despliegue Continuo (CI/CD):**
    *   **Frontend:** Se conectará **Vercel** al repositorio de GitHub para el despliegue automático de la aplicación Next.js en cada push a la rama `main`.
    *   **Backend:** Se utilizará **GitHub Actions** para automatizar las pruebas y el despliegue de la API de NestJS a **AWS Lambda** en cada push a la rama `main`.
