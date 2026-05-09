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

// Function to update the UI
function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('currentTheme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('currentTheme', 'light');
    }
}

// Check saved theme immediately so the screen doesn't "flash" white/dark
const savedTheme = localStorage.getItem('currentTheme');
if (savedTheme === 'light') {
    applyTheme(false);
} else {
    applyTheme(true);
}

async function checkSmartTheme() {
    // 1. Get User Location
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
            // 2. Fetch Weather & Sun Data
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            const data = await response.json();

            const currentTime = Math.floor(Date.now() / 1000);
            const isPastSunset = currentTime > data.sys.sunset || currentTime < data.sys.sunrise;
            const isCloudyOrRainy = data.clouds.all > 70 || data.weather[0].main === "Rain";

            // 3. Logic: Go dark if it's night OR if it's very cloudy/rainy
            if (isPastSunset || isCloudyOrRainy) {
                console.log("Smart System: Setting Dark Mode (Night/Clouds)");
                applyTheme(true);
            } else {
                console.log("Smart System: Setting Light Mode (Daylight)");
                applyTheme(false);
            }
        } catch (error) {
            console.error("Weather System Offline:", error);
        }
    }, (error) => {
        console.warn("Location blocked. Defaulting to Dark Mode.");
        applyTheme(true);
    });
}

// Run on page load
checkSmartTheme();

// Manual toggle still works if the user wants to override
toggleBtn.addEventListener('click', () => {
    const currentlyDark = !body.classList.contains('light-mode');
    applyTheme(!currentlyDark); 
});