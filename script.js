// Inicialização do AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Efeito hover nos links e botões
const hoverElements = document.querySelectorAll('a, button, .service-card, .tech-item, .founder-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        element.style.cursor = 'none';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header com efeito de transparência no scroll
const header = document.querySelector('.header');
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

// Botões com efeito de ripple
const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .contact-btn, .submit-btn');

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
    
    // Aqui você pode adicionar sua lógica de envio do formulário
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
        form.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
        }, 2000);
    }, 1500);
});

// Efeito parallax nas imagens dos fundadores
const founderImages = document.querySelectorAll('.founder-image');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    founderImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        const x = (mouseX - rect.left) / 30;
        const y = (mouseY - rect.top) / 30;

        image.style.transform = `translate(${x}px, ${y}px)`;
    });
}); 
function setupPageTransitions() {
    const pageTransition = document.getElementById('pageTransition');
    const transitionProgress = document.getElementById('transitionProgress');
    const transitionParticles = document.getElementById('transitionParticles');
    const links = document.querySelectorAll('a[href="portfolio.html"], a[href*="portfolio.html"]');
    
    // Criar partículas
    function createParticles() {
        transitionParticles.innerHTML = '';
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('transition-particle');
            
            // Tamanho aleatório entre 3px e 8px
            const size = Math.random() * 5 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posição aleatória
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Atraso e duração da animação
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
            
            transitionParticles.appendChild(particle);
        }
    }
    
    // Iniciar transição
    function startTransition(e, targetUrl) {
        e.preventDefault();
        
        // Criar partículas
        createParticles();
        
        // Mostrar overlay de transição
        pageTransition.classList.add('active');
        
        // Animação de progresso
        let progress = 0;
        const duration = 1800; // 1.8 segundos
        
        const startTime = performance.now();
        
        function animateProgress(currentTime) {
            const elapsedTime = currentTime - startTime;
            progress = Math.min(elapsedTime / duration * 100, 100);
            
            transitionProgress.style.width = `${progress}%`;
            
            if (progress < 100) {
                requestAnimationFrame(animateProgress);
            } else {
                // Redirecionar quando completo
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            }
        }
        
        requestAnimationFrame(animateProgress);
    }
    
    // Configurar eventos nos links
    links.forEach(link => {
        if (link.target !== '_blank') {
            link.addEventListener('click', function(e) {
                startTransition(e, this.href);
            });
        }
    });
    
    // Criar partículas inicialmente
    createParticles();
}

document.addEventListener('DOMContentLoaded', setupPageTransitions);
// Função para iniciar a transição do portfólio
function startPortfolioTransition(e) {
    if (e) e.preventDefault();
    
    const pageTransition = document.getElementById('pageTransition');
    const transitionProgress = document.getElementById('transitionProgress');
    
    // Criar partículas
    createParticles();
    
    // Mostrar overlay de transição
    pageTransition.classList.add('active');
    
    // Animação de progresso
    let progress = 0;
    const duration = 1800; // 1.8 segundos
    
    const startTime = performance.now();
    
    function animateProgress(currentTime) {
        const elapsedTime = currentTime - startTime;
        progress = Math.min(elapsedTime / duration * 100, 100);
        
        transitionProgress.style.width = `${progress}%`;
        
        if (progress < 100) {
            requestAnimationFrame(animateProgress);
        } else {
            // Redirecionar quando completo
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 300);
        }
    }
    
    requestAnimationFrame(animateProgress);
}

// Certifique-se que a função createParticles existe
function createParticles() {
    const transitionParticles = document.getElementById('transitionParticles');
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

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Configurar transição para links
    setupPageTransitions();
    
    // Configurar o botão da hero section
    const heroPortfolioBtn = document.querySelector('.hero .secondary-btn');
    if (heroPortfolioBtn) {
        heroPortfolioBtn.addEventListener('click', startPortfolioTransition);
    }
});

function setupPageTransitions() {
    const links = document.querySelectorAll('.transition-link[href="portfolio.html"], .transition-link[href*="portfolio.html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.tagName === 'A') {
                startPortfolioTransition(e);
            }
        });
    });
}