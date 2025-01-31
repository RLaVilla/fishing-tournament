import dropImg from "./images/dropdown.svg";
import arrowImg from "./images/arrow.svg";
import oneImg from "./images/one.svg";
import twoImg from "./images/two.svg";
import threeImg from "./images/three.svg";
import sadImg from "./images/sad.svg";

import { showDropdown } from "./dropdown";
import { showParticipantCatches } from "./catches";
import { loadParticipants } from "./participants";

export function toggleDropdown() {
  showDropdown();
}

export async function populateHome() {
  const participants = await loadParticipants();

  const buttons = document.querySelectorAll(".fish-type-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("selected"));

      this.classList.add("selected");

      const fishType = this.getAttribute("data-value");
      document.getElementById("fish-type").value = fishType;
    });
  });

  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  const dropDown = document.createElement("img");
  dropDown.src = dropImg;
  dropDown.classList.add("dropDown");
  dropDown.id = "dropdownButton";
  dropDown.addEventListener("click", toggleDropdown);

  const header = document.createElement("div");
  header.classList.add("header");
  header.id = "header";

  const label = document.createElement("div");
  label.classList.add("label");
  label.textContent = "Mity Might Tournament";

  header.appendChild(dropDown);
  header.appendChild(label);

  contentDiv.appendChild(header);

  const headerTwo = document.createElement("div");
  headerTwo.id = "headerTwo";

  const headerTwoTitle = document.createElement("p");
  headerTwoTitle.textContent = "Leaderboard";

  headerTwo.appendChild(headerTwoTitle);

  contentDiv.appendChild(headerTwo);

  const leaderboardDiv = document.createElement("div");
  leaderboardDiv.classList.add("leaderboardDiv");
  leaderboardDiv.id = "leaderboard";

  const sortedParticipants = Object.keys(participants).sort((a, b) => {
    return participants[b].totalLength - participants[a].totalLength;
  });

  leaderboardDiv.innerHTML = "";

  sortedParticipants.forEach((name, index) => {
    const participantDiv = document.createElement("div");
    participantDiv.classList.add("participant");

    const participantName = document.createElement("p");
    participantName.textContent = `${name}:`;
    participantName.classList.add("name");

    const participantLength = document.createElement("p");
    participantLength.textContent = `${participants[name].totalLength} inches`;
    participantLength.classList.add("length");

    const participantArrow = document.createElement("img");
    participantArrow.src = arrowImg;
    participantArrow.classList.add("arrowImg");

    participantArrow.addEventListener("click", () =>
      showParticipantCatches(name)
    );

    let rankImg;
    switch (index) {
      case 0:
        rankImg = oneImg;
        break;
      case 1:
        rankImg = twoImg;
        break;
      case 2:
        rankImg = threeImg;
        break;

      default:
        rankImg = sadImg;
    }

    const rankImage = document.createElement("img");
    rankImage.src = rankImg;
    rankImage.classList.add("rankImage");

    participantDiv.appendChild(rankImage);
    participantDiv.appendChild(participantName);
    participantDiv.appendChild(participantLength);
    participantDiv.appendChild(participantArrow);
    leaderboardDiv.appendChild(participantDiv);
    contentDiv.appendChild(leaderboardDiv);
  });

  const footerDiv = document.createElement("div");
  footerDiv.classList.add("footerDiv");

  const logo = document.createElement("img");
  logo.src =
    "//fishermenssource.com/cdn/shop/files/fishermen_logo_7527e661-f47e-4145-97d8-7bedb99119e3_500x.png?v=1662569298";

  footerDiv.appendChild(logo);
  contentDiv.appendChild(footerDiv);
}
