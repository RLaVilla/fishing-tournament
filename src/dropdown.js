import { showForm } from "./fish";
import { toggleDropdown } from "./home";

let isDropdownOpen = false;

export function showDropdown() {
  const contentDiv = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");
  const headerTwo = document.getElementById("headerTwo");

  let dropdownDiv = document.getElementById("dropdownDiv");
  if (!dropdownDiv) {
    dropdownDiv = document.createElement("div");
    dropdownDiv.style.display = "none";
    dropdownDiv.id = "dropdownDiv";
    contentDiv.insertBefore(dropdownDiv, headerTwo);
  }

  if (isDropdownOpen) {
    dropdownDiv.classList.remove("show");
    dropdownDiv.style.display = "none";
    isDropdownOpen = false;
  } else {
    dropdownDiv.style.display = "grid";
    setTimeout(() => {
      dropdownDiv.classList.add("show");
    }, 10);
    dropdownDiv.innerHTML = "";

    const addButton = document.createElement("p");
    addButton.textContent = "Log a new fish";
    addButton.classList.add("addButton");

    addButton.addEventListener("click", () => {
      dropdownDiv.style.display = "none";
      isDropdownOpen = false;
      dropdownButton.removeEventListener("click", toggleDropdown);
      showForm();
    });

    dropdownDiv.appendChild(addButton);
    isDropdownOpen = true;
  }
}
