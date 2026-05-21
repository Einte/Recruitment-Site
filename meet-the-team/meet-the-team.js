  // ── MOBILE CONTAINER SIDEBAR TOGGLE HANDLERS ──
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


    // ── EXPANDED STAFF INTERFACE MAPPINGS DATA ARRAY ──
    const staffDatabase = [
      {
        name: "Alex Mercer",
        role: "Lead Infrastructure Director",
        status: "ACTIVE",
        statusCode: "status-active",
        desc: "Alex oversees the deployment of air-gapped system structures and modular edge setups. Specialized in hardware interposer deployment protocols and redundant array operations.",
        sysId: "SYS // NODE-09A1"
      },
      {
        name: "James Connor",
        role: "Database Security Administrator",
        status: "ACTIVE",
        statusCode: "status-active",
        desc: "Sarah maintains relational integrity mapping parameters and system access matrices. Expert in cross-platform relational verification algorithms and injection mitigation engines.",
        sysId: "SYS // NODE-44X9"
      },
      {
        name: "David Lightman",
        role: "Network Operations Engineer",
        status: "AWAY",
        statusCode: "status-away",
        desc: "David fields deployment vectors for local long-range radio telemetry components and physical line configurations. Investigating hardware routing attenuation limits.",
        sysId: "SYS // NODE-88R2"
      },
      {
        name: "Elena Rostova",
        role: "Backend Systems Architect",
        status: "ACTIVE",
        statusCode: "status-active",
        desc: "Elena manages micro-service routing patterns and secure transit relay modules. Tasked with developing low-latency execution interfaces and custom payload filtering routines.",
        sysId: "SYS // NODE-12C4"
      },
      {
        name: "Marcus Vance",
        role: "Systems Security Consultant",
        status: "ACTIVE",
        statusCode: "status-active",
        desc: "Marcus evaluates hardware perimeter integrity lines and conducts comprehensive network auditing configurations. Expert in identifying latent encryption attenuation errors.",
        sysId: "SYS // NODE-51F7"
      },
      {
        name: "Linus Carver",
        role: "Redundant Storage Engineer",
        status: "AWAY",
        statusCode: "status-away",
        desc: "Linus designs robust multi-drive storage pools using hardware mirror stripes and dynamic array topologies to assure uncompromised deployment record persistence.",
        sysId: "SYS // NODE-33K8"
      }
    ];

    function displayStaffNode(index, element) {
      document.querySelectorAll('.balloon-node-avatar').forEach(node => node.classList.remove('selected-active'));
      element.classList.add('selected-active');

      const person = staffDatabase[index];
      const selectedImgSrc = element.querySelector('img').src;

      document.getElementById('bubbleImg').src = selectedImgSrc;
      document.getElementById('bubbleName').innerText = person.name;
      document.getElementById('bubbleRole').innerText = person.role;
      document.getElementById('statusText').innerText = person.status;
      document.getElementById('bubbleDesc').innerText = person.desc;
      document.getElementById('bubbleFooter').innerText = person.sysId;

      const statusBox = document.getElementById('bubbleStatus');
      statusBox.className = "bubble-status " + person.statusCode;
    }


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
        circle.setAttribute('r', '2'); circle.setAttribute('fill', '#00d9ff');
        circle.setAttribute('opacity', '0.65');
        svg.appendChild(circle);
      });

      requestAnimationFrame(updateNetwork);
    }
    updateNetwork();