
/**
 * Convert base64 image to data blog.
 *
 * @see https://stackoverflow.com/a/61321728
 * @param dataURI image data as base64
 * @returns
 */
 export default function dataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}
