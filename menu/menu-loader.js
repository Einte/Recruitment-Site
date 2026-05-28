
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

// The dark mode system was implemented using JavaScript event listeners and localStorage
//  persistence. When users interact with the theme toggle switch, the website 
// dynamically updates the body class styling and stores the selected preference 
// locally within the browser. This allows the chosen theme mode to remain active even 
// after page refreshes or browser restarts. Dynamic label updates were also implemented 
// to improve user feedback and interface interaction.

document.addEventListener("DOMContentLoaded", () => 
    { const navAnchor = document.getElementById('universal-nav-anchor'); 
        if (navAnchor) { const path = window.location.pathname.split('/')
            .filter(Boolean).length > 1 ? '../header/index.html' : './header/index.html'; fetch(path) 
            .then(res => res.text()) 
            .then(data => { navAnchor.innerHTML = data; // HEADER FINISHED LOADING 
            document.dispatchEvent(new CustomEvent('headerLoaded')); // FETCH DOME MENU 
            const domeAnchor = document.getElementById("dome-menu-anchor"); if (domeAnchor) { const domePath = window.location.pathname.split('/').filter(Boolean).length > 1 ? '../the-dome-menu/index.html' : './the-dome-menu/index.html'; fetch(domePath) .then(res => res.text()) .then(menuData => { domeAnchor.innerHTML = menuData; // DOME MENU FINISHED LOADING 
            document.dispatchEvent(new CustomEvent('domeLoaded')); }); } }); } });