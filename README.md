# Springfield Control Center

A fully immersive dashboard website set in the fictional universe of The Simpsons, designed as a Springfield town control center.

## Features

### Visual Design
- **Simpsons-inspired aesthetic**: Bright cartoon colors with bold outlines and flat 2D design
- **Animated parallax clouds**: Floating background animations
- **Responsive grid layout**: 3-4 columns (desktop), 2 (tablet), 1 (mobile)
- **Custom location cards**: Each representing iconic Springfield locations

### Interactive Elements
- **Search functionality**: "Search this town" with live filtering
- **Filter chips**: Episodes, Characters, Locations, Lore, Games
- **Location cards**: Clickable cards with hover animations and speech bubbles
- **Springfield seal**: Animated town seal in navigation

### Easter Eggs & Humor
- **Donut button**: Click for sprinkle confetti animation
- **D'oh! sound**: Press 'D' key for Homer's famous exclamation
- **Hidden donuts**: Find and click for UI sprinkles
- **Konami code**: Activates retro season-1 theme
- **Spinning seal**: Click the Springfield seal for animation

### Accessibility Features
- **Keyboard navigation**: Full keyboard support with shortcuts
- **Screen reader support**: ARIA labels and live regions
- **High contrast mode**: Toggle for improved visibility
- **Focus management**: Proper focus trapping and skip links
- **Responsive design**: Works on all device sizes

### Keyboard Shortcuts
- `/` - Focus search bar
- `1-6` - Jump to location cards
- `D` - Play D'oh! sound
- `?` - Show help modal
- `Esc` - Close modals
- `Tab` - Navigate elements
- **Konami Code** - Secret season 1 theme

## Springfield Locations

### 742 Evergreen Terrace
The iconic Simpson family home with endless couch gags and infinite donuts consumed.

### Springfield Elementary
Where learning happens... sometimes. Features Principal Skinner and questionable lunch quality.

### Springfield Nuclear Power Plant
Mr. Burns' nuclear facility with a C- safety rating but adequate power output.

### Channel 6 News
Springfield's most trusted news source with 67% accuracy rating.

### Moe's Tavern
Where everybody knows your shame. Features Duff on tap and 847+ prank calls.

### Kwik-E-Mart
Your one-stop shop for everything expired, with hot dogs rotating since 1987.

## Technical Features
- **Performance optimized**: Lazy loading, throttled events, visibility API
- **Web Audio API**: Dynamic sound generation for easter eggs
- **Local Storage**: Saves user preferences
- **Intersection Observer**: Efficient lazy loading
- **CSS Grid & Flexbox**: Modern responsive layout
- **CSS Custom Properties**: Consistent theming
- **Animation optimizations**: Respects `prefers-reduced-motion`

## Browser Support
- Modern browsers with ES6+ support
- Progressive enhancement for older browsers
- Graceful fallbacks for missing features

## Installation
1. Download all files to a directory
2. Open `index.html` in a web browser
3. Enjoy exploring Springfield!

## File Structure
```
Springfield/
├── index.html      # Main HTML structure
├── styles.css      # Complete CSS styling and animations
├── script.js       # JavaScript functionality and interactions
└── README.md       # Project documentation
```

## Credits
Created as an affectionate parody of The Simpsons™. Not affiliated with Fox Broadcasting Company.

Made with ❤️ and 🍩 in the spirit of 700+ episodes of comedy gold.

*"D'oh!" - Homer Simpson*