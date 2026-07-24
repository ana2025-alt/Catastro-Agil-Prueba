// public/js/particles.js
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

    // Creamos formas geométricas simples (círculos tech)
    function dibujarParticula(x, y, opacidad) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${opacidad})`;
        ctx.fill();
    }

    let particulas = Array.from({ length: 40 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacidad: Math.random()
    }));

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particulas.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            dibujarParticula(p.x, p.y, p.opacidad);
        });
        requestAnimationFrame(animar);
    }
    animar();
})(); 