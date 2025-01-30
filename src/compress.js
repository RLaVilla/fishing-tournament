import heic2any from "heic2any";

export function compressImage(file, quality, callback) {
  if (file.type === "image/heic" || file.name.endsWith(".heic")) {
    heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: quality,
    }).then((convertedBlob) => {
      processImage(convertedBlob, quality, callback);
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
          const compressedImageUrl = URL.createObjectURL(blob);
          callback(compressedImageUrl);
        },
        "image/jpeg",
        quality
      );
    };

    img.src = event.target.result;
  };
}
