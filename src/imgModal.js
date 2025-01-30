export function openModal(img) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImage.src = img;

  document.getElementById("close-btn").addEventListener("click", function () {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
