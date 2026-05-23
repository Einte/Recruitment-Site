// js/theme-manager.js
document.addEventListener("DOMContentLoaded", () => {
    // Use Event Delegation to watch for the checkbox
    document.addEventListener("change", (e) => {
        if (e.target && e.target.id === 'themeCheckbox') {
            const isChecked = e.target.checked;
            const label = document.getElementById('toggleLabel');
            
            if (isChecked) {
                document.body.classList.add('light-mode');
                if (label) label.textContent = "Light";
            } else {
                document.body.classList.remove('light-mode');
                if (label) label.textContent = "Dark";
            }
        }
    });
});


// js/theme.js
(function() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    
    // Apply immediately to body
    document.body.classList.toggle("light-mode", savedTheme === "light");

    const enforceState = () => {
        const checkbox = document.getElementById("themeCheckbox");
        if (checkbox) {
            checkbox.checked = (localStorage.getItem("theme") === "light");
        }
    };

    // Run once on load
    enforceState();

    // Run when header arrives
    document.addEventListener("headerLoaded", enforceState);

    // "The Guard": If something tries to flip the switch within 1 second, force it back
    let attempts = 0;
    const interval = setInterval(() => {
        enforceState();
        attempts++;
        if (attempts > 10) clearInterval(interval);
    }, 100);
})();