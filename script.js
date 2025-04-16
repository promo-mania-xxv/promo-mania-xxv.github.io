document.addEventListener('DOMContentLoaded', function() {
    // Referencia al contenedor de ondas para evitar múltiples búsquedas en el DOM
    const waveContainer = document.querySelector('.radio-waves-bg');
    
    // Verificar si el contenedor existe antes de configurar los intervalos
    if (waveContainer) {
        // Efecto de ondas de radio dinámicas con manejo de memoria mejorado
        function createRadioWave() {
            const wave = document.createElement('div');
            wave.className = 'radio-wave';
            waveContainer.appendChild(wave);
            
            // Usar requestAnimationFrame para animaciones más suaves
            setTimeout(() => {
                if (wave.parentNode === waveContainer) {
                    waveContainer.removeChild(wave);
                }
            }, 3000);
        }
        
        // Usar variable para poder limpiar el intervalo si es necesario
        const waveInterval = setInterval(createRadioWave, 600);
        
        // Limpia el intervalo si la página pierde el foco para ahorrar recursos
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(waveInterval);
            } else {
                // Reiniciar el intervalo cuando la página vuelve a estar visible
                clearInterval(waveInterval);
                setInterval(createRadioWave, 600);
            }
        });
    }

    // Indicador EN VIVO si es horario de transmisión (Miércoles 8-9 AM)
    const now = new Date();
    // getDay() devuelve 0 para domingo, 1 para lunes, ... 3 para miércoles
    const isLive = now.getDay() === 3 && now.getHours() >= 8 && now.getHours() < 9;
    
    if (isLive) {
        const equalizerBars = document.querySelectorAll('.equalizer-bars span');
        const liveIndicator = document.querySelector('.live-indicator');
        
        // Usar forEach con comprobación de existencia
        if (equalizerBars.length > 0) {
            equalizerBars.forEach(bar => {
                bar.style.animationDuration = '0.6s';
                bar.style.boxShadow = '0 0 8px var(--signal)';
            });
        }
        
        // Comprobar si el indicador existe antes de aplicar estilos
        if (liveIndicator) {
            liveIndicator.style.textShadow = '0 0 8px var(--signal)';
        }
    }

    // Efecto al hacer clic en los miembros del equipo con transiciones CSS más suaves
    const teamMembers = document.querySelectorAll('.team-member');
    
    if (teamMembers.length > 0) {
        teamMembers.forEach(member => {
            // Usar transiciones CSS para animaciones más suaves
            member.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            member.addEventListener('click', function() {
                // Evitar múltiples manipulaciones de estilo con clases CSS
                this.classList.add('team-member-clicked');
                
                // Eliminar la clase después de que termine la animación
                setTimeout(() => {
                    this.classList.remove('team-member-clicked');
                }, 300);
                
                // Añadir efecto de onda al hacer clic
                const memberPhoto = this.querySelector('.member-photo');
                if (memberPhoto) {
                    const wave = document.createElement('div');
                    wave.className = 'radio-waves-member';
                    memberPhoto.appendChild(wave);
                    
                    // Eliminar la onda después de la animación
                    setTimeout(() => {
                        if (wave.parentNode === memberPhoto) {
                            memberPhoto.removeChild(wave);
                        }
                    }, 3000);
                }
            });
        });
        
        // Agregar estilo para la clase team-member-clicked al documento
        const style = document.createElement('style');
        style.textContent = `
            .team-member-clicked {
                transform: translateY(-8px) scale(1.03) !important;
            }
            .team-member-clicked::after {
                opacity: 0.4;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Comprobar soporte de prefers-reduced-motion y ajustar animaciones
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            // Reducir o desactivar animaciones si el usuario prefiere menos movimiento
            const style = document.createElement('style');
            style.textContent = `
                .radio-wave {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    opacity: 0.1 !important;
                }
                .vinyl-record {
                    animation: none !important;
                }
                .equalizer-bars span {
                    animation-duration: 2s !important;
                }
            `;
            document.head.appendChild(style);
            
            // Limpiar el intervalo de ondas si es necesario
            if (waveInterval) {
                clearInterval(waveInterval);
            }
        }
    }
    
    // Ejecutar inicialmente y configurar listener para cambios
    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
});