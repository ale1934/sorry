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

    // Other Triggers ----------------------------------------------------
    const cinnamorollBalloonTrigger = getElementById('cinnamoroll-balloon-sticker');
    const cinnamorollStickerTrigger = getElementById('cinnamoroll-sticker'); 
    const kuromiTrigger = getElementById('kuromi-sticker');
    const pompompurinTrigger = getElementById('pompompurin-sticker');
    const badtzMaruTrigger = getElementById('badtz-maru-sticker');
    const myMelodyTrigger = getElementById('my-melody-sticker');
    // -------------------------------------------------------------------
    
    // Remove click event from letter container
    letterContainer.style.cursor = 'default';
    
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
    }`;
document.head.appendChild(style);
