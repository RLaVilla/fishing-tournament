import "./style.css";
import { populateHome } from "./home";
import { toggleDropdown } from "./home";

import { loadParticipants } from "./participants";
import { updateParticipants } from "./participants";
import { compressImage } from "./compress";
window.onload = populateHome();

let isSubmitting = false;

export async function showForm() {
  // const participants = await loadParticipants();
  const dropdownButton = document.getElementById("dropdownButton");
  const form = document.getElementById("fishing-form");

  const darkDiv = document.getElementById("darkDiv");

  form.removeEventListener("submit", handleFormSubmit);

  form.addEventListener("submit", handleFormSubmit);

  darkDiv.style.display = "block";
  form.style.display = "grid";
  async function handleFormSubmit() {
    event.preventDefault();

    const loader = document.getElementById("loader");
    loader.style.display = "block";
    loader.style.top = "37%";

    if (isSubmitting) return;
    isSubmitting = true;

    const speciesName = document.getElementById("species-name").value;
    const fishType = document.getElementById("fish-type").value;
    const length = document.getElementById("length").value;
    const image = document.getElementById("fish-image").files[0];
    const name = document.getElementById("name").value;

    if (speciesName && fishType && length && image) {
      const participants = await loadParticipants();

      compressImage(image, 0.8, async (imageUrl) => {
        const fishEntry = {
          species: speciesName,
          type: fishType,
          length: parseInt(length),
          imageUrl: imageUrl,
        };

        participants[name].catches.push(fishEntry);
        participants[name].totalLength += parseInt(length);

        await updateParticipants(participants);

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
