# Historias de Usuario: App para Dueños

*Este documento contiene las historias de usuario para la aplicación móvil y web enfocada en los dueños de mascotas, basadas en las funcionalidades definidas en `../general_context.md`.*

---

## Principios UX: completa pero no abrumadora

- Progresive disclosure: primero lo esencial; opciones avanzadas tras un “Ver más”.
- Un objetivo por pantalla y una llamada primaria (CTA) clara.
- Estados vacíos que enseñan (con atajos para crear la primera entrada).
- Validaciones en línea, mensajes simples y acciones de deshacer (undo) cuando aplique.
- Preferencias predeterminadas inteligentes (notificaciones activas con multicanal configurable).
- Rendimiento: cargas diferidas (lazy) y paginación para listas largas.
- Enfoque **mobile-first**: optimizamos primero para pantallas pequeñas; el escritorio es una mejora progresiva.
- Componentes **reutilizables** pensando en futura app **React Native** (paridad de patrones y tokens).

---

### Módulo 1: Gestión de Perfiles

#### 1.1. Cuentas de Usuario

- [ ] **HU1.1.1:** Como **nuevo usuario**, quiero **registrarme en la aplicación usando mi correo electrónico y una contraseña**, para **crear mi cuenta y empezar a usar Tagger Pet**.
- [ ] **HU1.1.2:** Como **usuario registrado**, quiero **iniciar sesión con mi correo y contraseña**, para **acceder a mi perfil y al de mis mascotas**.
- [ ] **HU1.1.3:** Como **usuario registrado**, quiero **poder cerrar sesión**, para **proteger mi información en dispositivos compartidos**.
- [ ] **HU1.1.4:** Como **usuario registrado**, quiero **editar los datos de mi perfil (nombre, teléfono)**, para **mantener mi información de contacto actualizada**.

#### 1.2. Perfiles de Mascotas

- [ ] **HU1.2.1:** Como **dueño de mascota**, quiero **crear un perfil para cada una de mis mascotas**, para **tener toda su información organizada en un solo lugar**.
- [ ] **HU1.2.2:** Como **dueño de mascota**, quiero **añadir y editar información básica en el perfil de mi mascota (nombre, especie, raza, fecha de nacimiento, foto)**, para **tener un registro completo y reconocible de ella**.
- [ ] **HU1.2.3:** Como **dueño de mascota**, quiero **poder ver una lista de todas mis mascotas registradas**, para **navegar fácilmente entre sus perfiles**.
- [ ] **HU1.2.4 (Nueva):** Como **dueño de mascota**, quiero **buscar una mascota por nombre o alias** en mi listado, para **encontrarla rápidamente sin recorrer toda la lista**.
- [ ] **HU1.2.5 (Nueva):** Como **dueño de mascota**, quiero **filtrar el listado por especie/tipo (perro, gato, etc.)**, para **ver solo las mascotas de un tipo específico**.
- [ ] **HU1.2.6 (Nueva):** Como **dueño de mascota**, quiero **filtrar el listado por sexo (macho/hembra)**, para **acotar la búsqueda según esa característica**.
- [ ] **HU1.2.7 (Nueva):** Como **dueño de mascota**, quiero **ordenar el listado por nombre o por edad**, para **visualizar mis mascotas en el orden que me resulte más útil**.
- [ ] **HU1.2.8 (Nueva):** Como **dueño de mascota**, quiero **filtrar el listado por estado (activa / marcada como “perdida”)**, para **enfocarme en las mascotas que requieren atención inmediata**.

#### 1.3. Casillero Digital

