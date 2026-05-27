
// The dark mode system was implemented using JavaScript event listeners and localStorage
//  persistence. When users interact with the theme toggle switch, the website 
// dynamically updates the body class styling and stores the selected preference 
// locally within the browser. This allows the chosen theme mode to remain active even 
// after page refreshes or browser restarts. Dynamic label updates were also implemented 
// to improve user feedback and interface interaction.
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

document.addEventListener("DOMContentLoaded", () => {
    const navAnchor = document.getElementById('universal-nav-anchor');
    if (navAnchor) {
        const path = window.location.pathname.split('/').filter(Boolean).length > 1
            ? '/NewRecruitmentWebsite/header/index.html'
            : './header/index.html';
        fetch(path)
            .then(res => res.text())
            .then(data => {

                navAnchor.innerHTML = data;

                // HEADER FINISHED LOADING
                document.dispatchEvent(new CustomEvent('headerLoaded'));

                // FETCH DOME MENU
                const domeAnchor = document.getElementById("dome-menu-anchor");

                if (domeAnchor) {

                    const domePath = window.location.pathname.split('/').filter(Boolean).length > 1
                        ? '../the-dome-menu/index.html'
                        : './the-dome-menu/index.html';

                    fetch(domePath)
                        .then(res => res.text())
                        .then(menuData => {

                            domeAnchor.innerHTML = menuData;

                            // DOME MENU FINISHED LOADING
                            document.dispatchEvent(new CustomEvent('domeLoaded'));

                        });

                }

            });

    }

});