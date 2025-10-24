/**
 * Fond animé style KOF Ultimate Online
 * Particules flottantes et interactions
 */

(function() {
    'use strict';

    // Créer le canvas de fond
    function initAnimatedBackground() {
        // Div de fond avec gradient animé
        const bgDiv = document.createElement('div');
        bgDiv.id = 'animated-bg';
        document.body.insertBefore(bgDiv, document.body.firstChild);

        // Vague lumineuse
        const wave = document.createElement('div');
        wave.className = 'light-wave';
        document.body.appendChild(wave);

        // Canvas pour particules
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particules
        const particles = [];
        const particleCount = 80;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.randomColor();
            }

            randomColor() {
                const colors = [
                    'rgba(138, 43, 226, ',   // violet
                    'rgba(76, 175, 80, ',    // vert
                    'rgba(33, 150, 243, ',   // bleu
                    'rgba(255, 193, 7, ',    // jaune/or
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Rebond sur les bords
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Pulsation d'opacité
                this.opacity += (Math.random() - 0.5) * 0.02;
                this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ')';
                ctx.fill();

                // Lueur
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color + '0.4)';
            }
        }

        // Créer particules
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Connexions entre particules proches
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(138, 43, 226, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            connectParticles();

            requestAnimationFrame(animate);
        }

        animate();

        // Redimensionnement
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Interaction souris
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Attirer particules proches de la souris
            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    particle.speedX += dx * 0.0001;
                    particle.speedY += dy * 0.0001;
                }
            });
        });
    }

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimatedBackground);
    } else {
        initAnimatedBackground();
    }
})();
