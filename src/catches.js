import { loadParticipants } from "./participants";
import { populateHome } from "./home";
import { openModal } from "./imgModal";
import { showConfirmationModal } from "./deleteModal";

import perchImg from "./images/perch.png";
import flounderImg from "./images/flounder.png";
import back from "./images/backArrow.svg";
import trashImg from "./images/trash.svg";

export async function showParticipantCatches(name) {
  const participants = await loadParticipants();

  const catches = participants[name].catches;
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  const headerCatchesDiv = document.createElement("div");
  headerCatchesDiv.classList.add("headerCatchesDiv");

  const backArrow = document.createElement("img");
  backArrow.src = back;

  backArrow.addEventListener("click", populateHome);

  const headerName = document.createElement("p");
  headerName.textContent = `${name}'s Catches`;

  headerCatchesDiv.appendChild(backArrow);
  headerCatchesDiv.appendChild(headerName);

  contentDiv.appendChild(headerCatchesDiv);

  const totalLength = document.createElement("div");
  totalLength.innerHTML = `Total Length: <span>${participants[name].totalLength} inches</span>`;
  totalLength.classList.add("totalLength");

  contentDiv.appendChild(totalLength);

  const saltDiv = document.createElement("div");
  saltDiv.classList.add("saltDiv");

  const saltHeader = document.createElement("div");

  const saltImg = document.createElement("img");
  saltImg.src = flounderImg;
  saltImg.classList.add("titleImg");

  const saltLabel = document.createElement("p");
  saltLabel.textContent = "Saltwater Species";
  saltLabel.classList.add("titleLabel");

  saltHeader.appendChild(saltImg);
  saltHeader.appendChild(saltLabel);

  saltDiv.appendChild(saltHeader);

  const freshDiv = document.createElement("div");
  freshDiv.classList.add("freshDiv");

  const freshHeader = document.createElement("div");

  const freshImg = document.createElement("img");
  freshImg.src = perchImg;
  freshImg.classList.add("titleImg");

  const freshLabel = document.createElement("p");
  freshLabel.textContent = "Freshwater Species";
  freshLabel.classList.add("titleLabel");

  freshHeader.appendChild(freshImg);
  freshHeader.appendChild(freshLabel);

  freshDiv.appendChild(freshHeader);

  contentDiv.appendChild(saltDiv);
  contentDiv.appendChild(freshDiv);

  catches.forEach((fishCatch, index) => {
    const catchDiv = document.createElement("div");
    catchDiv.classList.add("catchDiv");

    const img = document.createElement("img");
    img.src = `https://fishing-tournament.onrender.com${fishCatch.imageUrl}`;
    img.alt = fishCatch.species;
    img.classList.add("catchImg");

    img.addEventListener("click", () => openModal(fishCatch.imageUrl));

    const speciesName = document.createElement("p");
    speciesName.textContent = `${fishCatch.species}`;
    speciesName.classList.add("catchName");

    const length = document.createElement("p");
    length.textContent = `${fishCatch.length} inches`;
    length.classList.add("catchLength");

    const metricDiv = document.createElement("div");
    metricDiv.classList.add("metricDiv");

    metricDiv.appendChild(speciesName);
    metricDiv.appendChild(length);

    const deleteButton = document.createElement("img");
    deleteButton.src = trashImg;
    deleteButton.classList.add("deleteButton");

    deleteButton.addEventListener("click", () => {
      showConfirmationModal(fishCatch, index, name);
    });

    catchDiv.appendChild(img);
    catchDiv.appendChild(metricDiv);
    catchDiv.appendChild(deleteButton);
    console.log(fishCatch.type);
    if (fishCatch.type === "saltwater") {
      saltDiv.appendChild(catchDiv);
    } else {
      freshDiv.appendChild(catchDiv);
    }

    deleteButton.addEventListener("click", () => {
      showConfirmationModal(fishCatch, index, name);
    });
  });
}
