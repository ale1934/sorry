// Add interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle system
    let currentLanguage = 'en'; // 'en' or 'translated'
    
    // Dynamic Letter Pages System with alternate versions
    const letterPages = [
        {
            id: 'page1',
            title: {
                en: '💌 Dear Sophia,',
                translated: '💌 亲爱的 Sophia,'
            },
            content: {
                en: `
                    <p>I hope this letter finds you well. I think you will be reading this during your school trip 
                    so I hope that you are enjoying it. ^o^ I am excited to hear you talk about it.
                    </p>
                `,
                translated: `
                    <p>我希望这封信能让你感觉良好。我想你会在学校旅行时读到这篇文章
                    所以我希望你喜欢它。^o^我很高兴听到你谈论它。
                    </p>
                `
            }
        },
        {
            id: 'page2',
            title: {
                en: '',
                translated: ''
            },
            content: {
                en: `
                                
                    <p>There are so many things I want to write about but I will be attaching a handwritten letter in that gift I mentioned.
                    Even so, I really want to apologize here for my selfishness.
                    </p>
                `,
                translated: `
                    <p>有太多的事情我想写，但我会附上一封信，那是我提到的礼物。
                    即使如此，我真的想在这里为我的自私道歉。
                    </p>
                `
            }
        },
        {
            id: 'page3',
            title: {
                en: '',
                translated: ''
            },
            content: {
                en: `
                    <p>I wish I could have done a lot of things differently. I don't really have a 
                    good excuse for my behavior but I do want to say sorry.
                    </p>
                `,
                translated: `
                    <p>我希望我能做很多事情不同。我真的没有
                    一个很好的借口来解释我的行为，但我真的想说抱歉。
                    </p>
                `
            }
        },
        {
            id: 'page4',
            title: {
                en: '',
                translated: ''
            },
            content: {
                en: `
                    <p>This is why I plan to start putting in more effort and being more responsible from now on.
                    I don't expect it to makeup for what I did but I do want to try to bring you joy.
                    </p>
                `,
                translated: `
                    <p>这就是为什么我要开始努力工作，从现在开始要负责任。
                    我不指望这能弥补我所做的，但我真的想尝试带给你快乐。
                    </p>
                `
            }
        },
        {
            id: 'page5',
            title: {
                en: '',
                translated: ''
            },
            content: {
                en: `
                    <p>Also, I really appreciate all of the gifts you've given me! I recently put up panda diffuser in my room 
                    and it has really made a difference. I've also solved the jigsaw puzzle like 3 items I didn't think a small puzzle 
                    would be so entertaining 😅
                    </p>
                `,
                translated: `
                    <p>另外，我非常感谢你送给我的所有礼物！我最近在房间里挂了一个熊猫形状的空气清新剂，
它真的很有用。我还把拼图拼了三次，没想到这么小的拼图竟然这么好玩！😅
                    </p>
                `
            }
        },
        {
            id: 'page6',
            title: {
                en: '',
                translated: ''
            },
            content: {
                en: `
                    <p>Of course the letter was also great. It really made me happy and the drawing of the cat was adorable. I'm glad we
                    were still able to meet even though I messed up. It was really fun shopping with you and I hope I can see you again. 💕💕
                    </p>
                `,
                translated: `
                    <p>当然，信件也非常棒。真的让我很开心，猫的画像很可爱。很高兴我们
                    尽管我搞砸了，我们还是能见面。和你购物真的很好，希望我能看到你。💕💕
                    </p>
                `
            }
        },
        {
            id: 'page7',
            title: {
                en: '',
                translated: ''
            },
            content: {
                en: `
                    <p>ps... sorry for my lack of graphic design I tried my best to make it look nice.
                    </p>
                `,
                translated: `
                    <p>ps... 抱歉我的平面设计水平有限，我已经尽力把它做得好看一些了。
                    </p>
                `
            }
        }
    ];

    let currentPageIndex = 0;
    
    // Function to display a specific page
    function showPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= letterPages.length) return;
        
        currentPageIndex = pageIndex;
        const page = letterPages[pageIndex];
        
        // Update letter content with language support
        const letterHeader = document.querySelector('.letter-header h1');
        const letterContent = document.querySelector('.letter-content');
        
        if (letterHeader) {
            const title = page.title[currentLanguage] || page.title.en || '';
            letterHeader.textContent = title;
        }
        
        if (letterContent) {
            const content = page.content[currentLanguage] || page.content.en || '';
            letterContent.innerHTML = content;
        }
        
        // Update navigation buttons
        updateNavigation();
        
        console.log(`Showing page ${pageIndex + 1} (${currentLanguage}): ${page.title[currentLanguage] || page.title.en}`);
    }
    
    // Function to update navigation buttons
    function updateNavigation() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const pageInfo = document.querySelector('.page-info');
        
        if (prevBtn) {
            prevBtn.style.opacity = currentPageIndex === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentPageIndex === 0 ? 'none' : 'auto';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = currentPageIndex === letterPages.length - 1 ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentPageIndex === letterPages.length - 1 ? 'none' : 'auto';
        }
        
        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPageIndex + 1} / ${letterPages.length}`;
        }
    }
    
    // Navigation functions
    window.goToPrevPage = function() {
        if (currentPageIndex > 0) {
            showPage(currentPageIndex - 1);
        }
    };
    
    window.goToNextPage = function() {
        if (currentPageIndex < letterPages.length - 1) {
            showPage(currentPageIndex + 1);
        }
    };
    
    // Function to add new pages easily
    window.addLetterPage = function(title, content) {
        letterPages.push({
            id: `page${letterPages.length + 1}`,
            title: {
                en: title,
                translated: '' // Add translated version when ready
            },
            content: {
                en: content,
                translated: '' // Add translated version when ready
            }
        });
        console.log(`Added new page: ${title}`);
        updateNavigation();
    };
    
    // Language toggle function
    window.toggleLanguage = function() {
        currentLanguage = currentLanguage === 'en' ? 'translated' : 'en';
        showPage(currentPageIndex); // Refresh current page with new language
        console.log(`Switched to language: ${currentLanguage}`);
        
        // Update button text
        const langBtn = document.querySelector('.lang-toggle');
        if (langBtn) {
            langBtn.textContent = currentLanguage === 'en' ? 'CN' : 'EN';
        }
    };
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
            
            // Initialize with first page
            showPage(0);
            
            // Hide Cinnamoroll
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


