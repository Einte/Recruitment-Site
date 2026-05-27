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

// Check for body structural existence immediately or delay to DOM tree mount
if (document.body) {
    applyInitialTheme();
} else {
    document.addEventListener("DOMContentLoaded", applyInitialTheme);
}

// Sync interactive theme switch behaviors if explicitly on page context
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

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ALL ELEMENTS ONCE
    const genBtn = document.getElementById('preview-btn');
    const fileInput = document.getElementById("inCvUpload"); // Make sure this matches HTML ID
    const inputs = document.querySelectorAll('#application-form input[required]');
    const scanBtn = document.getElementById('startActionBtn'); // Check this ID matches HTML
    const video = document.getElementById('liveWebcam');
    const status = document.getElementById('statusBoxPane');
    const laser = document.querySelector('.laser-scanner-line');
    const photo = document.getElementById('freezeFrameCapture');
    const canvas = document.getElementById('snapshotCanvas');
    
    let fileImageData = null;

    // 2. FORM VALIDATION
    function checkForm() {
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value.trim()) allFilled = false;
        });
        if (genBtn) {
            genBtn.disabled = !allFilled;
            genBtn.style.opacity = allFilled ? "1" : "0.3";
        }
    }
    inputs.forEach(input => input.addEventListener('input', checkForm));

    // 3. FILE PREVIEW
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const zoneText = document.getElementById('uploadFileLabel');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                if (zoneText) zoneText.innerText = "READY: " + file.name;
                
                const reader = new FileReader();
                reader.onload = (e) => { fileImageData = e.target.result; };
                reader.readAsDataURL(file);
            }
        });
    }

    // 4. CAMERA SCAN
    if (scanBtn) {
        scanBtn.onclick = async function() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                video.style.display = "block";
                status.innerText = "SYSTEM: SCANNING...";
                laser.style.display = "block";

                setTimeout(() => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    photo.src = canvas.toDataURL('image/png');
                    photo.style.display = "block";
                    laser.style.display = "none";
                    status.innerText = "SYSTEM: VERIFIED";
                    stream.getTracks().forEach(track => track.stop());
                }, 3000);
            } catch (error) {
                status.innerText = "ERROR: CAMERA BLOCKED";
            }
        };
    }


    // --- 5. GENERATE CARD LOGIC ---
    genBtn.onclick = function() {
        // Sync User Info
        const first = document.getElementById('first-name-field').value;
        const last = document.getElementById('last-name-field').value;
        const email = document.getElementById('email-field').value;

        document.getElementById('preview-name').innerText = `${first} ${last}`.toUpperCase();
        document.getElementById('preview-email').innerText = email;

        // Sync Document Data to Card
        const cardThumb = document.getElementById('card-file-visual');
        const cardFileNameDisplay = document.getElementById('preview-file');

        if (fileInput.files.length > 0 && fileImageData) {
            // Update the small image on the card
            cardThumb.style.display = "block";
            cardThumb.style.backgroundImage = `url(${fileImageData})`;
            cardThumb.style.backgroundSize = "cover";
            
            // Update the file name text
            cardFileNameDisplay.innerText = fileInput.files[0].name;
            cardFileNameDisplay.style.color = "#38bdf8";
        }
        
        // Scroll to the card preview
        document.getElementById('card-preview-section').scrollIntoView({ behavior: 'smooth' });
    };
});

// ==========================================
// 3. AUTO CONTROL FILL TRACK ROUTERS
// ==========================================
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

// ==========================================
// 4. GENERATE STATUS PRINTER COMPILATION ENGINE
// ==========================================
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

// ==========================================
// 5. VIEWPORT SUBMISSION MODAL & CELEBRATION ENGINE
// ==========================================
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
            particleTimerInterval = setInterval(spawnFullscreenSprinkle, 20);
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

// ==========================================
// 6. CONTACT MODULE TRANSMISSION HANDLERS
// ==========================================
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