// ===============================
// THEME MANAGER
// ===============================

function applyTheme() {

    const savedTheme = localStorage.getItem("theme") || "dark";

    document.body.classList.toggle(
        "light-mode",
        savedTheme === "light"
    );

    const checkbox = document.getElementById("themeCheckbox");

    if (checkbox) {

        checkbox.checked = savedTheme === "light";

    }

    const label = document.getElementById("toggleLabel");

    if (label) {

        label.textContent =
            savedTheme === "light"
                ? "Light"
                : "Dark";

    }

}

// ===============================
// INITIAL PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

});

// ===============================
// HEADER LOADED
// ===============================

document.addEventListener("headerLoaded", () => {

    applyTheme();

});

// ===============================
// THEME SWITCH
// ===============================

document.addEventListener("change", (e) => {

    if (!e.target || e.target.id !== "themeCheckbox") {
        return;
    }

    const isLight = e.target.checked;

    if (isLight) {

        document.body.classList.add("light-mode");

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        document.body.classList.remove("light-mode");

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    const label = document.getElementById("toggleLabel");

    if (label) {

        label.textContent =
            isLight
                ? "Light"
                : "Dark";

    }

});