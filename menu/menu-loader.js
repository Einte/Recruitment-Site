
// fetch the header.html
document.addEventListener("DOMContentLoaded", () => {
    const navAnchor = document.getElementById('universal-nav-anchor');
    if (navAnchor) {
        // Logic: 
        // 1. If we are at root, use './header/header.html'
        // 2. If we are in a subfolder (like /apply/), use '../header/header.html'
        const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        const headerPath = isRoot ? './header/header.html' : '../header/header.html';

        fetch(headerPath)
            .then(response => response.text())
            .then(data => {
                navAnchor.innerHTML = data;
                document.dispatchEvent(new CustomEvent('headerLoaded'));
            })
            .catch(err => console.error('Menu Loader Error:', err));
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