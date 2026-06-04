
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
        name: "Eva Rossi",
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


   