import sharp from "sharp";

export const fetchImageAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mimeType = response.headers.get("content-type");

    let convertedBuffer;
    if (mimeType === "image/avif") {
      convertedBuffer = await sharp(buffer).toFormat("png").toBuffer();
    } else {
      convertedBuffer = buffer;
    }

    const base64Image = convertedBuffer.toString("base64");

    // Return the base64 string with the appropriate mime type
    const returnMimeType = mimeType === "image/avif" ? "image/png" : mimeType;
    return `data:${returnMimeType};base64,${base64Image}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
