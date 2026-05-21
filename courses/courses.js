      const themeCheckbox = document.getElementById('themeCheckbox');
        const toggleLabel = document.getElementById('toggleLabel');

        // Function to set up light theme values
        function enableLightTheme() {
            document.body.classList.add('light-mode');
            toggleLabel.textContent = "Light";
            themeCheckbox.checked = true;
            nodeFillColor = '#16a34a';  
            lineStrokeColor = '#475569'; 
        }

        // Function to set up dark theme values
        function enableDarkTheme() {
            document.body.classList.remove('light-mode');
            toggleLabel.textContent = "Dark";
            themeCheckbox.checked = false;
            nodeFillColor = '#22c55e';
            lineStrokeColor = '#00d9ff';
        }

        // Check local storage state immediately on layout load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || document.documentElement.classList.contains('light-mode-init')) {
            enableLightTheme();
            // Clean up initialization class
            document.documentElement.classList.remove('light-mode-init');
        } else {
            enableDarkTheme();
        }

        // Event listener for switch toggles
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                enableLightTheme();
                localStorage.setItem('theme', 'light');
            } else {
                enableDarkTheme();
                localStorage.setItem('theme', 'dark');
            }
        });


   
        // ── MOBILE SIDEBAR INTERACTION SYSTEMS ──
        const masterHubBtn = document.getElementById('masterHubBtn');
        const mobileSidebar = document.getElementById('mobileSidebar');
        const menuOverlay = document.getElementById('menuOverlay');

        function toggleMobileMenu() {
            masterHubBtn.classList.toggle('is-active');
            mobileSidebar.classList.toggle('is-open');
            menuOverlay.classList.toggle('is-open');
        }
        masterHubBtn.addEventListener('click', toggleMobileMenu);
        menuOverlay.addEventListener('click', toggleMobileMenu);


        // ── UNIFORM PLEXUS BACKGROUND NETWORK ENGINE ──
        const svg = document.getElementById('plexusSVG');
        let width = window.innerWidth;
        let height = window.innerHeight;
        const totalNodes = 80;
        const nodes = [];

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
        }

        for (let i = 0; i < totalNodes; i++) {
            nodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7
            });
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function updateNetwork() {
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x <= 0 || n.x >= width) n.vx *= -1;
                if (n.y <= 0 || n.y >= height) n.vy *= -1;
            });

            svg.innerHTML = '';

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
                    if (dist < 120) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', nodes[i].x); line.setAttribute('y1', nodes[i].y);
                        line.setAttribute('x2', nodes[j].x); line.setAttribute('y2', nodes[j].y);
                        line.setAttribute('stroke', 'rgba(200, 245, 255, 0.45)');
                        line.setAttribute('opacity', (1 - (dist / 150)) * 0.4);
                        svg.appendChild(line);
                    }
                }
            }

            nodes.forEach(n => {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y);
                circle.setAttribute('r', '2.5'); circle.setAttribute('fill', '#00d9ff');
                circle.setAttribute('opacity', '0.65');
                svg.appendChild(circle);
            });

            requestAnimationFrame(updateNetwork);
        }
        updateNetwork();