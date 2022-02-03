import canvas from 'canvas';

/**
 * Create a meme image file (base64, png) from given template and text
 * configurations.
 * 
 * @param {string} templateUrl Url of the template image.
 * @param {[]} textConfigs Array with text configurations, see frontend type/ 
 *                         interface for structure details.
 * @param {number} maxFileSize Maximum amount of KBs of the meme image file.
 * @returns
 */
export const generateMeme = async (
  templateUrl,
  textConfigs,
  maxFileSize = Number.POSITIVE_INFINITY
) => {
  const templateImage = await canvas.loadImage(templateUrl);

  const memeCanvas = canvas.createCanvas(
    templateImage.width,
    templateImage.height
  );
  const ctx = memeCanvas.getContext('2d');

  // draw meme template image
  ctx.drawImage(templateImage, 0, 0);

  // render texts
  textConfigs.forEach((text) => {
    const fontSize = text.size || 32;
    const fontFamily = text.fontFamily || 'Arial';
    let font = `${fontSize}px ${fontFamily}`;
    if (text.italic) {
      font = `italic ${font}`;
    }
    if (text.bold) {
      font = `bold ${font}`;
    }
    ctx.font = font;
    ctx.fillStyle = text.color || 'black';
    ctx.fillText(text.text, text.xPos || fontSize, text.yPos || 0);
  });

  // export image with given max filesize
  let currentSize = Number.POSITIVE_INFINITY;
  let image;
  let currentQuality = 0.92;
  while (currentSize >= maxFileSize * 1000 && currentQuality >= 0.00001) {
    image = memeCanvas.toDataURL('image/jpeg', currentQuality);
    currentSize = image.length;
    // reduce quality by 10% each step
    currentQuality = currentQuality * 0.9;
  }
  return image || '';
};
