/* =====================================================

   FEATURE: FOOTER ENGINE

   PURPOSE:
   Load footer and handle newsletter actions.

   DEPENDENCIES:
   - footer.html
   - footer.css

===================================================== */

document.addEventListener("DOMContentLoaded", loadFooter);

async function loadFooter() {
  const footerMount = document.getElementById("footer-mount");

  if (!footerMount) {
    console.error("FOOTER MOUNT NOT FOUND");

    return;
  }

  try {
    const response = await fetch("../footer/footer.html");

    if (!response.ok) {
      throw new Error("FOOTER LOAD FAILED");
    }

    footerMount.innerHTML = await response.text();

    console.log("FOOTER LOADED");

    initialiseFooter();
  } catch (error) {
    console.error(error);
  }
}

function initialiseFooter() {
  const subscribeButton = document.getElementById(
    "newsletter-subscribe-button",
  );

  const emailInput = document.getElementById("newsletter-email");

  if (!subscribeButton || !emailInput) {
    console.warn("FOOTER ELEMENTS NOT FOUND");

    return;
  }

  subscribeButton.addEventListener("click", () => {
    const emailAddress = emailInput.value.trim();

    if (!emailAddress) {
      alert("Please enter an email address.");

      return;
    }

    alert("Thank you for subscribing.");

    emailInput.value = "";
  });
}