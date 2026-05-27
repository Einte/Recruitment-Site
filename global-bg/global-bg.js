
// GLOBAL BACKGROUND PLEXUS 
// ==========================================
// 1. BULLETPROOF THEME ENGINE (Anti-Flash)
// ==========================================
function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
}

// Intercept early configuration tracking safely
if (document.body) {
    applyInitialTheme();
} else {
    document.addEventListener("DOMContentLoaded", applyInitialTheme);
}

// Bind interactive switch behaviors
document.addEventListener("DOMContentLoaded", () => {
    const themeCheckbox = document.getElementById("themeCheckbox");
    const toggleLabel = document.getElementById("toggleLabel");

    if (!themeCheckbox) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        themeCheckbox.checked = true;
        if (toggleLabel) toggleLabel.textContent = "Light";
    } else {
        themeCheckbox.checked = false;
        if (toggleLabel) toggleLabel.textContent = "Dark";
    }

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

// ==========================================
// 2. HIGH-PERFORMANCE PLEXUS MATRIX RENDERER
// ==========================================
// Assuming nodes, svg, width, height, anthis d maxDistance are defined globally in your main framework loop:

function renderPlexusTick() {
    // FIX 1: Flush old structural layers cleanly to eliminate DOM accumulation leaks
    svg.innerHTML = ""; 

    // FIX 2: Cache the raw RGB variable ONCE per frame loop instead of thousands of times inside the nested calculations
    const currentStroke = getComputedStyle(document.body).getPropertyValue('--plexus-stroke').trim() || "255, 255, 255;";

    // Step A: Move nodes and draw points
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Render live node particle points
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", "4");
        
        // Inherits CSS tokens dynamically without tracking layout properties manually
        circle.setAttribute("fill", "var(--plexus-node)"); 
        svg.appendChild(circle);
    });

    // Step B: Draw interactive plexus line matrix web connectors
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
                
                // FIX 3: Uses the single cached execution value pulled from the top level frame tick context
                line.setAttribute("stroke", `rgba(${currentStroke}, ${opacity})`);
                line.setAttribute("stroke-width", "2");
                svg.appendChild(line);
            }
        }
    }
}

// js/global-bg.js (Initialization Logic)
let svg, nodes = [], width, height, maxDistance = 150;

function initPlexus() {
    svg = document.getElementById('plexusSVG');
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Create particles
    for (let i = 0; i < 40; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    // Start animation loop
    function animate() {
        renderPlexusTick();
        requestAnimationFrame(animate);
    }
    animate();
}

window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
});


// Wait for both the DOM AND the header injection
document.addEventListener("headerLoaded", () => {
    const canvas = document.getElementById('plexusSVG');
    if (canvas) {
        initPlexus(); // Call your initialization function
    }
});