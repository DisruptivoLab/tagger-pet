# Tagger Pet: Visión y Arquitectura del Proyecto

> Misión: Centralizar y simplificar el cuidado de las mascotas, conectando a dueños, negocios y entidades a través de un ecosistema digital único.

## 1. Arquitectura General: Dos Productos, Un Ecosistema

El proyecto se divide en dos componentes de cara al usuario, cada uno con un enfoque y diseño específico, pero ambos consumen una única plataforma centralizada en el backend.

*   Dos Aplicaciones (Front-end):
	1.  App para Dueños de Mascotas: Enfocada en la experiencia de usuario (UX) para el cuidado diario.
	2.  Plataforma de Gestión (CRM): Enfocada en la productividad y gestión de datos para negocios y entidades.

*   Una Plataforma Unificada (Back-end):
	*   API Central: Un único punto de acceso para que ambas aplicaciones interactúen con los datos de forma segura y consistente.
	*   Base de Datos Global: Toda la información reside en una única base de datos, garantizando la integridad y la visión 360°.
	*   Sistema de Permisos por Roles: La API gestiona el acceso a los datos, asegurando que cada tipo de usuario (dueño, veterinario, administrador) solo pueda ver y modificar lo que le corresponde.

## 2. Segmentos de Usuarios y Plataforma Correspondiente

| Segmento de Usuario | Plataforma Utilizada | Propuesta de Valor Clave |
| :--- | :--- | :--- |
| Dueños de Mascotas | App para Dueños (B2C) | Herramientas para simplificar el cuidado, la salud y el bienestar de sus mascotas. |
| Negocios y Servicios | Plataforma CRM (B2B) | Optimización de operaciones, gestión de clientes, citas y servicios. |
| Entidades Públicas | Plataforma CRM (B2G) | Administración de censos, campañas de esterilización y seguimiento de adopciones. |
| Administradores | Plataforma CRM (Admin) | Control total sobre la plataforma, gestión de datos y garantía de funcionamiento. |

## 3. Resumen Estratégico

Tagger Pet se posiciona como una solución de Software como Servicio (SaaS) que ofrece dos experiencias de usuario distintas sobre una plataforma de datos unificada, creando un mercado conectado y eficiente en torno al bienestar animal.

## 4. Estrategia de Interoperabilidad (API Externa)

Para garantizar la integración futura con otros sistemas (CRMs de terceros, sistemas de facturación, software veterinario), la plataforma se diseñará con una API Externa (Pública).

*   Acceso Controlado: Las integraciones de terceros requerirán una API Key para autenticarse, asegurando que solo sistemas autorizados puedan interactuar con la plataforma.
*   Permisos Granulares: La API definirá permisos específicos para cada socio, limitando las acciones que pueden realizar (p. ej., un sistema de facturación puede consultar servicios, pero no modificar historiales clínicos).
*   Documentación Clara: Se proveerá documentación detallada para que los desarrolladores de terceros puedan integrar sus sistemas de manera eficiente.

## 5. Desglose de Funcionalidades por Producto

### 5.1. App para Dueños de Mascotas (B2C)

#### Módulo 1: Gestión de Perfiles
*   Perfil del Dueño: Registro, inicio de sesión y gestión de datos personales.
*   Perfil de la Mascota: Creación y edición de perfiles para múltiples mascotas (fotos, datos básicos, etc.).
*   Casillero Digital: Repositorio central para todo tipo de archivos de la mascota (pólizas, facturas, certificados, pedigrí, fotos y videos).

#### Módulo 2: Salud y Bienestar
*   Historial Clínico Digital: Registro de vacunas, desparasitaciones, consultas y tratamientos, con la capacidad de asociar archivos del Casillero Digital y mostrando una atribución clara (firma) de qué profesional o entidad añadió cada entrada.
*   Sistema de Recordatorios: Notificaciones configurables (push, email) para citas, medicamentos, etc.

