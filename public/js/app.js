// public/js/app.js

// === 1. CONTROL DE SESIÓN Y DATOS ===
document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesión (Protección de ruta)
    if (!localStorage.getItem('usuario_id')) {
        window.location.replace('login.html');
        return;
    }

    // Cargar Badge de Usuario
    const userBadge = document.getElementById('userBadge');
    if (userBadge) {
        userBadge.innerText = `[ ID: ${localStorage.getItem('usuario_id')} ] ${localStorage.getItem('usuario_nombre')}`;
    }

    // Inicializar Ledger
    if (document.getElementById('ledger-list')) {
        cargarDocumentos();
    }
});

// Cerrar Sesión
window.cerrarSesion = function() {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_nombre');
    window.location.replace('login.html');
}

// Cargar Documentos del Ledger
async function cargarDocumentos() {
    // ... [Aquí va todo tu código de cargarDocumentos que ya tenías, manténlo igual]
}

// Subir Documento
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        // ... [Aquí va todo tu código del submit del formulario, manténlo igual]
    });
}

// === 2. MOTOR DE PARTÍCULAS ===
(function() {
    const canvas = document.getElementById('canvasParticulas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function ajustarTamano() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    ajustarTamano();
    window.addEventListener('resize', ajustarTamano);

    const imagenes = [];
    let imagenesCargadas = 0;

    function comprobarCarga() {
        imagenesCargadas++;
        if (imagenesCargadas === 2) iniciarAnimacion();
    }

    // Iconos en Base64
    const imgCasa = new Image();
    imgCasa.onload = comprobarCarga;
    imgCasa.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNmI2ZDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCA5bDktNyA5IDd2MTFhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6Ij48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iOSAyMiA5IDEyIDE1IDEyIDE1IDIyIj48L3BvbHlsaW5lPjwvc3ZnPg==";
    imagenes.push(imgCasa);

    const imgPlano = new Image();
    imgPlano.onload = comprobarCarga;
    imgPlano.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzOGJkZjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIj48L3JlY3Q+PHBhdGggZD0iTTMgOWgxOE05IDIxdjlNMISTUgOXYxMiI+PC9wYXRoPjwvc3ZnPg==";
    imagenes.push(imgPlano);

    class Particula {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 40;
            this.velocidadY = 0.3 + Math.random() * 0.5;
            this.velocidadX = (Math.random() - 0.5) * 0.3;
            this.tamano = 16 + Math.random() * 16;
            this.opacidad = 0.15 + Math.random() * 0.35;
            this.imagen = imagenes[Math.floor(Math.random() * imagenes.length)];
        }
        actualizar() {
            this.y -= this.velocidadY;
            this.x += this.velocidadX;
            if (this.y < -40) this.reset();
        }
        dibujar() {
            ctx.globalAlpha = this.opacidad;
            ctx.drawImage(this.imagen, this.x, this.y, this.tamano, this.tamano);
        }
    }

    function iniciarAnimacion() {
        const particulas = [];
        for (let i = 0; i < 25; i++) particulas.push(new Particula());
        
        function animar() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particulas.forEach(p => { p.actualizar(); p.dibujar(); });
            requestAnimationFrame(animar);
        }
        animar();
    }
})(); 