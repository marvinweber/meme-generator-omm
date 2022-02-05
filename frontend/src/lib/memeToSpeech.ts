import { MemeModel } from "./memeModel";

/**
 * Reads out information about the given meme using the Web Speech API.
 * 
 * @param meme model of the meme to read out.
 * @returns 
 */
export default function memeToSpeech(meme: MemeModel): Promise<void> {
  const text = [
    `You are looking at a meme with the title ${meme.title};`,
    `it was uploaded by ${meme.owner.name} at`,
    meme.createdAt.toDateString(),
    "on",
    `${meme.createdAt.getHours()}:${meme.createdAt.getMinutes()}.`,
  ];

  if (meme.captions.length > 0) {
    text.push(
      "It has the following",
      meme.captions.length.toString(),
      "captions: ",
      meme.captions.join("; ") + "."
    );
  }

  if (meme.tags.length === 1) {
    text.push("It is also tagged with", meme.tags[0], ".");
  } else if (meme.tags.length > 1) {
    text.push(
      "It is also tagged with:",
      meme.tags.slice(0, -1).join(", "),
      ", and",
      meme.tags.slice(-1)[0] + "."
    );
  }

  text.push(
    "The meme has",
    meme.viewCount.toString(),
    "views,",
    meme.likeCount.toString(),
    "likes and",
    meme.commentCount.toString(),
    "comments."
  );

  return new Promise<void>((resolve, reject) => {
    const msg = new SpeechSynthesisUtterance(text.join(" "));
    msg.lang = "en-US";
    msg.onend = () => resolve();
    window.speechSynthesis.speak(msg);
  });
}