- [ ] **HU1.3.1:** Como **dueño de mascota**, quiero **subir archivos (PDFs, imágenes, videos) al perfil de mi mascota**, para **mantener todos sus documentos importantes (pólizas, certificados, facturas) en un solo lugar seguro**.
- [ ] **HU1.3.2:** Como **dueño de mascota**, quiero **ver una galería con todos los archivos que he subido** para una mascota específica, para **encontrar y consultar documentos fácilmente**.
- [ ] **HU1.3.3:** Como **dueño de mascota**, quiero **poder eliminar un archivo del casillero**, para **deshacerme de documentos obsoletos o incorrectos**.
- [ ] **HU1.3.4:** Como **dueño de mascota**, quiero **poder asignar un nombre o descripción a cada archivo subido**, para **identificar rápidamente el contenido de cada documento**.
- [ ] **HU1.3.5:** Como **dueño de mascota**, quiero **filtrar los archivos de mi casillero por tipo (documento, imagen, video)**, para **encontrar rápidamente la clase de archivo que busco**.
- [ ] **HU1.3.6:** Como **dueño de mascota**, quiero **ordenar los archivos por fecha de subida (más recientes o más antiguos)**, para **ver el historial de documentos de forma cronológica**.
- [ ] **HU1.3.7:** Como **dueño de mascota**, quiero **buscar un archivo por su nombre o descripción**, para **localizar un documento específico sin tener que revisar toda la lista**.

#### 2.1. Historial Clínico Digital

- [ ] **HU2.1.1:** Como **dueño de mascota**, quiero **ver el historial clínico completo de mi mascota en orden cronológico inverso**, para **tener una visión clara y actualizada de su salud**.
- [ ] **HU2.1.2:** Como **dueño de mascota**, quiero **ver quién (qué profesional o negocio) añadió cada entrada al historial clínico**, para **saber el origen y la fiabilidad de la información (atribución)**.
- [ ] **HU2.1.3:** Como **dueño de mascota**, quiero **poder añadir entradas simples al historial clínico (ej. "administré pipeta antipulgas")**, para **llevar un registro de los cuidados que realizo en casa**.
- [ ] **HU2.1.4:** Como **dueño de mascota**, quiero **ver los archivos del Casillero Digital que están asociados a una entrada específica del historial clínico (ej. ver la radiografía de una consulta)**, para **tener todo el contexto en un solo lugar**.

#### Nuevas Historias de Usuario (Historial Clínico)

- [ ] **HU2.1.5 (Nueva):** Como **dueño de mascota**, quiero **filtrar el historial por tipo de entrada (vacuna, desparasitación, consulta, procedimiento, medicamento, alergia, peso/medida, nota)**, para **enfocarme en información específica**.
- [ ] **HU2.1.6 (Nueva):** Como **dueño de mascota**, quiero **filtrar por rango de fechas y buscar por texto** en el historial, para **encontrar eventos rápidamente**.
- [ ] **HU2.1.7 (Nueva):** Como **dueño de mascota**, quiero **abrir una ficha de detalle de la entrada** con **fecha/hora, profesional/negocio (atribución), notas, medicamentos/indicaciones y archivos asociados**, para **entender a fondo el evento**.
- [ ] **HU2.1.8 (Nueva):** Como **dueño de mascota**, quiero **asociar archivos del Casillero o subir uno nuevo** directamente desde la ficha de detalle, para **completar la evidencia del evento**.
- [ ] **HU2.1.9 (Nueva):** Como **dueño de mascota**, quiero **crear un recordatorio directamente desde una entrada** (por ejemplo, próxima dosis de vacuna), para **no olvidar el seguimiento**.
- [ ] **HU2.1.10 (Nueva):** Como **dueño de mascota**, quiero **añadir entradas rápidas** (nota, medicamento administrado, **peso con unidad** y foto opcional), para **registrar cuidados cotidianos sin fricción**.
- [ ] **HU2.1.11 (Nueva):** Como **dueño de mascota**, quiero **editar o eliminar únicamente las entradas creadas por mí**, mientras que **las entradas creadas por negocios/profesionales son de solo lectura**, para **proteger la integridad del historial**.
- [ ] **HU2.1.12 (Nueva):** Como **dueño de mascota**, quiero **exportar o compartir el historial clínico en PDF** filtrando por rango de fechas y/o tipo, para **entregarlo a un veterinario o guardarlo**.
- [ ] **HU2.1.13 (Nueva):** Como **dueño de mascota**, quiero **ver gráficos básicos** (evolución de peso, vacunas al día vs. pendientes), para **tener una visión rápida del estado de salud**.

