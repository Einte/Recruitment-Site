   // ── LIVE MEDIA HARDWARE CONTROLLER (STATE WORKFLOW MACHINE) ──
const liveVideo = document.getElementById('liveWebcam');
const camIcon = document.getElementById('camIcon');
const startScanBtn = document.getElementById('startActionBtn');
const snapshotCanvas = document.getElementById('snapshotCanvas');
const freezeFrameImg = document.getElementById('freezeFrameCapture');
const photoTxtPlaceholder = document.getElementById('photoTxt');
const camClosedMsg = document.getElementById('camClosedMsg');
const hardwareCol = document.getElementById('hardwareCol');

let cameraStream = null;
let currentWorkflowState = "IDLE"; // States: IDLE, STREAMING, SCANNING

async function engageCameraHardware() {
    try {
        camClosedMsg.style.display = "none";
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 400 }, audio: false });
        liveVideo.srcObject = cameraStream;
        liveVideo.style.display = "block";
        camIcon.style.display = "none";

        // Advance state tracker UI indicators
        currentWorkflowState = "STREAMING";
        startScanBtn.textContent = "Take a Photo";
        startScanBtn.classList.add('snap-mode');
    } catch (err) {
        console.error("Camera channel access error: ", err);
        camClosedMsg.style.display = "flex";
        camClosedMsg.textContent = "HARDWARE ERROR";
    }
}

if (startScanBtn) {
    startScanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentWorkflowState === "IDLE") {
            engageCameraHardware();
        }
        else if (currentWorkflowState === "STREAMING") {
            currentWorkflowState = "SCANNING";
            startScanBtn.textContent = "Scanning...";
            startScanBtn.disabled = true;
            hardwareCol.classList.add('is-active', 'is-scanning');

            // Hold scan line matrix sweep for exactly 1.5 seconds before shutter triggers
            setTimeout(() => {
                if (cameraStream && cameraStream.active && liveVideo.srcObject) {
                    const ctx = snapshotCanvas.getContext('2d');
                    ctx.drawImage(liveVideo, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

                    const dataUrl = snapshotCanvas.toDataURL('image/png');
                    freezeFrameImg.src = dataUrl;

                    photoTxtPlaceholder.style.display = 'none';
                    freezeFrameImg.style.display = 'block';

                    // Disconnect streams channels safely
                    cameraStream.getTracks().forEach(track => track.stop());
                    liveVideo.style.display = "none";
                    camIcon.style.display = "block";

                    camClosedMsg.style.display = "flex";
                    camClosedMsg.textContent = "SNAPSHOT RECORDED";
                    camClosedMsg.style.color = "#00d9ff";
                }

                // Reset button states back to idle workflow stack
                currentWorkflowState = "IDLE";
                startScanBtn.textContent = "Start Scan";
                startScanBtn.classList.remove('snap-mode');
                startScanBtn.disabled = false;
                hardwareCol.classList.remove('is-scanning');
            }, 1500);
        }
    });
}

// ── AUTO CONTROL FILL SELECTORS ──
function syncJobCode(jobTitle) {
    const jobCodeInput = document.getElementById('inJobCode');
    const jobRefInput = document.getElementById('inJobRef');

    if (!jobCodeInput || !jobRefInput) return;

    if (jobTitle === "Junior Web Developer") {
        jobCodeInput.value = "JWD-99x";
        jobRefInput.value = "REF-EDL-01";
    } else if (jobTitle === "Apprentice Infrastructure Engineer") {
        jobCodeInput.value = "AIE-44m";
        jobRefInput.value = "REF-EDL-02";
    } else if (jobTitle === "Database Operator") {
        jobCodeInput.value = "DBO-11z";
        jobRefInput.value = "REF-EDL-03";
    }
}

function updateFileLabel(input) {
    const label = document.getElementById('uploadFileLabel');
    if (label && input.files.length > 0) {
        label.textContent = `✓ ${input.files[0].name}`;
        label.style.borderColor = "#00d9ff";
        label.style.color = "#00d9ff";
    }
}

