import { showForm } from "./fish";
import { toggleDropdown } from "./home";

let isDropdownOpen = false;
let isSignedIn = true;
let dropdownDiv;

export function showDropdown() {
  const contentDiv = document.getElementById("content");
  const dropdownButton = document.getElementById("dropdownButton");

  if (!dropdownDiv) {
    dropdownDiv = document.createElement("div");
    dropdownDiv.style.display = "none";
    dropdownDiv.id = "dropdownDiv";

    contentDiv.appendChild(dropdownDiv);
  }

  if (isDropdownOpen) {
    dropdownDiv.style.display = "none";
    isDropdownOpen = false;
  } else {
    dropdownDiv.style.display = "grid";
    dropdownDiv.innerHTML = "";

    if (isSignedIn) {
      const addButton = document.createElement("p");
      addButton.textContent = "Log a new fish";
      addButton.classList.add("addButton");

      addButton.addEventListener("click", () => {
        dropdownDiv.style.display = "none";
        isDropdownOpen = false;
        dropdownButton.removeEventListener("click", toggleDropdown);
        showForm();
      });

      const account = document.createElement("p");
      account.textContent = "Profile";
      account.classList.add("account");

      dropdownDiv.appendChild(addButton);
      dropdownDiv.appendChild(account);
    } else {
      const userButton = document.createElement("p");
      userButton.textContent = "Create Account";
      userButton.classList.add("userButton");

      dropdownDiv.appendChild(userButton);
      userButton.style.gridColumn = "1 / 3";
    }
    isDropdownOpen = true;
  }
}
