// Springfield Control Center JavaScript

class SpringfieldDashboard {
    constructor() {
        this.konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        this.konamiIndex = 0;
        this.season1Active = false;
        this.highContrastMode = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAccessibility();
        this.setupEasterEggs();
        this.setupHeroSection();
        this.loadUserPreferences();
        this.startPerformanceOptimizations();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('town-search');
        const searchBtn = document.querySelector('.search-btn');

        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        searchBtn.addEventListener('click', () => this.executeSearch());

        // Filter chips
        const filterChips = document.querySelectorAll('.chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => this.handleFilter(e.target.dataset.filter));
        });

        // Category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryFilter(e.target.dataset.category));
        });

        // Mini map districts
        const mapDistricts = document.querySelectorAll('.map-district');
        mapDistricts.forEach(district => {
            district.addEventListener('click', (e) => this.handleMapDistrictClick(e.currentTarget.dataset.category));
        });

        // Quick action buttons
        const randomBtn = document.getElementById('random-location-btn');
        const favoritesBtn = document.getElementById('favorites-btn');
        const statsBtn = document.getElementById('stats-btn');
        const themeBtn = document.getElementById('theme-toggle');

        randomBtn.addEventListener('click', () => this.visitRandomLocation());
        favoritesBtn.addEventListener('click', () => this.showFavorites());
        statsBtn.addEventListener('click', () => this.showStats());
        themeBtn.addEventListener('click', () => this.cycleTheme());

        // Location cards
        const locationCards = document.querySelectorAll('.location-card');
        locationCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleLocationClick(e.currentTarget));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleLocationClick(e.currentTarget);
                }
            });
        });

        // Springfield seal animation
        const seal = document.querySelector('.springfield-seal');
        seal.addEventListener('click', () => this.spinSeal());

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeyboard(e));

        // Modal functionality
        this.setupModal();

        // Window resize optimization
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });

        // Visibility API for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    setupAccessibility() {
        // Focus management
        this.setupFocusTrap();

        // Screen reader announcements
        this.createAriaLiveRegion();

        // Skip link
        this.createSkipLink();

        // High contrast toggle
        const contrastToggle = this.createAccessibilityControls();
        document.body.insertBefore(contrastToggle, document.body.firstChild);
    }

    setupEasterEggs() {
        // Donut button confetti
        const donutBtn = document.getElementById('donut-button');
        donutBtn.addEventListener('click', () => this.triggerSprinkles());

        // D'oh! sound setup
        this.setupDohSound();

        // Hidden donuts (click to add sprinkles to UI elements)
        this.createHiddenDonuts();
    }

    setupHeroSection() {
        // Initialize quote carousel
        this.setupQuoteCarousel();

        // Initialize weather updates
        this.setupWeatherUpdates();

        // Initialize skyline animations
        this.setupSkylineAnimations();

        // Initialize featured card rotation
        this.setupFeaturedRotation();

        // Initialize masonry layout
        this.setupMasonryLayout();
    }

    setupQuoteCarousel() {
        const quotes = document.querySelectorAll('.quote');
        if (quotes.length === 0) return;

        let currentQuoteIndex = 0;

        // Rotate quotes every 5 seconds
        setInterval(() => {
            quotes[currentQuoteIndex].classList.remove('active');
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quotes[currentQuoteIndex].classList.add('active');

            // Announce to screen readers
            const currentQuote = quotes[currentQuoteIndex];
            const quoteText = currentQuote.querySelector('.quote-text').textContent;
            const quoteAuthor = currentQuote.querySelector('.quote-author').textContent;
            this.announceToScreenReader(`Quote: ${quoteText} ${quoteAuthor}`);
        }, 5000);
    }

    setupWeatherUpdates() {
        const weatherConditions = [
            { temp: '72°F', label: 'Nuclear Winter', radiation: 'Minimal', smog: 'Moderate', donut: 'Excellent' },
            { temp: '68°F', label: 'Radioactive Breeze', radiation: 'Low', smog: 'Light', donut: 'Outstanding' },
            { temp: '75°F', label: 'Toxic Sunshine', radiation: 'Moderate', smog: 'Heavy', donut: 'Good' },
            { temp: '70°F', label: 'Atomic Drizzle', radiation: 'Minimal', smog: 'Moderate', donut: 'Excellent' },
            { temp: '73°F', label: 'Meltdown Mild', radiation: 'Low', smog: 'Light', donut: 'Perfect' }
        ];

        let currentWeatherIndex = 0;

        // Update weather every 30 seconds
        setInterval(() => {
            const tempValue = document.querySelector('.temp-value');
            const tempLabel = document.querySelector('.temp-label');
            const radiationValue = document.querySelector('.weather-item:nth-child(1) .weather-value');
            const smogValue = document.querySelector('.weather-item:nth-child(2) .weather-value');
            const donutValue = document.querySelector('.weather-item:nth-child(3) .weather-value');

            if (tempValue && tempLabel && radiationValue && smogValue && donutValue) {
                currentWeatherIndex = (currentWeatherIndex + 1) % weatherConditions.length;
                const weather = weatherConditions[currentWeatherIndex];

                tempValue.textContent = weather.temp;
                tempLabel.textContent = weather.label;
                radiationValue.textContent = weather.radiation;
                smogValue.textContent = weather.smog;
                donutValue.textContent = weather.donut;

                // Update classes based on conditions
                radiationValue.className = 'weather-value ' + (weather.radiation === 'Minimal' ? 'safe' : 'moderate');
                smogValue.className = 'weather-value ' + (weather.smog === 'Light' ? 'safe' : 'moderate');
                donutValue.className = 'weather-value ' + (weather.donut === 'Perfect' || weather.donut === 'Excellent' ? 'excellent' : 'safe');
            }
        }, 30000);
    }

    setupSkylineAnimations() {
        // Add random window lights to buildings
        const buildings = document.querySelectorAll('.building');

        buildings.forEach((building, index) => {
            // Create window lights
            for (let i = 0; i < 6; i++) {
                const window = document.createElement('div');
                window.className = 'building-window';
                window.style.position = 'absolute';
                window.style.width = '8px';
                window.style.height = '8px';
                window.style.background = Math.random() > 0.5 ? 'var(--simpson-yellow)' : 'transparent';
                window.style.border = '1px solid var(--text-dark)';
                window.style.borderRadius = '2px';
                window.style.left = Math.random() * 60 + '%';
                window.style.top = Math.random() * 70 + '%';

                building.appendChild(window);

                // Randomly flicker windows
                setInterval(() => {
                    window.style.background = Math.random() > 0.7 ? 'var(--simpson-yellow)' : 'transparent';
                }, Math.random() * 10000 + 5000);
            }
        });

        // Add pulsing glow to nuclear tower
        const nuclearTower = document.querySelector('.nuclear-tower');
        if (nuclearTower) {
            setInterval(() => {
                nuclearTower.style.filter = 'drop-shadow(0 0 20px var(--nuclear-green))';
                setTimeout(() => {
                    nuclearTower.style.filter = 'drop-shadow(0 0 10px var(--nuclear-green))';
                }, 1000);
            }, 3000);
        }
    }

    setupFeaturedRotation() {
        const featuredLocations = [
            {
                location: 'simpsons-house',
                icon: '🏠',
                title: '742 Evergreen Terrace',
                description: 'The heart of Springfield - where America\'s favorite family lives',
                stats: [
                    { number: '∞', label: 'Donuts Consumed' },
                    { number: '684', label: 'Couch Gags' },
                    { number: '35+', label: 'Years on TV' }
                ],
                quote: '"D\'oh! Where\'s the remote?"'
            },
            {
                location: 'power-plant',
                icon: '⚛️',
                title: 'Springfield Nuclear Plant',
                description: 'Powering Springfield through questionable safety protocols',
                stats: [
                    { number: 'C-', label: 'Safety Rating' },
                    { number: '47', label: 'Accidents This Year' },
                    { number: '1', label: 'Safety Inspector' }
                ],
                quote: '"Excellent..." - Mr. Burns'
            },
            {
                location: 'moes-tavern',
                icon: '🍺',
                title: 'Moe\'s Tavern',
                description: 'Where everybody knows your shame and your tab',
                stats: [
                    { number: '847', label: 'Prank Calls' },
                    { number: '24/7', label: 'Duff on Tap' },
                    { number: '3', label: 'Regular Customers' }
                ],
                quote: '"Moe\'s Tavern, Moe speaking"'
            }
        ];

        let currentFeaturedIndex = 0;

        // Rotate featured location every 60 seconds
        setInterval(() => {
            currentFeaturedIndex = (currentFeaturedIndex + 1) % featuredLocations.length;
            this.updateFeaturedCard(featuredLocations[currentFeaturedIndex]);
        }, 60000);
    }

    updateFeaturedCard(locationData) {
        const featuredCard = document.querySelector('.featured-card');
        if (!featuredCard) return;

        // Add transition class
        featuredCard.style.opacity = '0.5';

        setTimeout(() => {
            // Update content
            featuredCard.dataset.location = locationData.location;
            featuredCard.querySelector('.featured-icon').textContent = locationData.icon;
            featuredCard.querySelector('.featured-text h3').textContent = locationData.title;
            featuredCard.querySelector('.featured-text p').textContent = locationData.description;
            featuredCard.querySelector('.featured-quote').textContent = locationData.quote;

            // Update stats
            const statElements = featuredCard.querySelectorAll('.featured-stat');
            locationData.stats.forEach((stat, index) => {
                if (statElements[index]) {
                    statElements[index].querySelector('.stat-number').textContent = stat.number;
                    statElements[index].querySelector('.stat-label').textContent = stat.label;
                }
            });

            // Restore opacity
            featuredCard.style.opacity = '1';
        }, 300);
    }

    setupMasonryLayout() {
        // Add stagger animation for cards
        const cards = document.querySelectorAll('.location-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('masonry-item');
        });
    }

    // Category Filtering
    handleCategoryFilter(category) {
        const cards = document.querySelectorAll('.location-card');
        const buttons = document.querySelectorAll('.category-btn');

        // Update active button
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        if (category === 'all') {
            cards.forEach(card => {
                card.style.display = '';
                card.classList.remove('filtered-out');
                card.style.opacity = '1';
                card.style.transform = '';
            });
            this.announceToScreenReader('Showing all Springfield locations');
            return;
        }

        let visibleCount = 0;
        cards.forEach((card, index) => {
            if (card.dataset.category === category) {
                card.style.display = '';
                card.classList.remove('filtered-out');
                card.style.opacity = '1';
                card.style.transform = '';
                card.style.animationDelay = `${visibleCount * 0.1}s`;
                visibleCount++;
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    if (card.style.opacity === '0.3') {
                        card.style.display = 'none';
                        card.classList.add('filtered-out');
                    }
                }, 300);
            }
        });

        const categoryNames = {
            residential: 'Residential',
            commercial: 'Commercial',
            municipal: 'Municipal',
            entertainment: 'Entertainment'
        };

        this.announceToScreenReader(`Filtered to ${visibleCount} ${categoryNames[category]} locations`);
    }

    // Mini Map and Quick Actions
    handleMapDistrictClick(category) {
        // Trigger the same filter as category buttons
        const categoryBtn = document.querySelector(`[data-category="${category}"]`);
        if (categoryBtn) {
            categoryBtn.click();
        }

        // Add visual feedback to the map
        const mapDistricts = document.querySelectorAll('.map-district');
        mapDistricts.forEach(district => {
            district.style.background = 'rgba(255, 255, 255, 0.3)';
        });

        const clickedDistrict = document.querySelector(`[data-category="${category}"]`);
        if (clickedDistrict) {
            clickedDistrict.style.background = 'rgba(255, 217, 15, 0.6)';
            setTimeout(() => {
                clickedDistrict.style.background = 'rgba(255, 255, 255, 0.3)';
            }, 2000);
        }

        this.playSound('click');
        this.showNotification(`Exploring ${category} district`, 'info');
    }

    visitRandomLocation() {
        const cards = document.querySelectorAll('.location-card:not([style*="display: none"])');
        if (cards.length === 0) return;

        const randomCard = cards[Math.floor(Math.random() * cards.length)];

        // Scroll to and highlight the random card
        randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add highlight animation
        randomCard.style.animation = 'none';
        randomCard.offsetHeight; // Force reflow
        randomCard.style.animation = 'random-highlight 2s ease-in-out';

        setTimeout(() => {
            randomCard.click();
        }, 1000);

        this.playSound('whoosh');
        this.showNotification('🎲 Visiting random location!', 'success');
    }

    showFavorites() {
        const favorites = this.getUserPreference('favorites') || [];

        if (favorites.length === 0) {
            this.showNotification('No favorites yet! Click the ⭐ on location cards to add them.', 'info');
            return;
        }

        // Filter to show only favorites
        const cards = document.querySelectorAll('.location-card');
        cards.forEach(card => {
            if (favorites.includes(card.dataset.location)) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = '';
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    if (card.style.opacity === '0.3') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Update category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => btn.classList.remove('active'));

        this.showNotification(`⭐ Showing ${favorites.length} favorite locations`, 'success');
        this.announceToScreenReader(`Showing ${favorites.length} favorite locations`);
    }

    showStats() {
        const stats = this.generateTownStats();

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📊 Springfield Statistics</h2>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">🏠</div>
                            <div class="stat-value">${stats.residential}</div>
                            <div class="stat-label">Residential</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🏪</div>
                            <div class="stat-value">${stats.commercial}</div>
                            <div class="stat-label">Commercial</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🏛️</div>
                            <div class="stat-value">${stats.municipal}</div>
                            <div class="stat-label">Municipal</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🎪</div>
                            <div class="stat-value">${stats.entertainment}</div>
                            <div class="stat-label">Entertainment</div>
                        </div>
                        <div class="stat-card full-width">
                            <div class="stat-icon">👥</div>
                            <div class="stat-value">30,720</div>
                            <div class="stat-label">Total Population</div>
                        </div>
                        <div class="stat-card full-width">
                            <div class="stat-icon">🍩</div>
                            <div class="stat-value">${stats.donutsConsumed.toLocaleString()}</div>
                            <div class="stat-label">Donuts Consumed Today</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        closeBtn.focus();
        this.playSound('chime');
    }

    generateTownStats() {
        const cards = document.querySelectorAll('.location-card');
        const stats = {
            residential: 0,
            commercial: 0,
            municipal: 0,
            entertainment: 0,
            donutsConsumed: Math.floor(Math.random() * 10000) + 5000
        };

        cards.forEach(card => {
            const category = card.dataset.category;
            if (stats.hasOwnProperty(category)) {
                stats[category]++;
            }
        });

        return stats;
    }

    cycleTheme() {
        const themes = ['default', 'night', 'retro', 'nuclear'];
        const currentTheme = this.getUserPreference('theme') || 'default';
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];

        this.applyTheme(nextTheme);
        this.saveUserPreference('theme', nextTheme);

        const themeNames = {
            default: 'Classic Springfield',
            night: 'Night Mode',
            retro: 'Retro 90s',
            nuclear: 'Nuclear Glow'
        };

        this.showNotification(`🎨 Theme: ${themeNames[nextTheme]}`, 'success');
        this.playSound('achievement');
    }

    applyTheme(theme) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '');

        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
    }

    getUserPreference(key) {
        try {
            const value = localStorage.getItem(`springfield_${key}`);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            return null;
        }
    }

    // Search Functionality
    handleSearch(query) {
        const cards = document.querySelectorAll('.location-card');
        const lowerQuery = query.toLowerCase();

        if (!query.trim()) {
            cards.forEach(card => {
                card.style.display = '';
                card.style.opacity = '1';
            });
            this.announceToScreenReader('Showing all locations');
            return;
        }

        let visibleCount = 0;
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const location = card.dataset.location.toLowerCase();

            if (cardText.includes(lowerQuery) || location.includes(lowerQuery)) {
                card.style.display = '';
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.style.opacity = '0.3';
                setTimeout(() => {
                    if (card.style.opacity === '0.3') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        this.announceToScreenReader(`Found ${visibleCount} locations matching "${query}"`);
    }

    executeSearch() {
        const searchInput = document.getElementById('town-search');
        const query = searchInput.value.trim();

        if (!query) {
            this.showNotification("D'oh! You need to enter something to search for!", 'warning');
            return;
        }

        // Simulate search with animation
        searchInput.classList.add('searching');
        setTimeout(() => {
            searchInput.classList.remove('searching');
            this.showNotification(`Searching Springfield for "${query}"...`, 'info');
        }, 1000);
    }

    // Filter Functionality
    handleFilter(filter) {
        const cards = document.querySelectorAll('.location-card');
        const chips = document.querySelectorAll('.chip');

        // Update active chip
        chips.forEach(chip => chip.classList.remove('active'));
        event.target.classList.add('active');

        if (filter === 'all') {
            cards.forEach(card => {
                card.style.display = '';
                card.classList.remove('filtered-out');
            });
            this.announceToScreenReader('Showing all locations');
            return;
        }

        // Simple filter logic (in a real app, this would be more sophisticated)
        const filterMap = {
            episodes: ['simpsons-house'],
            characters: ['simpsons-house', 'moes-tavern'],
            locations: ['elementary', 'power-plant', 'channel-6', 'kwik-e-mart'],
            lore: ['power-plant', 'channel-6'],
            games: ['kwik-e-mart', 'moes-tavern']
        };

        const relevantLocations = filterMap[filter] || [];
        let visibleCount = 0;

        cards.forEach(card => {
            if (relevantLocations.includes(card.dataset.location)) {
                card.style.display = '';
                card.classList.remove('filtered-out');
                visibleCount++;
            } else {
                card.classList.add('filtered-out');
                setTimeout(() => card.style.display = 'none', 300);
            }
        });

        this.announceToScreenReader(`Filtered to ${visibleCount} ${filter} locations`);
    }

    // Location Card Interactions
    handleLocationClick(card) {
        const location = card.dataset.location;
        const locationName = card.querySelector('h2').textContent;

        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Play appropriate sound effect
        this.playLocationSound(location);

        // Show location modal with details
        this.showLocationModal(location, locationName);

        // Track interaction for analytics (in a real app)
        this.trackInteraction('location_click', location);
    }

    showLocationModal(location, name) {
        const locationData = this.getLocationData(location);

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${name}</h2>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Description:</strong> ${locationData.description}</p>
                    <p><strong>Notable Characters:</strong> ${locationData.characters}</p>
                    <p><strong>Fun Fact:</strong> ${locationData.funFact}</p>
                    <p><strong>First Appeared:</strong> ${locationData.firstEpisode}</p>
                    <div style="margin-top: 1rem;">
                        <button class="chip" onclick="alert('Feature coming soon!')">Explore Gallery</button>
                        <button class="chip" onclick="alert('Feature coming soon!')">View Episodes</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Focus management
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.focus();

        // Close handlers
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        // Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    getLocationData(location) {
        const data = {
            'simpsons-house': {
                description: 'The iconic home of the Simpson family, featuring the famous orange couch and endless couch gags.',
                characters: 'Homer, Marge, Bart, Lisa, Maggie',
                funFact: 'The house address 742 Evergreen Terrace was inspired by creator Matt Groening\'s childhood address.',
                firstEpisode: 'Simpsons Roasting on an Open Fire (1989)'
            },
            'elementary': {
                description: 'Springfield Elementary School, where learning happens... occasionally.',
                characters: 'Principal Skinner, Superintendent Chalmers, Mrs. Krabappel',
                funFact: 'The school motto is "De Whal Oil Beef Hooked" which sounds like "The Whole Beef Hooked" in an Irish accent.',
                firstEpisode: 'Bart the Genius (1990)'
            },
            'power-plant': {
                description: 'Springfield Nuclear Power Plant, home to many safety violations and one very lazy safety inspector.',
                characters: 'Mr. Burns, Waylon Smithers, Homer Simpson',
                funFact: 'The plant has had numerous accidents, but somehow Springfield survives.',
                firstEpisode: 'Homer\'s Odyssey (1990)'
            },
            'channel-6': {
                description: 'Springfield\'s premier news station, delivering the news with questionable accuracy.',
                characters: 'Kent Brockman, Arnie Pie',
                funFact: 'Kent Brockman once welcomed our "new insect overlords" live on air.',
                firstEpisode: 'Krusty Gets Busted (1990)'
            },
            'moes-tavern': {
                description: 'The local watering hole where everybody knows your shame.',
                characters: 'Moe Szyslak, Barney Gumble, Carl, Lenny',
                funFact: 'The bar has been robbed multiple times, usually by the same few regulars.',
                firstEpisode: 'Simpsons Roasting on an Open Fire (1989)'
            },
            'kwik-e-mart': {
                description: 'Springfield\'s convenience store, open 24/7 and selling items of questionable freshness.',
                characters: 'Apu Nahasapeemapetilon',
                funFact: 'The hot dogs have been rotating on the grill since 1987.',
                firstEpisode: 'The Telltale Head (1990)'
            }
        };

        return data[location] || {
            description: 'A mysterious location in Springfield.',
            characters: 'Various residents',
            funFact: 'Every location in Springfield has its own unique story.',
            firstEpisode: 'Unknown'
        };
    }

    // Global Keyboard Shortcuts
    handleGlobalKeyboard(e) {
        // Check for Konami code
        if (e.code === this.konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === this.konamiCode.length) {
                this.activateSeason1Theme();
                this.konamiIndex = 0;
            }
        } else {
            this.konamiIndex = 0;
        }

        // Handle other shortcuts
        switch(e.key) {
            case '/':
                e.preventDefault();
                document.getElementById('town-search').focus();
                break;
            case 'D':
            case 'd':
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                    this.playDohSound();
                }
                break;
            case '?':
                e.preventDefault();
                this.showHelpModal();
                break;
            case 'Escape':
                this.closeAllModals();
                break;
        }

        // Number key shortcuts (1-6 for location cards)
        if (e.key >= '1' && e.key <= '6' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const cardIndex = parseInt(e.key) - 1;
            const cards = document.querySelectorAll('.location-card');
            if (cards[cardIndex] && cards[cardIndex].style.display !== 'none') {
                cards[cardIndex].focus();
                cards[cardIndex].click();
            }
        }
    }

    // Easter Eggs
    triggerSprinkles() {
        const colors = ['#FFD90F', '#E74C3C', '#58D68D', '#5DADE2', '#9B59B6', '#F39C12'];
        const confettiContainer = document.getElementById('confetti-container');

        for (let i = 0; i < 50; i++) {
            const sprinkle = document.createElement('div');
            sprinkle.className = 'sprinkle';
            sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sprinkle.style.left = Math.random() * 100 + 'vw';
            sprinkle.style.animationDelay = Math.random() * 2 + 's';
            sprinkle.style.animationDuration = (Math.random() * 2 + 2) + 's';

            confettiContainer.appendChild(sprinkle);

            // Clean up
            setTimeout(() => {
                if (confettiContainer.contains(sprinkle)) {
                    confettiContainer.removeChild(sprinkle);
                }
            }, 4000);
        }

        this.showNotification('🍩 Sprinkles everywhere! 🍩', 'success');
        this.playSound('chime');
    }

    setupDohSound() {
        // Create a simple D'oh! sound using Web Audio API
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playDohSound() {
        if (!this.audioContext) return;

        // Create a simple "D'oh!" sound effect
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 0.5);

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);

        this.showNotification("D'oh!", 'warning');
    }

    createHiddenDonuts() {
        // Add hidden clickable donuts around the page
        const donutPositions = [
            { top: '15%', left: '85%' },
            { top: '65%', left: '5%' },
            { top: '45%', left: '95%' },
            { top: '85%', left: '15%' }
        ];

        donutPositions.forEach((pos, index) => {
            const donut = document.createElement('div');
            donut.className = 'hidden-donut';
            donut.innerHTML = '🍩';
            donut.style.position = 'fixed';
            donut.style.top = pos.top;
            donut.style.left = pos.left;
            donut.style.fontSize = '1.5rem';
            donut.style.cursor = 'pointer';
            donut.style.opacity = '0.1';
            donut.style.transition = 'opacity 0.3s ease';
            donut.style.zIndex = '999';
            donut.setAttribute('aria-hidden', 'true');

            donut.addEventListener('mouseenter', () => {
                donut.style.opacity = '0.8';
            });

            donut.addEventListener('mouseleave', () => {
                donut.style.opacity = '0.1';
            });

            donut.addEventListener('click', () => {
                this.addSprinkleToRandomCard();
                donut.style.display = 'none';
            });

            document.body.appendChild(donut);
        });
    }

    addSprinkleToRandomCard() {
        const cards = document.querySelectorAll('.location-card');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];

        const sprinkle = document.createElement('div');
        sprinkle.innerHTML = '✨';
        sprinkle.style.position = 'absolute';
        sprinkle.style.top = Math.random() * 20 + 'px';
        sprinkle.style.right = Math.random() * 20 + 'px';
        sprinkle.style.fontSize = '1.2rem';
        sprinkle.style.animation = 'twinkle 2s ease-in-out infinite';
        sprinkle.setAttribute('aria-hidden', 'true');

        randomCard.style.position = 'relative';
        randomCard.appendChild(sprinkle);

        // Add twinkle animation
        if (!document.getElementById('twinkle-styles')) {
            const style = document.createElement('style');
            style.id = 'twinkle-styles';
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    activateSeason1Theme() {
        document.body.classList.toggle('season-1-theme');
        this.season1Active = !this.season1Active;

        const message = this.season1Active
            ? 'Season 1 theme activated! Welcome to 1989!'
            : 'Back to modern Springfield!';

        this.showNotification(message, 'success');
        this.playSound('achievement');
    }

    // Accessibility Features
    createAriaLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';

        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '6px';
        skipLink.style.background = 'var(--text-dark)';
        skipLink.style.color = 'var(--text-light)';
        skipLink.style.padding = '8px';
        skipLink.style.borderRadius = '4px';
        skipLink.style.textDecoration = 'none';
        skipLink.style.zIndex = '9999';

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add target for skip link
        document.querySelector('.dashboard').id = 'main-content';
    }

    createAccessibilityControls() {
        const controls = document.createElement('div');
        controls.className = 'accessibility-controls';
        controls.style.position = 'fixed';
        controls.style.top = '10px';
        controls.style.left = '10px';
        controls.style.zIndex = '1001';
        controls.style.display = 'flex';
        controls.style.gap = '0.5rem';

        const contrastBtn = document.createElement('button');
        contrastBtn.textContent = 'High Contrast';
        contrastBtn.className = 'accessibility-btn';
        contrastBtn.setAttribute('aria-label', 'Toggle high contrast mode');
        contrastBtn.style.background = 'var(--text-dark)';
        contrastBtn.style.color = 'var(--text-light)';
        contrastBtn.style.border = 'none';
        contrastBtn.style.padding = '0.5rem';
        contrastBtn.style.borderRadius = '4px';
        contrastBtn.style.fontSize = '0.8rem';
        contrastBtn.style.cursor = 'pointer';

        contrastBtn.addEventListener('click', () => this.toggleHighContrast());

        controls.appendChild(contrastBtn);
        return controls;
    }

    toggleHighContrast() {
        this.highContrastMode = !this.highContrastMode;
        document.body.classList.toggle('high-contrast', this.highContrastMode);

        const message = this.highContrastMode
            ? 'High contrast mode enabled'
            : 'High contrast mode disabled';

        this.announceToScreenReader(message);
        this.saveUserPreference('highContrast', this.highContrastMode);
    }

    setupFocusTrap() {
        // Ensure focus stays within modals when they're open
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.modal.active');
            if (!modal || e.key !== 'Tab') return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        });
    }

    // Modal Management
    setupModal() {
        // Close modals when clicking outside or pressing Escape
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });
    }

    showHelpModal() {
        const existingModal = document.getElementById('help-modal');
        if (existingModal) {
            existingModal.classList.add('active');
            existingModal.querySelector('.modal-close').focus();
            return;
        }

        // Help modal is already in HTML, just show it
        const helpModal = document.getElementById('help-modal');
        helpModal.classList.add('active');
        helpModal.querySelector('.modal-close').focus();

        helpModal.querySelector('.modal-close').addEventListener('click', () => {
            helpModal.classList.remove('active');
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Performance Optimizations
    startPerformanceOptimizations() {
        // Lazy load images (for future use)
        this.setupLazyLoading();

        // Throttle scroll events
        this.setupScrollThrottling();

        // Preload critical resources
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupScrollThrottling() {
        let ticking = false;

        const updateScrollPosition = () => {
            // Update any scroll-dependent animations here
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        });
    }

    preloadCriticalResources() {
        // Preload any critical resources
        const preloadLinks = [
            // Add any critical resources here
        ];

        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'image'; // or 'font', 'audio', etc.
            document.head.appendChild(link);
        });
    }

    pauseAnimations() {
        document.body.classList.add('paused-animations');
    }

    resumeAnimations() {
        document.body.classList.remove('paused-animations');
    }

    handleResize() {
        // Handle any resize-specific optimizations
        this.announceToScreenReader('Page layout updated for new screen size');
    }

    // Utility Functions
    spinSeal() {
        const seal = document.querySelector('.springfield-seal');
        seal.style.animation = 'none';
        seal.offsetHeight; // Trigger reflow
        seal.style.animation = 'spin 1s ease-in-out';

        setTimeout(() => {
            seal.style.animation = '';
        }, 1000);

        this.playSound('whoosh');
    }

    playLocationSound(location) {
        // Play location-specific sounds
        const soundMap = {
            'simpsons-house': 'doorbell',
            'elementary': 'school-bell',
            'power-plant': 'nuclear-alert',
            'channel-6': 'news-jingle',
            'moes-tavern': 'cash-register',
            'kwik-e-mart': 'scanner-beep'
        };

        const sound = soundMap[location] || 'click';
        this.playSound(sound);
    }

    playSound(soundType) {
        // Simple sound generation using Web Audio API
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const soundSettings = {
            click: { freq: 800, duration: 0.1 },
            chime: { freq: 659.25, duration: 0.3 },
            whoosh: { freq: 440, duration: 0.5 },
            achievement: { freq: 523.25, duration: 0.8 }
        };

        const setting = soundSettings[soundType] || soundSettings.click;

        oscillator.frequency.setValueAtTime(setting.freq, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + setting.duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + setting.duration);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const styles = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            border: '2px solid var(--text-dark)',
            fontWeight: '600',
            zIndex: '1000',
            boxShadow: 'var(--card-shadow)',
            animation: 'slideInRight 0.3s ease-out'
        };

        Object.assign(notification.style, styles);

        const typeColors = {
            success: { bg: 'var(--simpson-green)', color: 'var(--text-dark)' },
            warning: { bg: 'var(--simpson-orange)', color: 'var(--text-light)' },
            error: { bg: 'var(--simpson-red)', color: 'var(--text-light)' },
            info: { bg: 'var(--simpson-blue)', color: 'var(--text-light)' }
        };

        const colors = typeColors[type] || typeColors.info;
        notification.style.background = colors.bg;
        notification.style.color = colors.color;

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);

        // Add slide animations if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    trackInteraction(action, location) {
        // Analytics tracking (would integrate with real analytics in production)
        console.log(`User interaction: ${action} on ${location}`);

        // Could integrate with Google Analytics, Mixpanel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'Springfield Dashboard',
                event_label: location
            });
        }
    }

    // User Preferences
    saveUserPreference(key, value) {
        try {
            localStorage.setItem(`springfield_${key}`, JSON.stringify(value));
        } catch (e) {
            console.log('LocalStorage not available');
        }
    }

    loadUserPreferences() {
        try {
            const highContrast = localStorage.getItem('springfield_highContrast');
            if (highContrast) {
                this.highContrastMode = JSON.parse(highContrast);
                document.body.classList.toggle('high-contrast', this.highContrastMode);
            }

            const season1 = localStorage.getItem('springfield_season1Theme');
            if (season1) {
                this.season1Active = JSON.parse(season1);
                document.body.classList.toggle('season-1-theme', this.season1Active);
            }
        } catch (e) {
            console.log('Error loading user preferences');
        }
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.springfieldDashboard = new SpringfieldDashboard();

    // Add some final polish
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Service Worker registration for offline functionality (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}