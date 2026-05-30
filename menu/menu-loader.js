document.addEventListener("DOMContentLoaded", async () => {

    console.log("MENU LOADER STARTED");

    const navAnchor = document.getElementById("universal-nav-anchor");

    if (!navAnchor) {
        console.error("NAV ANCHOR NOT FOUND");
        return;
    }

    try {

        // Load header
        const headerResponse = await fetch("../header/header.html");
        const headerHtml = await headerResponse.text();

        navAnchor.innerHTML = headerHtml;

        console.log("HEADER LOADED");

        // Find dome menu placeholder inside header
        const domeAnchor = document.getElementById("dome-menu-anchor");

        if (!domeAnchor) {
            console.error("DOME MENU ANCHOR NOT FOUND");
            return;
        }

        // Load dome menu
        const domeResponse = await fetch("../the-dome-menu/dome-menu.html");
        const domeHtml = await domeResponse.text();

        domeAnchor.innerHTML = domeHtml;

        console.log("DOME MENU LOADED");

        // Attach click handler
        const domeToggle = document.getElementById("domeToggle");
        const domeMenu = document.getElementById("domeMenu");
        const navBrand = document.querySelector(".nav-brand");

        if (!domeToggle || !domeMenu) {
            console.error("DOME MENU ELEMENTS NOT FOUND");
            return;
        }
            domeToggle.addEventListener("click", () => {
                domeMenu.classList.toggle("active");

    if (navBrand) {
        navBrand.classList.toggle("dome-open");
    }

});

        console.log("DOME MENU INITIALISED");

    } catch (err) {

        console.error("MENU LOADER ERROR:", err);

    }

});

const domeToggle = document.getElementById("domeToggle");
const domeMenu = document.getElementById("domeMenu");
const navBrand = document.querySelector(".nav-brand");

domeToggle.addEventListener("click", () => {

    domeMenu.classList.toggle("active");

    if(navBrand){
        navBrand.classList.toggle("dome-open");
    }

});