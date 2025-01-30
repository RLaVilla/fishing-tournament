import "./style.css";
import { populateHome } from "./home";
import { toggleDropdown } from "./home";
import { participants } from "./participants";
import { compressImage } from "./compress";
window.onload = populateHome();

let isSubmitting = false;

export function showForm() {
  const dropdownButton = document.getElementById("dropdownButton");
  const form = document.getElementById("fishing-form");

  const darkDiv = document.getElementById("darkDiv");

  form.removeEventListener("submit", handleFormSubmit);

  form.addEventListener("submit", handleFormSubmit);

  darkDiv.style.display = "block";
  form.style.display = "grid";
  function handleFormSubmit() {
    event.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const speciesName = document.getElementById("species-name").value;
    const fishType = document.getElementById("fish-type").value;
    const length = document.getElementById("length").value;
    const image = document.getElementById("fish-image").files[0];
    const name = document.getElementById("name").value;

    if (speciesName && fishType && length && image) {
      compressImage(image, 0.8, (compressedImageUrl) => {
        const fishEntry = {
          species: speciesName,
          type: fishType,
          length: parseInt(length),
          imageUrl: compressedImageUrl,
        };

        participants[name].catches.push(fishEntry);

        participants[name].totalLength += parseInt(length);

        form.reset();
        document.getElementById("fish-type").value = "";
        document
          .querySelectorAll(".fish-type-btn")
          .forEach((btn) => btn.classList.remove("selected"));

        form.style.display = "none";
        darkDiv.style.display = "none";

        populateHome();
        window.scrollTo({ top: 0, behavior: "smooth" });
        isSubmitting = false;
      });
    }
  }

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document
    .getElementById("close-form-btn")
    .addEventListener("click", function () {
      form.style.display = "none";
      darkDiv.style.display = "none";
      dropdownButton.addEventListener("click", toggleDropdown);
      form.reset();
      document.getElementById("fish-type").value = "";
      const buttons = document.querySelectorAll(".fish-type-btn");
      buttons.forEach((btn) => btn.classList.remove("selected"));
    });
}
