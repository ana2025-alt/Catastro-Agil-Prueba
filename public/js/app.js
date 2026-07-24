// public/js/app.js

// === 1. CONTROL DE SESIÓN Y LEDGER ===
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ledger-list')) {
        if (!localStorage.getItem('usuario_id')) {
            window.location.replace('login.html');
            return;
        }

        const userBadge = document.getElementById('userBadge');
        if (userBadge) {
            userBadge.innerText = `[ ID: ${localStorage.getItem('usuario_id')} ] ${localStorage.getItem('usuario_nombre')}`;
        }

        cargarDocumentos();
    }
});

window.cerrarSesion = function() {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_nombre');
    window.location.replace('login.html');
}

async function cargarDocumentos() {
    const usuario_id = localStorage.getItem('usuario_id');
    const container = document.getElementById('ledger-list');
    
    if (!container) return;
    container.innerHTML = `<div class="text-center py-10 text-cyan-400 text-sm"><i class="fa-solid fa-circle-notch animate-spin mr-2 text-2xl"></i><br><br>Sincronizando con Supabase...</div>`;

    try {
        const res = await fetch(`/api/documentos/${usuario_id}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = `<div class="text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-slate-600"><p class="text-sm font-bold text-slate-400">Bóveda vacía.</p></div>`;
            return;
        }

        container.innerHTML = data.map(doc => `
            <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-cyan-500/50 transition">
                <div>
                    <h4 class="font-bold text-slate-200 text-sm"><i class="fa-solid fa-file-pdf text-rose-400 mr-2"></i> ${doc.nombre_archivo}</h4>
                    <p class="text-xs font-mono text-cyan-400 mt-1">${doc.categoria}</p>
                </div>
                <a href="${doc.url_storage}" target="_blank" class="text-xs font-bold text-slate-400 hover:text-cyan-400 transition bg-slate-900 px-3 py-1.5 rounded border border-slate-700">
                    <i class="fa-solid fa-eye mr-1"></i> Abrir Original
                </a>
            </div>`).join('');
    } catch (error) {
        container.innerHTML = `<p class="text-sm text-red-400 text-center">Error crítico al conectar.</p>`;
    }
}

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnSubmit = uploadForm.querySelector('button[type="submit"]');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Procesando...';

        const formData = new FormData();
        formData.append('file', document.getElementById('archivo').files[0]);
        formData.append('categoria', document.getElementById('categoria').value);
        formData.append('usuario_id', localStorage.getItem('usuario_id'));

        try {
            const res = await fetch('/api/subir', { method: 'POST', body: formData });
            const resultado = await res.json();
            if (resultado.status === 'success') {
                alert(`✅ ¡Bloque estampado con éxito!`);
                uploadForm.reset();
                cargarDocumentos();
            } else {
                alert(`❌ Error: ${resultado.message}`);
            }
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fa-solid fa-link"></i> Estampar Sello';
        }
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
    let cargadas = 0;
    function check() { if (++cargadas === 2) loop(); }

    const img1 = new Image(); img1.onload = check; img1.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNmI2ZDQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTBBM2w5LTcgOSA3djExYTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg==";
    const img2 = new Image(); img2.onload = check; img2.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzOGJkZjgiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiI+PC9yZWN0Pjwvc3ZnPg==";
    
    imagenes.push(img1, img2);

    class Particula {
        constructor() { this.reset(); this.y = Math.random() * canvas.height; }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 40;
            this.vy = 0.3 + Math.random() * 0.5;
            this.img = imagenes[Math.floor(Math.random() * imagenes.length)];
        }
        update() { this.y -= this.vy; if (this.y < -40) this.reset(); }
        draw() { ctx.globalAlpha = 0.3; ctx.drawImage(this.img, this.x, this.y, 20, 20); }
    }

    function loop() {
        const particles = Array.from({length: 20}, () => new Particula());
        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(render);
        }
        render();
    }
})(); 