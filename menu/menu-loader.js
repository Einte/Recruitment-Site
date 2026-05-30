document.addEventListener("DOMContentLoaded", async () => {

    console.log("MENU LOADER STARTED");

    const navAnchor =
        document.getElementById(
            "universal-nav-anchor"
        );

    if (!navAnchor) {

        console.error(
            "NAV ANCHOR NOT FOUND"
        );

        return;

    }

    try {

        // ==========================================
        // REPOSITORY ROOT
        // ==========================================

        const REPO_ROOT =
            "/Recruitment-Site";

        // ==========================================
        // LOAD HEADER
        // ==========================================

        const headerResponse =
            await fetch(
                `${REPO_ROOT}/header/header.html`
            );

        if (!headerResponse.ok) {

            throw new Error(
                "HEADER LOAD FAILED: " +
                headerResponse.status
            );

        }

        const headerHtml =
            await headerResponse.text();

        navAnchor.innerHTML =
            headerHtml;

        console.log(
            "HEADER LOADED"
        );

        // ==========================================
        // LOAD DOME MENU
        // ==========================================

        const domeAnchor =
            document.getElementById(
                "dome-menu-anchor"
            );

        if (!domeAnchor) {

            console.error(
                "DOME MENU ANCHOR NOT FOUND"
            );

            return;

        }

        const domeResponse =
            await fetch(
                `${REPO_ROOT}/the-dome-menu/dome-menu.html`
            );

        if (!domeResponse.ok) {

            throw new Error(
                "DOME MENU LOAD FAILED: " +
                domeResponse.status
            );

        }

        const domeHtml =
            await domeResponse.text();

        domeAnchor.innerHTML =
            domeHtml;

        console.log(
            "DOME MENU LOADED"
        );

        // ==========================================
        // INITIALISE DOME MENU
        // ==========================================

        const domeToggle =
            document.getElementById(
                "domeToggle"
            );

        const domeMenu =
            document.getElementById(
                "domeMenu"
            );

        const navBrand =
            document.querySelector(
                ".nav-brand"
            );

        if (
            !domeToggle ||
            !domeMenu
        ) {

            console.error(
                "DOME MENU ELEMENTS NOT FOUND"
            );

            return;

        }

        domeToggle.addEventListener(
            "click",
            () => {

                domeMenu.classList.toggle(
                    "active"
                );

                if (navBrand) {

                    navBrand.classList.toggle(
                        "dome-open"
                    );

                }

            }
        );

        console.log(
            "DOME MENU INITIALISED"
        );

        // ==========================================
        // NOTIFY OTHER SCRIPTS
        // ==========================================

        document.dispatchEvent(
            new Event(
                "headerLoaded"
            )
        );

    } catch (err) {

        console.error(
            "MENU LOADER ERROR:",
            err
        );

    }

});