# Catastro Ágil ⚖️
**Custodia Digital Inmutable | Bóveda de Resguardo Territorial (ITSU 2026)**[cite: 2, 4]

## 📋 Descripción del Proyecto
**Catastro Ágil** es una solución avanzada de registro inmobiliario, vehicular y de identidad basada en tecnología de libros mayores distribuidos y firmas criptográficas[cite: 2, 4]. Su objetivo principal es garantizar la integridad, seguridad y trazabilidad de los títulos de propiedad y documentos legales mediante un sistema descentralizado y moderno

---

## 🏗️ Arquitectura y Tecnologías
El proyecto está estructurado bajo un diseño modular limpio y profesional:
* **Frontend**: HTML5 semántico, Tailwind CSS y JavaScript vainilla modular (`app.js`, `auth.js`, `particles.js`)
* **Estilos y Temas**: Configuración unificada con variables CSS y soporte dinámico para modo claro y oscuro en toda la plataforma
* **Backend**: Funciones serverless en Python y gestión de base de datos/almacenamiento mediante Supabase
* **Efectos Visuales**: Animaciones de partículas basadas en canvas (`particles.js`)

---

## 📂 Estructura del Repositorio
* `api/`: Lógica del backend en Python (`index.py`) que procesa las peticiones de la API.
* `public/`
  * `css/main.css`: Estilos globales, animaciones de fondo y diseño de paneles de cristal (`glass-panel`)
  * `img/`: Recursos gráficos del sistema (`hero-bg.jpg`, `login-bg.jpg`, `planos-catastro.jpg`).
  * `js/`
    * `app.js`: Lógica de sincronización del Ledger personal y subida de documentos.
    * `auth.js`: Gestión de validación estricta de correos, inicio de sesión y registro de clientes.
    * `particles.js`: Motor visual de partículas en tiempo real.
  * `index.html`: Landing page institucional con tarjetas interactivas de servicios
  * `login.html`: Interfaz de autenticación y registro de nuevos clientes
  * `boveda.html`: Panel de control privado (Ledger) para la gestión y estampado de nuevos bloques

---

## ⚙️ ¿Cómo Funciona el Sistema?

1. **Landing Page (`index.html`)**:
   * Presenta la misión del sistema de resguardo territorial
   * Cuenta con tarjetas interactivas (*Inmuebles*, *Vehículos*, *Identidad*) que despliegan modales explicativos detallados al hacer clic
   * Incluye un botón de alternancia global de **Modo Claro / Oscuro** que adapta dinámicamente toda la interfaz de la página

2. **Módulo de Autenticación (`login.html` y `auth.js`)**:
   * Permite el acceso seguro de los usuarios mediante validación estricta de correo electrónico
   * Ofrece un modal integrado para el registro rápido de nuevos clientes con validación de cédula y datos
   * Contiene un botón de retroceso para volver fácilmente a la página de inicio

3. **Bóveda Criptográfica y Ledger (`boveda.html` y `app.js`)**:
   * Panel exclusivo para usuarios autenticados donde se gestiona el almacenamiento de archivos (PDF o imágenes) clasificados por categorías (*Título de Propiedad Raíz*, *Certificado de Vehículo*, *Documentación Legal*)
   * Genera un comprobante digital y muestra un sistema de notificaciones flotantes modernas (*Toasts*) al estampar con éxito un nuevo bloque en Supabase
   * Permite la visualización en tiempo real del Ledger personal con enlaces directos para abrir los documentos originales
