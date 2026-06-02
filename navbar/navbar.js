/* =====================================================

   FEATURE: MAIN NAVBAR ENGINE

   PURPOSE:
   Load and control the Main Navbar.

===================================================== */

const SITE_ROOT =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost"
        ? ""
        : "/Recruitment-Site";

document.addEventListener(
    "DOMContentLoaded",
    loadNavbar
);

async function loadNavbar() {

    const navbarMount =
        document.getElementById(
            "navbar-mount"
        );

    if (!navbarMount) {

        console.error(
            "NAVBAR MOUNT NOT FOUND"
        );

        return;

    }

    try {

        const response =
            await fetch(
                `${SITE_ROOT}/navbar/navbar.html`
            );

        if (!response.ok) {

            throw new Error(
                "NAVBAR LOAD FAILED"
            );

        }

        navbarMount.innerHTML =
            await response.text();

        console.log(
            "NAVBAR LOADED"
        );

        highlightActivePage();

    }

    catch (error) {

        console.error(
            error
        );

    }

}

function highlightActivePage() {

    const currentPage =
        window.location.pathname;

    const navigationLinks =
        document.querySelectorAll(
            ".main-navbar-links a"
        );

    navigationLinks.forEach(
        link => {

            const linkPath =
                new URL(
                    link.href
                ).pathname;

            if (
                currentPage === linkPath
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}