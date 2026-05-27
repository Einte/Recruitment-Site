document.addEventListener("domeLoaded", () => {

    const domeToggle = document.getElementById("domeToggle");
    const domeMenu = document.getElementById("domeMenu");

    if (!domeToggle || !domeMenu) return;

    domeToggle.addEventListener("click", () => {

        domeMenu.classList.toggle("active");

    });

});