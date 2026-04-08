// Obtenir le chemin d'exécution du script
const relativePath = "js/theme/chg-logo-responsive.js";
let absolutePath = document.currentScript.src.replace(relativePath, "");

const logo = document.getElementById("logo-header");

function changerURL() {
  if (window.innerWidth <= 740) {
    logo.src =
      absolutePath + "./img/logo-drums-please/logo-mobile-drums-please.png";
  } else {
    logo.src =
      absolutePath + "./img/logo-drums-please/logo-large-drums-please.png";
  }
}

window.addEventListener("resize", changerURL);
changerURL();