#### 2.2. Sistema de Recordatorios

- [ ] **HU2.2.1:** Como **dueño de mascota**, quiero **crear recordatorios personalizados para eventos futuros (próxima vacuna, cita, toma de medicamento)**, para **no olvidar las fechas importantes del cuidado de mi mascota**.
- [ ] **HU2.2.2 (Modificada):** Como **dueño de mascota**, quiero **recibir notificaciones multicanal (notificación push, email y/o WhatsApp) cuando se acerque la fecha de un recordatorio**, para **ser alertado a tiempo por mi medio preferido**.
- [ ] **HU2.2.3:** Como **dueño de mascota**, quiero **marcar un recordatorio como completado**, para **mantener mi lista de pendientes organizada**.
- [ ] **HU2.2.4:** Como **dueño de mascota**, quiero **ver una lista consolidada de todos mis recordatorios (pendientes y completados) para todas mis mascotas**, para **tener una visión general de las tareas de cuidado**.
- [ ] **HU2.2.5 (Nueva):** Como **dueño de mascota**, quiero **filtrar la lista de recordatorios por mascota específica**, para **enfocarme en las tareas de un solo animal**.
- [ ] **HU2.2.6 (Nueva):** Como **dueño de mascota**, quiero **filtrar la lista de recordatorios por tipo (vacuna, desparasitación, cita, otro)**, para **organizar mis tareas por categoría**.
- [ ] **HU2.2.7 (Nueva):** Como **dueño de mascota**, quiero **ordenar la lista de recordatorios por "próximo a vencer"**, para **priorizar las tareas más urgentes**.
- [ ] **HU2.2.8 (Nueva):** Como **dueño de mascota**, quiero **poder configurar mis canales de notificación preferidos (push, email, WhatsApp)**, para **decidir cómo quiero recibir las alertas**.

#### 3.1. Registro y gestión de dispositivos

- [ ] **HU3.1.1 (Modificada):** Como **dueño**, quiero **registrar una o varias placas QR** y **asignarles un alias**, para **identificar cada dispositivo físico fácilmente**.
- [ ] **HU3.1.2 (Aclaración):** Como **dueño**, quiero **registrar el microchip** (único) de mi mascota, para **asociar su identificador permanente**.
- [ ] **HU3.1.3 (Nueva):** Como **dueño**, quiero **ver el listado de dispositivos** asociados a mi mascota con su **tipo, alias, estado, última lectura**, para **gestionarlos rápidamente**.
- [ ] **HU3.1.4 (Nueva):** Como **dueño**, quiero **establecer un dispositivo como “principal”** y **cambiarlo cuando lo necesite**, para **definir qué dispositivo usa el perfil/QR por defecto**.
- [ ] **HU3.1.5 (Nueva):** Como **dueño**, quiero **activar/desactivar** un dispositivo y **marcarlo como perdido**, para **controlar su uso y seguridad**.
- [ ] **HU3.1.6 (Nueva):** Como **dueño**, quiero **reemplazar** un dispositivo (ej. placa dañada) manteniendo el **histórico de lecturas** del anterior, para **no perder trazabilidad**.
- [ ] **HU3.1.7 (Nueva):** Como **dueño**, quiero **transferir** una placa QR a **otra mascota de mi cuenta** con confirmación, para **reutilizar un dispositivo** cuando corresponda.

#### 3.2. Alerta por escaneo y Modo “Mascota Perdida”

