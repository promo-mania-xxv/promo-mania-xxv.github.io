document.addEventListener('DOMContentLoaded', function() {
    // Efecto de ondas de radio dinámicas
    const antennaSphere = document.querySelector('.antenna-sphere');
    
    function createRadioWave() {
        const wave = document.createElement('div');
        wave.className = 'radio-wave';
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border: 2px solid var(--accent);
            border-radius: 50%;
            animation: radioWave 3s linear forwards;
            pointer-events: none;
            z-index: -1;
        `;
        antennaSphere.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 3000);
    }
    
    // Crear ondas cada 800ms
    setInterval(createRadioWave, 800);
    
    // Indicador EN VIVO si es horario de transmisión
    const now = new Date();
    const isLive = now.getDay() === 5 && now.getHours() >= 10 && now.getHours() < 11;
    
    if (isLive) {
        document.querySelector('.live-indicator').classList.add('pulse');
        
        // Animación más intensa del ecualizador cuando está en vivo
        const equalizerBars = document.querySelectorAll('.equalizer-bars span');
        equalizerBars.forEach(bar => {
            bar.style.animationDuration = '0.8s';
        });
    }
});