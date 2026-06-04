/* =====================================================
   DARK MODE ENGINE
===================================================== */

document.addEventListener(
    "change",
    handleThemeChange
);

document.addEventListener(
    "DOMContentLoaded",
    applyTheme
);


/* =====================================================
   APPLY SAVED THEME
===================================================== */

function applyTheme() {

    const savedTheme =
        localStorage.getItem("theme")
        || "dark";

    document.body.classList.toggle(
        "light-mode",
        savedTheme === "light"
    );

    const checkbox =
        document.getElementById(
            "dark-mode-checkbox"
        );

    if (checkbox) {

        checkbox.checked =
            savedTheme === "light";

    }

}


/* =====================================================
   HANDLE TOGGLE
===================================================== */

function handleThemeChange(event) {

    if (
        !event.target ||
        event.target.id !==
        "dark-mode-checkbox"
    ) {

        return;

    }

    const isLight =
        event.target.checked;

    document.body.classList.toggle(
        "light-mode",
        isLight
    );

    localStorage.setItem(
        "theme",
        isLight
            ? "light"
            : "dark"
    );

}