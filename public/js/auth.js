// public/js/auth.js

function validarCorreoEstricto(correo) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/.test(correo);
}

function toggleModal(show) {
    document.getElementById('registerModal').classList.toggle('hidden', !show);
}

// Lógica de Login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
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
            window.location.href = 'index.html';
        } else {
            alert("❌ ERROR: " + data.message);
        }
    } catch (err) { alert("Error de conexión."); }
});

// Lógica de Registro
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const payload = {
        cedula: document.getElementById('regCedula').value.trim(),
        nombre: document.getElementById('regNombre').value.trim(),
        email: document.getElementById('regEmail').value.trim()
    };
    
    if (!validarCorreoEstricto(payload.email)) return alert("❌ El correo debe terminar en .com");
    
    const res = await fetch('/api/registrar-cliente', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    data.status === 'success' ? (alert("✅ ¡Registrado!"), toggleModal(false)) : alert("❌ " + data.message);
}); 