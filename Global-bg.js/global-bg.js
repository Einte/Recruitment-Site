// 1. SAFE INITIAL CHECK: Wait until the HTML structure is parsed enough to find the body
window.addEventListener("html_structure_ready", () => {
    // This fires as soon as the body tag exists, preventing the white flash
});

// A bulletproof approach: Check for body existence immediately or wait for DOM
function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
}

// If body is already parsed, run it, otherwise wait for the DOM to load
if (document.body) {
    applyInitialTheme();
} else {
    document.addEventListener("DOMContentLoaded", applyInitialTheme);
}

// 2. BIND THE SWITCH SWITCH TOGGLE BEHAVIOR
document.addEventListener("DOMContentLoaded", () => {
    const themeCheckbox = document.getElementById("themeCheckbox");
    const toggleLabel = document.getElementById("toggleLabel");

    if (!themeCheckbox) return; // Safely exit if the toggle container isn't on this page

    // Sync switch state visually with saved preferences
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        themeCheckbox.checked = true;
        if (toggleLabel) toggleLabel.textContent = "Light";
    } else {
        themeCheckbox.checked = false;
        if (toggleLabel) toggleLabel.textContent = "Dark";
    }

    // Interactive change listener
    themeCheckbox.addEventListener("change", () => {
        if (themeCheckbox.checked) {
            document.body.classList.add("light-mode");
            if (toggleLabel) toggleLabel.textContent = "Light";
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-mode");
            if (toggleLabel) toggleLabel.textContent = "Dark";
            localStorage.setItem("theme", "dark");
        }
    });
});


// Minimal standalone canvas node loop animation engine
document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("plexusSVG");
    if (!svg) return;

    const nodes = [];
    const nodeCount = 800;
    const maxDistance = 330;

    function resize() {
        // Set actual structural attributes as well as viewBox for clean rendering
        svg.setAttribute("width", window.innerWidth);
        svg.setAttribute("height", window.innerHeight);
        svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    }
    window.addEventListener("resize", resize);
    resize();

    // 1. Spawn layout node configurations (Fixed the cut-off here)
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 1.2, // Left/Right speed vectors
            vy: (Math.random() - 0.5) * 1.2  // Up/Down speed vectors
        });
    }

    // 2. The Animation Core Logic Loop
    function updateAnimation() {
        // Clear previous frame vectors completely
        svg.innerHTML = "";

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Move nodes and draw points
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off boundaries seamlessly
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            // Render node particle points
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", node.x);
            circle.setAttribute("cy", node.y);
            circle.setAttribute("r", "4");
            circle.setAttribute("fill", "rgb(255, 0, 0)"); // Matches your green theme matrix accent
            svg.appendChild(circle);
        });

        // Draw interactive plexus line matrix web connectors
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Draw a connection if particles are close together
                if (distance < maxDistance) {
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", nodes[i].x);
                    line.setAttribute("y1", nodes[i].y);
                    line.setAttribute("x2", nodes[j].x);
                    line.setAttribute("y2", nodes[j].y);
                    
                    // Fade out lines smoothly the further apart the nodes drift
                    const opacity = (1 - distance / maxDistance) * 0.25;
                    line.setAttribute("stroke", `rgba(34, 197, 94, ${opacity})`);
                    line.setAttribute("stroke-width", "2");
                    svg.appendChild(line);
                }
            }
        }

        requestAnimationFrame(updateAnimation);
    }

    // Fire engine loop execution
    requestAnimationFrame(updateAnimation);
});