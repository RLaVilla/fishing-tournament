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
    participants[name].catches.splice(index, 1);
    participants[name].totalLength -= fishCatch.length;

    await updateParticipants(participants);

    modal.style.display = "none";

    showParticipantCatches(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