- [ ] **HU3.2.1 (Modificada):** Como **dueño**, quiero **recibir notificación multicanal** (push, email, WhatsApp) al **escaneo de cualquier dispositivo** de mi mascota, con **geolocalización aproximada**, para **actuar de inmediato**.
- [ ] **HU3.2.2 (Nueva):** Como **dueño**, quiero **ver el historial de lecturas por mascota y por dispositivo**, con **mapa** y **filtros por fecha/origen**, para **entender patrones**.
- [ ] **HU3.2.3:** Como **dueño**, quiero **activar/desactivar el Modo “Mascota Perdida”**, para **mostrar información pública de contacto**.
- [ ] **HU3.2.4:** Como **dueño**, quiero **generar y compartir un perfil público** con **caducidad opcional** y posibilidad de **revocar** en cualquier momento, para **proteger mi privacidad**.
- [ ] **HU3.2.5:** Como **dueño**, quiero **cerrar una alerta** y registrar el **motivo** (recuperada, falso positivo), para **mantener el historial ordenado**.
- [ ] **HU3.2.6 (Nueva):** Como **dueño**, quiero **configurar privacidad por dispositivo** (mostrar teléfono/WhatsApp/email o solo botón “Contactar”), para **controlar qué se expone**.

##### Criterios de aceptación (múltiples dispositivos)
- Se puede registrar **>1 placa QR** por mascota; cada una mantiene su **propio historial de lecturas**.
- Microchip por mascota: **máximo 1**. Intentar registrar otro exige **reemplazar** el anterior (con histórico intacto).
- Cambiar el **dispositivo principal** no pierde datos ni rompe enlaces públicos; el anterior queda **activo** salvo que se desactive explícitamente.
- El estado `perdido` de un **dispositivo** es independiente del **modo perdido de la mascota**.

---

### Módulo 4: Interacción y Social
- [ ] **HU4.1.1:** **Compartir perfil público** de una mascota con **acceso de solo lectura**.
- [ ] **HU4.1.2:** Definir **alcance** del perfil compartido (datos visibles: salud básica, alergias, contacto de emergencia, etc.).

---

### Módulo 5: Mi Red de Aliados
- [ ] **HU5.1.1:** Ver el **listado de Aliados** vinculados a cualquiera de mis mascotas.
- [ ] **HU5.1.2:** Ver y gestionar **solicitudes de vinculación** pendientes (aprobar/rechazar) por mascota.
- [ ] **HU5.1.3:** **Revocar** el vínculo con un Aliado por mascota.

---

### Módulo 6: Configuración y Preferencias
- [ ] **HU6.1.1 (Nueva):** Como **usuario**, quiero **elegir el tema de la app: Claro, Oscuro o Automático (según el sistema)**, para **adaptar la experiencia a mis preferencias o condiciones de luz**.
- [ ] **HU6.1.2:** Ajustar **idioma** y **zona horaria**.
- [ ] **HU6.1.3 (Nueva):** Como **usuario**, quiero **definir si el tema sigue la preferencia del sistema** y que **mi elección persista** al volver a abrir la app, para **no reconfigurar cada vez**.
- [ ] **HU6.1.4:** Ver y cerrar **sesiones activas** de la cuenta (seguridad).
- [ ] **HU6.1.5:** **Descargar mis datos** (exportar) y **eliminar mi cuenta** conforme a políticas.
- [ ] **HU6.1.6 (Nueva):** Configurar **resúmenes (digest)** de recordatorios por **frecuencia** (diario/semanal) y **canal** (email/WhatsApp).

---

### Módulo 7: Accesibilidad e Internacionalización
- [ ] **HU7.1.1:** Soportar **lectores de pantalla** y **navegación por teclado**.
- [ ] **HU7.1.2:** Respetar **tamaños de fuente del sistema** y ofrecer **modo alto contraste**.
- [ ] **HU7.1.3:** Localización **ES/EN** (fechas, números, formatos) y soporte RTL a futuro.
- [ ] **HU7.1.4 (Nueva):** Como **usuario**, quiero que la app **detecte automáticamente el idioma del sistema** al primer uso y me **permita cambiarlo**, **persistiendo** mi elección en mi cuenta y dispositivos.

---

### Módulo 8: Seguridad y Privacidad
- [ ] **HU8.1.1:** **Restablecer contraseña** vía email.

---

### Módulo 9: Ayuda y Feedback
- [ ] **HU9.1.1:** Enviar **feedback** o **reporte de problema** desde la app con adjuntos opcionales.
- [ ] **HU9.1.2:** Acceder a **FAQ** y **contacto de soporte**.
