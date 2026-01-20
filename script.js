// Add interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Letter opening functionality
    const letterContainer = document.getElementById('letterContainer');
    const cinnamorollTrigger = document.getElementById('cinnamorollTrigger');
    let isOpen = false;
    
    // Cinnamoroll click to open letter
    cinnamorollTrigger.addEventListener('click', function(e) {
        if (!isOpen) {
            // Hide Cinnamoroll
            this.classList.add('hidden');
            
            // Open letter
            letterContainer.classList.add('open');
            isOpen = true;
            
            // Show page navigation
            const pageNav = document.querySelector('.page-nav');
            if (pageNav) {
                pageNav.style.opacity = '1';
            }
        }
    });
    
    // Remove click event from letter container
    letterContainer.style.cursor = 'default';
     
    // Animate Sanrio characters on hover
    const characters = document.querySelectorAll('.character div');
    characters.forEach(character => {
        character.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.5s ease';
        });
        
        character.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add typewriter effect to header on load
    const header = document.querySelector('.letter-header h1');
    const originalText = header.textContent;
    header.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            header.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
    
    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.character div, .sticker, .photo-corner');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
    
    // Letter container tilt effect on mouse move (only when open)
    letterContainer.addEventListener('mousemove', function(e) {
        if (!isOpen) return;
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    letterContainer.addEventListener('mouseleave', function() {
        if (!isOpen) return;
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) rotate(0deg) scale(1)';
    });
    
    // Click outside letter to close
    document.addEventListener('click', function(e) {
        if (isOpen && !letterContainer.contains(e.target) && !cinnamorollTrigger.contains(e.target)) {
            letterContainer.classList.remove('open');
            cinnamorollTrigger.classList.remove('hidden');
            isOpen = false;
            
            // Hide page navigation when closing
            const pageNav = document.querySelector('.page-nav');
            if (pageNav) {
                pageNav.style.opacity = '0';
            }
        }
    });
    
    // Page navigation functionality
    let currentPage = 1;
    const totalPages = 2;
    
    function changePage(direction) {
        const page1 = document.getElementById('page1');
        const page2 = document.getElementById('page2');
        const currentPageSpan = document.getElementById('currentPage');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Hide current page
        if (currentPage === 1) {
            page1.style.display = 'none';
            page2.style.display = 'block';
            currentPage = 2;
            currentPageSpan.textContent = '2';
        } else {
            page2.style.display = 'none';
            page1.style.display = 'block';
            currentPage = 1;
            currentPageSpan.textContent = '1';
        }
        
        // Update button states
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Make changePage function global
    window.changePage = changePage;
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.2); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.3); }
        100% { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes sparkle-float {
        0% { 
            opacity: 1; 
            transform: translateY(0) scale(0);
        }
        50% { 
            opacity: 1; 
            transform: translateY(-30px) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translateY(-60px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);
