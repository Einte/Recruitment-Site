document.addEventListener("DOMContentLoaded", () => {

    console.log("MENU LOADER STARTED");

    const navAnchor = document.getElementById("universal-nav-anchor");

    if (!navAnchor) {
        console.error("NAV ANCHOR NOT FOUND");
        return;
    }

    fetch("../header/header.html")
        .then(res => {
            console.log("HEADER STATUS:", res.status);
            return res.text();
        })
        .then(data => {

            console.log("HEADER LOADED");

            navAnchor.innerHTML = data;

        })
        .catch(err => {

            console.error("HEADER ERROR:", err);

        });

});