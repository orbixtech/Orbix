// Inicialização do AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// Efeito de partículas de fundo
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}


// Efeito hover nos links e botões
const hoverElements = document.querySelectorAll('a, button, .service-card, .tech-item, .founder-card, .produto-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'scale(1.5)';
        if (cursorFollower) cursorFollower.style.transform = 'scale(1.5)';
        element.style.cursor = 'none';
    });

    element.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'scale(1)';
        if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
    });
});

// Navegação suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header com efeito de transparência no scroll
const header = document.querySelector('.header');
if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(11, 25, 48, 0.8)';
        } else if (currentScroll > lastScroll) {
            header.style.background = 'rgba(11, 25, 48, 0.95)';
        } else {
            header.style.background = 'rgba(11, 25, 48, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
}

// Botões com efeito de ripple
const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .contact-btn, .submit-btn, .cta-button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Formulário de contato com validação e animação
const form = document.querySelector('.contact-form');
if (form) {
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                }, 2000);
            }, 1500);
        }
    });
}

// Efeito parallax nas imagens dos fundadores
const founderImages = document.querySelectorAll('.founder-image');

founderImages.forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = (e.clientX - rect.left) / 30;
        const y = (e.clientY - rect.top) / 30;

        image.style.transform = `translate(${x}px, ${y}px)`;
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'translate(0, 0)';
    });
});

// Função para criar partículas de transição
function createTransitionParticles() {
    const transitionParticles = document.getElementById('transitionParticles');
    if (!transitionParticles) return;
    
    transitionParticles.innerHTML = '';
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('transition-particle');
        
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
        
        transitionParticles.appendChild(particle);
    }
}

// Função para iniciar a transição de página
function startPageTransition(e, targetUrl) {
    if (e) e.preventDefault();
    
    const pageTransition = document.getElementById('pageTransition');
    const transitionProgress = document.getElementById('transitionProgress');
    
    if (!pageTransition || !transitionProgress) return;
    
    createTransitionParticles();
    pageTransition.classList.add('active');
    
    let progress = 0;
    const duration = 1800;
    const startTime = performance.now();
    
    function animateProgress(currentTime) {
        const elapsedTime = currentTime - startTime;
        progress = Math.min(elapsedTime / duration * 100, 100);
        
        transitionProgress.style.width = `${progress}%`;
        
        if (progress < 100) {
            requestAnimationFrame(animateProgress);
        } else {
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        }
    }
    
    requestAnimationFrame(animateProgress);
}

// Configurar transições de página para produto.html
function setupPageTransitions() {
    const links = document.querySelectorAll('a[href="produto.html"], a[href*="produto.html"]');
    
    links.forEach(link => {
        if (link.target !== '_blank') {
            link.addEventListener('click', function(e) {
                startPageTransition(e, this.href);
            });
        }
    });
    
    // Configurar botão especial se existir
    const produtoBtn = document.querySelector('.hero .secondary-btn, .produto-btn');
    if (produtoBtn) {
        produtoBtn.addEventListener('click', function(e) {
            startPageTransition(e, 'produto.html');
        });
    }
}

// Substitui o número do WhatsApp
function setupWhatsAppLinks() {
    const whatsappNumber = '5511978073711';
    const whatsappLinks = document.querySelectorAll('a[href*="5511978073711"]');
    
    whatsappLinks.forEach(link => {
        link.href = link.href.replace('5511978073711', whatsappNumber);
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    setupPageTransitions();
    setupWhatsAppLinks();
    createTransitionParticles();
});