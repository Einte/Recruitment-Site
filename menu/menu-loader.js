
// fetch the header.html
document.addEventListener("DOMContentLoaded", () => {
    const navAnchor = document.getElementById('universal-nav-anchor');
    if (navAnchor) {
        // If we are at the root, use ./header/header.html
        // If we are in a subfolder, use ../header/header.html
        const path = window.location.pathname.split('/').filter(Boolean).length > 1 
            ? '../header/header.html' 
            : './header/header.html';

        fetch(path)
            .then(res => res.text())
            .then(data => {
                navAnchor.innerHTML = data;
                document.dispatchEvent(new CustomEvent('headerLoaded'));
            });
    }
});

// Add this to your existing theme.js
document.addEventListener("change", (e) => {
    if (e.target && e.target.id === 'themeCheckbox') {
        const isLight = e.target.checked;

        // 1. Explicitly set the body class
        if (isLight) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }

        // 2. Update Label
        const label = document.getElementById('toggleLabel');
        if (label) {
            label.textContent = isLight ? "Light" : "Dark";
        }
    }
});