import "./style.css";
import { populateHome } from "./home";
import { toggleDropdown } from "./home";
import { participants } from "./participants";
window.onload = populateHome();

export function showForm() {
  const dropdownButton = document.getElementById("dropdownButton");
  const form = document.getElementById("fishing-form");
  form.style.display = "grid";
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const speciesName = document.getElementById("species-name").value;
    const fishType = document.getElementById("fish-type").value;
    const length = document.getElementById("length").value;
    const image = document.getElementById("fish-image").files[0];
    const name = document.getElementById("name").value;

    if (speciesName && fishType && length && image) {
      const fishEntry = {
        species: speciesName,
        type: fishType,
        length: parseInt(length),
        imageUrl: URL.createObjectURL(image),
      };

      console.log(fishEntry);

      participants[name].catches.push(fishEntry);

      participants[name].totalLength += parseInt(length);

      form.reset();
      document.getElementById("fish-type").value = ""; // Reset hidden input
      document
        .querySelectorAll(".fish-type-btn")
        .forEach((btn) => btn.classList.remove("selected"));

      form.style.display = "none";


      populateHome();
    }
  });

  document
    .getElementById("close-form-btn")
    .addEventListener("click", function () {
      form.style.display = "none";
      dropdownButton.addEventListener("click", toggleDropdown);
      form.reset();
      document.getElementById("fish-type").value = "";
      const buttons = document.querySelectorAll(".fish-type-btn");
      buttons.forEach((btn) => btn.classList.remove("selected"));
    });
}
