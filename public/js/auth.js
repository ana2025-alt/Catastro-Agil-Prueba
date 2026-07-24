// public/js/auth.js

function validarCorreoEstricto(correo) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/.test(correo);
}

function toggleModal(show) {
    document.getElementById('registerModal').classList.toggle('hidden', !show);
}

// Lógica de Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        if (!validarCorreoEstricto(email)) return alert("❌ Formato de correo inválido.");
        
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.status === 'success') {
                localStorage.setItem('usuario_id', data.usuario_id);
                localStorage.setItem('usuario_nombre', data.nombre);
                window.location.href = 'boveda.html'; // <--- Redirige correctamente a la bóveda
            } else {
                alert("❌ ERROR: " + data.message);
            }
        } catch (err) { alert("Error de conexión con el servidor."); }
    });
}

// Lógica de Registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const payload = {
            cedula: document.getElementById('regCedula').value.trim(),
            nombre: document.getElementById('regNombre').value.trim(),
            email: document.getElementById('regEmail').value.trim()
        };
        
        if (!validarCorreoEstricto(payload.email)) return alert("❌ El correo debe terminar en .com");
        
        try {
            const res = await fetch('/api/registrar-cliente', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.status === 'success') {
                alert("✅ ¡Cliente registrado con éxito!");
                toggleModal(false);
            } else {
                alert("❌ " + data.message);
            }
        } catch (err) { alert("Error de red."); }
    });
} 