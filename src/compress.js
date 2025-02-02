import heic2any from "heic2any";

export function compressImage(file, quality, callback) {
  if (file.type === "image/heic" || file.name.endsWith(".heic")) {
    heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: quality,
    }).then((convertedBlob) => {
      uploadImageToServer(convertedBlob, callback);
    });
  } else {
    processImage(file, quality, callback);
  }
}

function processImage(file, quality, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (event) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          uploadImageToServer(blob, callback);
        },
        "image/jpeg",
        quality
      );
    };

    img.src = event.target.result;
  };
}

async function uploadImageToServer(file, callback) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://fishing-tournament.onrender.com/upload-image",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.imageUrl;
    callback(imageUrl);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