#### Módulo 3: Identificación y Seguridad (Tagger Alert)
*   Registro de Dispositivos: Asociación de identificadores al perfil de la mascota (Placa QR, Microchip).
*   Sistema de Alerta por Escaneo:
	*   Notificación instantánea (App, WhatsApp, Email) al dueño cuando el identificador es escaneado.
	*   La notificación incluye la geolocalización aproximada desde donde se realizó el escaneo.
*   Historial de Lecturas: Registro de todos los escaneos con fecha, hora y ubicación en un mapa.
*   Modo "Mascota Perdida": Función para marcar a la mascota como perdida y mostrar información de contacto relevante en un perfil público.

#### Módulo 4: Interacción y Social
*   Compartir Perfil Público: Generación de un enlace de solo lectura para compartir con cuidadores, familiares o veterinarios, dando acceso temporal a la información esencial de la mascota.

#### Módulo 5: Mi Red de Aliados
*   Listado de Aliados: Ver una lista de todas las entidades (veterinarias, pet shops, etc.) que están vinculadas a alguna de las mascotas del dueño.
*   Perfil del Aliado: Acceder al perfil público de cada aliado para ver su información de contacto, horarios y servicios.
*   Gestión de Permisos (A Futuro): Permitirá al dueño revocar el acceso de un aliado a los datos de su mascota.

### 5.2. Plataforma de Gestión: El Modelo de Registro Único (B2B/B2G)

Esta plataforma abandona el concepto de CRM tradicional y se establece como una herramienta de colaboración sobre una base de datos global y unificada de dueños y mascotas. El objetivo es eliminar el doble registro y crear un historial clínico colaborativo. Para acceder, los negocios deben pasar por un proceso de registro y verificación, convirtiéndose en Aliados de la red Tagger Pet.

#### Principio Fundamental: Registro Único y Vinculación por Consentimiento

*   Fuente de Verdad Única: Existe un único perfil maestro para cada dueño y cada mascota en todo el ecosistema Tagger Pet.
*   Proceso de Vinculación por Consentimiento Explícito: Un Aliado no puede vincular un perfil directamente. Debe enviar una "Solicitud de Vinculación" que el dueño de la mascota debe aprobar.
	1.  Solicitud del Aliado: El Aliado encuentra un perfil y solicita la vinculación.
	2.  Notificación Multicanal al Dueño: El dueño recibe una notificación para aprobar o rechazar la solicitud (vía Notificación Push en la app, Email y futuramente WhatsApp).
	3.  Acceso Temporal de Lectura: Al momento de la solicitud, el Aliado obtiene un acceso de solo lectura al historial de la mascota por un tiempo limitado de 120 horas para atender casos urgentes.
	4.  Confirmación o Expiración: El vínculo se hace permanente solo si el dueño acepta. Si el dueño rechaza o el tiempo expira, el acceso se revoca.

#### Funcionalidades Clave de la Plataforma de Gestión
1.  Búsqueda y Vinculación de Perfiles:
	*   Flujo de Búsqueda Dual: El sistema permite dos puntos de entrada para la búsqueda en la base de datos global, asegurando que no se creen duplicados:
		1.  Por Mascota: Si la mascota tiene un identificador único (Microchip, Placa QR), la búsqueda se inicia con este dato.
		2.  Por Dueño: Si la mascota no tiene identificador, la búsqueda se inicia con el identificador del dueño (ID, teléfono, email).
	*   Motor de Búsqueda Preciso: La búsqueda está diseñada para encontrar perfiles específicos, no para explorar la base de datos.
	*   Función de Vinculación a Nivel de Mascota: La acción principal es "Vincular Mascota". Al vincular un paciente, su dueño se asocia automáticamente como cliente del negocio.
	*   Creación de Perfiles Globales: Si la búsqueda no arroja resultados, la plataforma permite crear el perfil del dueño y/o la mascota en la base de datos global, vinculándolos inmediatamente al negocio.
2.  Colaboración en el Historial Clínico:
	*   Añadir Entradas Clínicas: Registrar diagnósticos, tratamientos y observaciones en el historial de una mascota vinculada. Cada entrada lleva la firma del profesional y el negocio.
	*   Añadir Archivos al Casillero: Subir y asociar documentos (resultados de laboratorio, radiografías) a las entradas clínicas.
	*   Crear Recordatorios para el Dueño: Programar alertas (vacunas, seguimientos) que se reflejarán en la app del dueño.
