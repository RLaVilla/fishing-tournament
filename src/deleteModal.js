import { loadParticipants } from "./participants";
import { updateParticipants } from "./participants";
import { showParticipantCatches } from "./catches";

export async function showConfirmationModal(fishCatch, index, name) {
  const participants = await loadParticipants();

  const modal = document.getElementById("confirmModal");
  const confirmButton = document.getElementById("confirmDelete");
  const cancelButton = document.getElementById("cancelDelete");
  const modalMessage = document.getElementById("modalMessage");

  modalMessage.textContent = `Are you sure you want to delete ${name}'s ${fishCatch.species}?`;

  modal.style.display = "block";

  confirmButton.onclick = async () => {
    const imageUrl = fishCatch.imageUrl;

    participants[name].catches.splice(index, 1);
    participants[name].totalLength -= fishCatch.length;

    await updateParticipants(participants);

    if (imageUrl) {
      await fetch("https://fishing-tournament.onrender.com/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      }).catch((error) => console.error("Error deleting image:", error));
    }

    modal.style.display = "none";

    showParticipantCatches(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
