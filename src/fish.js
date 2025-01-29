import "./style.css";
import { populateHome } from "./home";
window.onload = populateHome();

export function showForm() {
  const form = document.getElementById("fishing-form");
  form.style.display = "grid";
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const speciesName = document.getElementById("species-name").value;
    const fishType = document.getElementById("fish-type").value;
    const length = document.getElementById("length").value;
    const image = document.getElementById("fish-image").files[0];

    if (speciesName && fishType && length && image) {
      document.getElementById("confirmation").innerHTML = `
            <h3>Entry Submitted!</h3>
            <p>Species: ${speciesName}</p>
            <p>Type: ${fishType}</p>
            <p>Length: ${length} inches</p>
            <p>Image: <img src="${URL.createObjectURL(image)}" alt="${speciesName}" width="200"></p>
          `;
    } else {
      document.getElementById("confirmation").innerHTML =
        "<p>Please fill out all fields.</p>";
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".fish-type-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.remove("selected"));

        this.classList.add("selected");

        const fishType = this.getAttribute("data-value");
        document.getElementById("fish-type").value = fishType;
      });
    });
  });
}