// ── GENERATE STATUS PRINTER ENGINE ──
const generateBtn = document.getElementById('generateActionBtn');
const statusBoxPane = document.getElementById('statusBoxPane');

if (generateBtn && statusBoxPane) {
    generateBtn.addEventListener('click', () => {
        const fName = document.getElementById('inFirstName').value.trim();
        const lName = document.getElementById('inLastName').value.trim();
        const phone = document.getElementById('inPhone').value.trim();
        const email = document.getElementById('inEmail').value.trim();
        const job = document.getElementById('inJobProvision').value;
        const code = document.getElementById('inJobCode').value;
        const ref = document.getElementById('inJobRef').value;

        if (!fName || !lName || !email || !job) {
            statusBoxPane.innerHTML = `<span class="status-title-lbl" style="color:#ef4444;">STATUS: SYSTEM PARAMETERS NULL</span><span style="color:#ef4444;">Complete necessary credentials before compiling status parameters report block.</span>`;
            return;
        }

        statusBoxPane.innerHTML = `
            <span class="status-title-lbl" style="color:#22c55e;">STATUS: DATA VERIFICATION ARMED</span>
            <strong>APPLICANT NAME:</strong> ${fName} ${lName}
            <strong>COMMS CHANNELS:</strong> TEL: ${phone} / E-MAIL: ${email}
            <strong>DEPLOYMENT TRACK:</strong> ${job} [${code}]
            <strong>ROUTER REFERENCE:</strong> ${ref}
            <strong>BIOMETRIC PAYLOAD:</strong> ${freezeFrameImg && freezeFrameImg.src ? "Screenshot Mounted" : "No Frame Captured"}
        `;
    });
}

// ── FAST VIEWPORT CELEBRATION SPRINKLE ENGINE ──
const submitAppBtn = document.getElementById('submitApplicationBtn');
const congratsOverlay = document.getElementById('congratsOverlay');
let particleTimerInterval = null;

if (submitAppBtn) {
    submitAppBtn.addEventListener('click', () => {
        const fName = document.getElementById('inFirstName').value.trim();
        const lName = document.getElementById('inLastName').value.trim();
        const email = document.getElementById('inEmail').value.trim();
        const job = document.getElementById('inJobProvision').value;

        if (!fName || !lName || !email || !job) {
            alert("Please complete fields and press Generate to establish application routing vectors.");
            return;
        }

        if (congratsOverlay) {
            congratsOverlay.classList.add('is-active');
            particleTimerInterval = setInterval(spawnFullscreenSprinkle, 50);
            setTimeout(() => { clearInterval(particleTimerInterval); }, 2500);
        }
    });
}

function spawnFullscreenSprinkle() {
    const colors = ['#22c55e', '#00d9ff', '#eab308', '#ec4899', '#a855f7', '#ff4d4d'];
    const sprinkle = document.createElement('div');
    sprinkle.classList.add('sprinkle');

    sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    sprinkle.style.left = Math.random() * 100 + 'vw';

    const driftDirection = Math.random() > 0.5 ? 1 : -1;
    sprinkle.style.setProperty('--drift-x', (Math.random() * 350 * driftDirection) + 'px');

    sprinkle.style.width = Math.random() * 6 + 6 + 'px';
    sprinkle.style.height = sprinkle.style.width;

    document.body.appendChild(sprinkle);
    setTimeout(() => { sprinkle.remove(); }, 2200);
}

function dismissCelebrationModal() {
    if (congratsOverlay) congratsOverlay.classList.remove('is-active');
    clearInterval(particleTimerInterval);
}

// ── CONTACT MODULE EXECUTION TRANSMISSION FORM ──
function handleMessageTransmission(event) {
    event.preventDefault();
    const popup = document.getElementById('transmissionSuccessPopup');
    const form = document.getElementById('secureContactForm');
    if (popup) popup.classList.add('show');
    if (form) form.reset();
}

function dismissPopupAlert() {
    const popup = document.getElementById('transmissionSuccessPopup');
    if (popup) popup.classList.remove('show');
}
