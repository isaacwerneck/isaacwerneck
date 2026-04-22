// Add interactivity if needed
// Example: Simple gallery click event

document.addEventListener('DOMContentLoaded', function() {
    // Minimal, modern console greeting
    console.log('%cDungeon4Fun', 'color: #ffe066; font-size: 2.2em; font-weight: bold; background: #23242b; padding: 0.2em 0.7em; border-radius: 8px;');
    console.log('%cA top-down, wave-based action roguelite.', 'color: #bdbdbd; font-size: 1.1em; background: #181a20; padding: 0.1em 0.5em; border-radius: 6px;');

    // Gallery image click: show info
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            alert('This is a placeholder. Replace with your Dungeon4Fun screenshots or GIFs!');
        });
    });

    // Surprise section: fun interaction
    const surpriseBox = document.querySelector('.surprise-box');
    if (surpriseBox) {
        surpriseBox.addEventListener('mouseenter', () => {
            surpriseBox.style.background = '#23242b';
            surpriseBox.style.color = '#fff';
            surpriseBox.innerHTML = '<b>Hint:</b> Dev mode unlocks special debug features!';
        });
        surpriseBox.addEventListener('mouseleave', () => {
            surpriseBox.style.background = '#181a20';
            surpriseBox.style.color = '#ffe066';
            surpriseBox.innerHTML = 'Dungeon4Fun has a secret dev mode! (Try pressing <b>Ctrl+Shift+D</b> in-game for a surprise.)';
        });
    }
});
