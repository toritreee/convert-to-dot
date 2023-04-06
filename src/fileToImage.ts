export default async function fileToImage(file: File):Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      const { result } = reader;
      if (typeof result !== "string") return;
      const img = new Image();
      img.src = result;
      resolve(img)
    });
  });
}
