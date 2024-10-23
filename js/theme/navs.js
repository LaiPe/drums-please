const checkbox1 = document.getElementById("activ-nav-produits");
const checkbox2 = document.getElementById("activ-nav-compte");

checkbox1.addEventListener("change", () => {
  // Si la checkbox1 est cochée, décocher la checkbox2
  if (checkbox1.checked) {
    checkbox2.checked = false;
  }
});

checkbox2.addEventListener("change", () => {
  // Si la checkbox2 est cochée, décocher la checkbox1
  if (checkbox2.checked) {
    checkbox1.checked = false;
  }
});
