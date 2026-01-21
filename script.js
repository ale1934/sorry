// Add interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
    // Letter opening functionality
    const letterContainer = document.getElementById('letterContainer');
    const cinnamorollTrigger = document.getElementById('cinnamorollTrigger');
    let isLetterOpen = false;
    
    // Debug: Check what characters exist
    const allChars = document.querySelectorAll('.character');
    console.log('Found characters:', allChars.length, allChars);
    
    // Helper function to disable all characters
    function disableAllCharacters() {
        console.log('Disabling all characters');
        const allCharacters = document.querySelectorAll('.character');
        allCharacters.forEach(char => {
            if (!char.classList.contains('hidden')) {
                char.classList.add('disabled');
                console.log('Disabled character:', char.className);
            }
        });
        
        // Don't disable the center Cinnamoroll trigger here - it gets hidden in the individual handlers
        console.log('Center trigger will be handled by individual page handlers');
    }
    
    // Helper function to enable all characters
    function enableAllCharacters() {
        console.log('Enabling all characters');
        const allCharacters = document.querySelectorAll('.character');
        allCharacters.forEach(char => {
            char.classList.remove('disabled');
        });
        
        // Also enable the center Cinnamoroll trigger (for when letter is closed)
        cinnamorollTrigger.classList.remove('disabled');
        console.log('Enabled center Cinnamoroll trigger');
    }
    
    // Cinnamoroll click to open letter
    const handleLetterOpen = function(e) {
        e.preventDefault();
        console.log('Letter clicked. Current states:', {
            isGiftCardOpen,
            isLetterOpen,
            isCalendarOpen
        });
        
        if (!isLetterOpen) {

            document.body.classList.add('page-open');
            // Disable all characters FIRST (before hiding anything)
            disableAllCharacters();
            
            // Then hide Cinnamoroll
            this.classList.add('hidden');
            
            // Open letter
            letterContainer.classList.add('open');
            isLetterOpen = true;
            console.log('Letter opened');
            
            // Show page navigation
            const pageNav = document.querySelector('.page-nav');
            if (pageNav) {
                pageNav.style.opacity = '1';
            }
        } else {
            console.log('Letter already open');
        }
    };
    
    cinnamorollTrigger.addEventListener('click', handleLetterOpen);
    cinnamorollTrigger.addEventListener('touchstart', handleLetterOpen, { passive: false });

    // Other Triggers ----------------------------------------------------
    
    // Gift Card Trigger (Top-Left)
    const topLeftCharacter = document.querySelector('.character-top-left');
    const giftCardContainer = document.getElementById('giftCardContainer');
    let isGiftCardOpen = false;
    
    // Add both click and touch events for mobile compatibility
    const handleGiftCardOpen = function(e) {
        e.preventDefault();
        console.log('Gift card clicked. Current states:', {
            isGiftCardOpen,
            isLetterOpen,
            isCalendarOpen
        });
        
        if (!isGiftCardOpen && !isLetterOpen && !isCalendarOpen) {
            // Disable all characters FIRST (before hiding anything)
            disableAllCharacters();
            
            // Then hide this character and trigger
            document.body.classList.add('page-open');
            this.classList.add('hidden');
            cinnamorollTrigger.classList.add('hidden');
            giftCardContainer.classList.add('open');
            isGiftCardOpen = true;
            console.log('Gift card opened');
        } else {
            console.log('Gift card blocked - another page is open');
        }
    };
    
    topLeftCharacter.addEventListener('click', handleGiftCardOpen);
    topLeftCharacter.addEventListener('touchstart', handleGiftCardOpen, { passive: false });
    
    // Calendar Trigger (Top-Right)
    const topRightCharacter = document.querySelector('.character-top-right');
    const calendarContainer = document.getElementById('calendarContainer');
    let isCalendarOpen = false;
    
    // Add both click and touch events for mobile compatibility
    const handleCalendarOpen = function(e) {
        e.preventDefault();
        console.log('Calendar clicked. Current states:', {
            isGiftCardOpen,
            isLetterOpen,
            isCalendarOpen
        });
        
        if (!isCalendarOpen && !isLetterOpen && !isGiftCardOpen) {
            // Disable all characters FIRST (before hiding anything)
            disableAllCharacters();

            document.body.classList.add('page-open');
            
            // Then hide this character and trigger
            this.classList.add('hidden');
            cinnamorollTrigger.classList.add('hidden');
            calendarContainer.classList.add('open');
            isCalendarOpen = true;
            console.log('Calendar opened');
        } else {
            console.log('Calendar blocked - another page is open');
        }
    };
    
    topRightCharacter.addEventListener('click', handleCalendarOpen);
    topRightCharacter.addEventListener('touchstart', handleCalendarOpen, { passive: false });
    
    // Close functions
    window.closeGiftCard = function() {
        giftCardContainer.classList.remove('open');
        setTimeout(() => {
            document.body.classList.remove('page-open');

            topLeftCharacter.classList.remove('hidden');
            cinnamorollTrigger.classList.remove('hidden');
            enableAllCharacters(); // Re-enable all characters
        }, 300);
        isGiftCardOpen = false;
    };
    
    window.closeCalendar = function() {
        calendarContainer.classList.remove('open');
        setTimeout(() => {
            document.body.classList.remove('page-open');

            topRightCharacter.classList.remove('hidden');
            cinnamorollTrigger.classList.remove('hidden');
            enableAllCharacters(); // Re-enable all characters
        }, 300);
        isCalendarOpen = false;
    };

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
        if (!isLetterOpen) return;
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        this.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    letterContainer.addEventListener('mouseleave', function() {
        if (!isLetterOpen) return;
        this.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateX(0) rotateY(0) rotate(0deg) scale(1)';
    });
    
    // Click outside any container to close
    document.addEventListener('click', function(e) {

        document.body.classList.remove('page-open');

        // Letter close logic
        if (isLetterOpen && !letterContainer.contains(e.target) && !cinnamorollTrigger.contains(e.target)) {
            // Reset transform before closing to avoid conflicts
            letterContainer.style.transform = '';
            letterContainer.classList.remove('open');
            cinnamorollTrigger.classList.remove('hidden');
            isLetterOpen = false;
            enableAllCharacters(); // Re-enable all characters
            
            // Hide page navigation when closing
            const pageNav = document.querySelector('.page-nav');
            if (pageNav) {
                pageNav.style.opacity = '0';
            }
        }
        
        // Gift card close logic
        if (isGiftCardOpen && !giftCardContainer.contains(e.target) && !topLeftCharacter.contains(e.target)) {
            closeGiftCard();
        }
        
        // Calendar close logic
        if (isCalendarOpen && !calendarContainer.contains(e.target) && !topRightCharacter.contains(e.target)) {
            closeCalendar();
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


