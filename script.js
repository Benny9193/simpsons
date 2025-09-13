// Springfield Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeParallax();
    initializeSearch();
    initializeFilters();
    initializeDashboardCards();
    initializeAnimations();
});

// Parallax Cloud Animation
function initializeParallax() {
    const cloudLayers = document.querySelectorAll('.cloud-layer');
    
    // Add scroll-based parallax effect
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax1 = scrolled * 0.2;
        const parallax2 = scrolled * 0.4;
        const parallax3 = scrolled * 0.6;
        
        if (cloudLayers[0]) {
            cloudLayers[0].style.transform = `translateY(${parallax1}px)`;
        }
        if (cloudLayers[1]) {
            cloudLayers[1].style.transform = `translateY(${parallax2}px)`;
        }
        if (cloudLayers[2]) {
            cloudLayers[2].style.transform = `translateY(${parallax3}px)`;
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add random cloud spawning for more dynamic effect
    function addRandomClouds() {
        const container = document.querySelector('.parallax-container');
        if (!container) return;
        
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                createRandomCloud(container);
            }
        }, 5000);
    }
    
    function createRandomCloud(container) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Random cloud properties
        const size = 60 + Math.random() * 60; // 60-120px width
        const height = size * 0.4; // Proportional height
        const opacity = 0.3 + Math.random() * 0.5; // 0.3-0.8 opacity
        const duration = 15 + Math.random() * 25; // 15-40s duration
        const topPosition = Math.random() * 40; // 0-40% from top
        
        cloud.style.width = `${size}px`;
        cloud.style.height = `${height}px`;
        cloud.style.opacity = opacity;
        cloud.style.top = `${topPosition}%`;
        cloud.style.left = '-150px';
        cloud.style.animation = `float-cloud ${duration}s linear`;
        
        // Add cloud parts
        const before = document.createElement('div');
        before.style.cssText = `
            position: absolute;
            background: #FFFFFF;
            border-radius: 50px;
            width: ${size * 0.5}px;
            height: ${size * 0.5}px;
            top: ${-size * 0.25}px;
            left: ${size * 0.15}px;
        `;
        
        const after = document.createElement('div');
        after.style.cssText = `
            position: absolute;
            background: #FFFFFF;
            border-radius: 50px;
            width: ${size * 0.6}px;
            height: ${height}px;
            top: ${-height * 0.3}px;
            right: ${size * 0.15}px;
        `;
        
        cloud.appendChild(before);
        cloud.appendChild(after);
        container.appendChild(cloud);
        
        // Remove cloud after animation
        setTimeout(() => {
            if (cloud.parentNode) {
                cloud.parentNode.removeChild(cloud);
            }
        }, duration * 1000);
    }
    
    addRandomClouds();
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    if (!searchInput) return;
    
    function performSearch(query) {
        const lowerQuery = query.toLowerCase().trim();
        
        if (lowerQuery === '') {
            // Show all cards
            dashboardCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
            return;
        }
        
        dashboardCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const category = card.dataset.category || '';
            
            if (cardText.includes(lowerQuery) || category.includes(lowerQuery)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                
                // Add highlight effect
                card.style.animation = 'searchHighlight 0.6s ease';
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.95)';
            }
        });
    }
    
    // Search input events
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
            addSearchAnimation();
        }
    });
    
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
        addSearchAnimation();
    });
    
    function addSearchAnimation() {
        searchButton.style.animation = 'searchPulse 0.3s ease';
        setTimeout(() => {
            searchButton.style.animation = '';
        }, 300);
    }
    
    // Add search highlight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes searchHighlight {
            0% { border-color: #333; }
            50% { border-color: #FF6B35; box-shadow: 0 0 20px rgba(255, 107, 53, 0.6); }
            100% { border-color: #333; }
        }
        
        @keyframes searchPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Filter Functionality
function initializeFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked chip
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter dashboard cards
            dashboardCards.forEach(card => {
                const category = card.dataset.category;
                
                if (!category || filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    
                    // Add filter animation
                    card.style.animation = 'filterIn 0.5s ease';
                } else {
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.95)';
                    card.style.animation = 'filterOut 0.3s ease';
                }
            });
            
            // Add chip click animation
            this.style.animation = 'chipClick 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Add filter animations
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        @keyframes filterIn {
            0% { opacity: 0.3; transform: scale(0.9) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes filterOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0.3; transform: scale(0.95); }
        }
        
        @keyframes chipClick {
            0% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.05) translateY(-3px); }
            100% { transform: scale(1) translateY(-2px); }
        }
    `;
    document.head.appendChild(filterStyle);
}

// Dashboard Card Interactions
function initializeDashboardCards() {
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    dashboardCards.forEach(card => {
        // Add click interaction
        card.addEventListener('click', function() {
            const category = this.dataset.category || 'general';
            showCardDetails(category, this);
        });
        
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'cardHover 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    function showCardDetails(category, cardElement) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'modal-content';
        modal.style.cssText = `
            background: white;
            border: 4px solid #333;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.4s ease;
        `;
        
        // Modal content based on category
        const content = getModalContent(category);
        modal.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: #FF6B35;
                border: 3px solid #333;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 20px;
                cursor: pointer;
                color: white;
                font-weight: bold;
            ">×</button>
            ${content}
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Close modal functionality
        function closeModal() {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        
        // Add escape key listener
        function handleEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        }
        document.addEventListener('keydown', handleEscape);
        
        // Add card click animation
        cardElement.style.animation = 'cardClick 0.3s ease';
        setTimeout(() => {
            cardElement.style.animation = '';
        }, 300);
    }
    
    function getModalContent(category) {
        const contents = {
            episodes: `
                <h2 style="color: #FF6B35; font-family: 'Fredoka One', cursive; margin-bottom: 20px;">📺 Episodes</h2>
                <p style="margin-bottom: 15px; line-height: 1.6;">Dive into over 750 episodes spanning 34+ seasons of The Simpsons!</p>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    <li>Classic episodes from the golden era</li>
                    <li>Modern storylines and character development</li>
                    <li>Special holiday episodes</li>
                    <li>Celebrity guest appearances</li>
                    <li>Treehouse of Horror anthology</li>
                </ul>
            `,
            characters: `
                <h2 style="color: #32CD32; font-family: 'Fredoka One', cursive; margin-bottom: 20px;">👥 Characters</h2>
                <p style="margin-bottom: 15px; line-height: 1.6;">Meet the 500+ colorful residents of Springfield!</p>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    <li>The Simpson Family</li>
                    <li>Ned Flanders and neighbors</li>
                    <li>Springfield Elementary staff</li>
                    <li>Moe's Tavern regulars</li>
                    <li>Nuclear Power Plant employees</li>
                </ul>
            `,
            locations: `
                <h2 style="color: #87CEEB; font-family: 'Fredoka One', cursive; margin-bottom: 20px;">🏢 Locations</h2>
                <p style="margin-bottom: 15px; line-height: 1.6;">Explore 200+ iconic Springfield landmarks!</p>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    <li>742 Evergreen Terrace</li>
                    <li>Springfield Nuclear Power Plant</li>
                    <li>Moe's Tavern</li>
                    <li>Springfield Elementary School</li>
                    <li>Kwik-E-Mart</li>
                </ul>
            `,
            lore: `
                <h2 style="color: #DA70D6; font-family: 'Fredoka One', cursive; margin-bottom: 20px;">📖 Lore</h2>
                <p style="margin-bottom: 15px; line-height: 1.6;">Discover hidden stories and Easter eggs throughout the series!</p>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    <li>Running gags and callbacks</li>
                    <li>Character backstories</li>
                    <li>Springfield's mysterious history</li>
                    <li>Pop culture references</li>
                    <li>Creator commentary and trivia</li>
                </ul>
            `,
            games: `
                <h2 style="color: #FFD700; font-family: 'Fredoka One', cursive; margin-bottom: 20px;">🎮 Games</h2>
                <p style="margin-bottom: 15px; line-height: 1.6;">Play 25+ Simpsons-themed mini-games!</p>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    <li>Springfield Builder</li>
                    <li>Donut Throwing Challenge</li>
                    <li>Bart's Skateboard Run</li>
                    <li>Homer's Beer Quest</li>
                    <li>Lisa's Saxophone Symphony</li>
                </ul>
            `
        };
        
        return contents[category] || `
            <h2 style="color: #FF6B35; font-family: 'Fredoka One', cursive; margin-bottom: 20px;">Springfield Info</h2>
            <p style="line-height: 1.6;">Welcome to the wonderful world of Springfield! Explore all the amazing content available in our dashboard.</p>
        `;
    }
    
    // Add modal and card animations
    const cardStyle = document.createElement('style');
    cardStyle.textContent = `
        @keyframes cardHover {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-5px) scale(1.02); }
        }
        
        @keyframes cardClick {
            0% { transform: scale(1); }
            50% { transform: scale(0.98); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes modalSlideIn {
            0% { transform: translateY(-20px) scale(0.95); opacity: 0; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(cardStyle);
}

// Additional Animations
function initializeAnimations() {
    // Add stagger animation to dashboard cards on load
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    dashboardCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
    
    // Add welcome section animation
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            welcomeSection.style.transition = 'all 0.8s ease';
            welcomeSection.style.opacity = '1';
            welcomeSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add navigation animation
    const nav = document.querySelector('.top-nav');
    if (nav) {
        nav.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            nav.style.transition = 'transform 0.8s ease';
            nav.style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Add floating animation to filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach((chip, index) => {
        chip.style.animationDelay = `${index * 0.1}s`;
        chip.classList.add('chip-float');
    });
    
    // Add chip float animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        .chip-float {
            animation: chipFloat 3s ease-in-out infinite;
        }
        
        @keyframes chipFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Add some fun Easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code Easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    window.konamiIndex = window.konamiIndex || 0;
    
    if (e.keyCode === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            triggerDonutRain();
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

function triggerDonutRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFallingDonut();
        }, i * 200);
    }
}

function createFallingDonut() {
    const donut = document.createElement('div');
    donut.textContent = '🍩';
    donut.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * window.innerWidth}px;
        font-size: 30px;
        z-index: 10000;
        pointer-events: none;
        animation: donutFall 3s linear forwards;
    `;
    
    document.body.appendChild(donut);
    
    setTimeout(() => {
        if (donut.parentNode) {
            donut.parentNode.removeChild(donut);
        }
    }, 3000);
}

// Add donut fall animation
const donutStyle = document.createElement('style');
donutStyle.textContent = `
    @keyframes donutFall {
        to {
            transform: translateY(calc(100vh + 100px)) rotate(720deg);
        }
    }
`;
document.head.appendChild(donutStyle);