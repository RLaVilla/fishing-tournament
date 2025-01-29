import dropImg from "./images/dropdown.svg";
import { showDropdown } from "./dropdown";

export function toggleDropdown() {
  showDropdown();
}

export function populateHome() {
  const contentDiv = document.getElementById("content");

  const dropDown = document.createElement("img");
  dropDown.src = dropImg;
  dropDown.classList.add("dropDown");
  dropDown.id = "dropdownButton";
  dropDown.addEventListener("click", toggleDropdown);

  const header = document.createElement("div");
  header.classList.add("header");
  header.textContent = "Tourament Leaderboard";

  const label = document.createElement("div");
  label.classList.add("label");

  header.appendChild(dropDown);
  header.appendChild(label);

  contentDiv.appendChild(header);
}
