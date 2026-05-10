// --- MOBILE MENU TOGGLE ---
const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menu) {
    menu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menu.classList.toggle('is-active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- IMAGE SLIDER SCRIPT ---
let currentIndex = 0;

function moveSlide(direction) {
    const track = document.getElementById('hero-slider'); 
    const slides = document.querySelectorAll('.slide-link');
    
    if (!track || slides.length === 0) return; // Safety check

    const totalSlides = slides.length;
    currentIndex += direction;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);

// Dark Mode, Toggle, Weather API, location.
const toggleBtn = document.querySelector('#dark-mode-toggle');
const body = document.body;
const apiKey = '849b7f075fd31c8fbe59e21a89821f43'; 

// Function to update the UI and Save State
function applyTheme(isDark) {
    if (isDark) {
        body.classList.remove('light-mode');
        localStorage.setItem('currentTheme', 'dark');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('currentTheme', 'light');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 1. IMMEDIATE CHECK: Apply saved theme from LocalStorage right away
const savedTheme = localStorage.getItem('currentTheme');
if (savedTheme) {
    applyTheme(savedTheme === 'dark');
} else {
    // If no manual choice exists yet, run the Smart Logic
    checkSmartTheme();
}

async function checkSmartTheme() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            const data = await response.json();

            const currentTime = Math.floor(Date.now() / 1000);
            const isPastSunset = currentTime > data.sys.sunset || currentTime < data.sys.sunrise;
            const isCloudyOrRainy = data.clouds.all > 70 || data.weather[0].main === "Rain";

            // Only auto-apply if the user hasn't made a manual choice in this session
            if (isPastSunset || isCloudyOrRainy) {
                applyTheme(true);
            } else {
                applyTheme(false);
            }
        } catch (error) {
            console.error("Weather System Offline:", error);
        }
    }, (error) => {
        // Fallback if location is denied
        if (!localStorage.getItem('currentTheme')) applyTheme(true);
    });
}

// 2. MANUAL OVERRIDE: This saves the choice to LocalStorage for all pages
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const currentlyDark = !body.classList.contains('light-mode');
        applyTheme(!currentlyDark); 
    });
}