3.  Gestión de Identificadores:
	*   Asignar Nuevos Identificadores: Permitir a los negocios y entidades verificadas (veterinarias, alcaldías) registrar y asociar nuevos dispositivos de identificación (Microchips, Placas QR) al perfil de una mascota.

#### Modelo de Permisos sobre Datos
*   Datos del Dueño: Un negocio no puede editar los datos personales de un dueño (nombre, ID), a menos que haya sido el creador original de ese perfil y el dueño aún no lo haya reclamado con su app.
*   Datos de la Mascota: El negocio puede añadir información al historial, pero no puede editar ni eliminar las entradas creadas por el dueño o por otros negocios.

## 6. Seguridad y Mitigación de Abuso de la Plataforma

Para que el modelo de "Registro único" sea viable y genere confianza, es fundamental implementar una estrategia de seguridad robusta que proteja los datos y prevenga el abuso. Las siguientes medidas son pilares en el diseño de la arquitectura:

*   Verificación de Negocios (Onboarding): Existirá un proceso de alta y verificación para asegurar que solo negocios y entidades legítimas puedan acceder a la plataforma de gestión.
*   Limitación de Tasa (Rate Limiting): La API implementará límites estrictos en la cantidad de operaciones (búsquedas, vinculaciones) que una cuenta puede realizar en un periodo de tiempo para prevenir la extracción masiva de datos (scraping).
*   Monitoreo y Alertas de Comportamiento Anómalo: Se desarrollará un sistema para detectar patrones de uso sospechosos (ej. un número inusualmente alto de búsquedas en poco tiempo), generando alertas para los administradores y potenciales bloqueos preventivos.
*   Acceso Progresivo a la Información: La información sensible o completa de un perfil solo será accesible después de que un negocio haya vinculado legítimamente a ese cliente, no durante la búsqueda inicial.
*   Términos de Servicio Claros: El contrato legal con los negocios prohibirá explícitamente el uso de la plataforma para la creación de bases de datos externas, estableciendo consecuencias claras en caso de incumplimiento.

## 7. Arquitectura Geográfica y Permisos Jerárquicos

Para soportar la visión global del proyecto y permitir la colaboración con entidades gubernamentales a diferentes niveles (municipal, departamental, nacional), la plataforma se construirá sobre una arquitectura de datos geográficos jerárquicos.

#### Principios de Diseño
1.  Base de Datos Geográfica Jerárquica:
	*   Las divisiones administrativas (países, estados/departamentos, ciudades/municipios, etc.) se almacenarán en una tabla dedicada con una estructura de padre-hijo.
	*   Se utilizarán fuentes de datos estandarizadas (ej. GeoNames) para poblar esta base de datos, asegurando una cobertura global y consistencia.
2.  Vinculación a la Jerarquía:
	*   Cada entidad en la plataforma (dueños, mascotas, negocios) estará vinculada a un ID de ubicación específico y de bajo nivel (ej. el municipio de residencia).
3.  Acceso a Datos Agregados por Jerarquía (Funcionalidad Futura):
	*   Se podrán crear roles de usuario (ej. "Administrador Municipal", "Gobernación") vinculados a un ID de ubicación de alto nivel (ej. el departamento de Antioquia).
	*   El sistema permitirá a estos roles ver datos estadísticos y agregados de todas las ubicaciones descendientes. Por ejemplo, un usuario de "Antioquia" podrá ver el total de mascotas en cada uno de sus 125 municipios.
	*   Importante: Este acceso será siempre a datos anónimos y agregados para proteger la privacidad de los usuarios individuales.

#### Decisión Estratégica
Aunque los dashboards para entidades gubernamentales son una funcionalidad post-MVP, la implementación de la base de datos geográfica jerárquica es un requisito fundamental desde la fase inicial del proyecto. Esta decisión asegura la escalabilidad futura y el potencial de Tagger Pet como una herramienta de política pública.
