/* =====================================================

   FEATURE: DOME MENU ENGINE

   PURPOSE:
   Loads and controls the mobile dome menu.

   RESPONSIBILITIES:
   - Load dome-menu.html
   - Inject menu into page
   - Open menu
   - Close menu
   - Animate logo

   DEPENDENCIES:
   - dome-menu.html
   - dome-menu.css

   OWNER:
   the-dome-menu/

===================================================== */

/* =====================================================
   START ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", loadDomeMenu);

/* =====================================================
   LOAD DOME MENU
===================================================== */

async function loadDomeMenu() {
  const domeMenuMount = document.getElementById("dome-menu-mount");

  if (!domeMenuMount) {
    console.error("DOME MENU MOUNT NOT FOUND");

    return;
  }

  try {
    const response = await fetch("/Features/the-dome-menu/dome-menu.html");

    if (!response.ok) {
      throw new Error("DOME MENU LOAD FAILED");
    }

    const domeMenuHtml = await response.text();

    domeMenuMount.innerHTML = domeMenuHtml;

    console.log("DOME MENU LOADED");

    initialiseDomeMenu();
  } catch (error) {
    console.error(error);
  }
}

/* =====================================================
   INITIALISE MENU
===================================================== */

function initialiseDomeMenu() {
  const domeToggle = document.getElementById("domeToggle");

  const domeMenu = document.getElementById("domeMenu");

  const navLogo = document.querySelector(".nav-logo");

  if (!domeToggle || !domeMenu) {
    console.error("DOME MENU ELEMENTS NOT FOUND");

    return;
  }

  domeToggle.addEventListener("click", toggleDomeMenu);

  function toggleDomeMenu() {
    domeMenu.classList.toggle("active");

    if (navLogo) {
      navLogo.classList.toggle("dome-open");
    }
  }
}