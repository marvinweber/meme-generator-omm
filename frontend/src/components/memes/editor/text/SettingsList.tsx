import React from "react";
import { MemeText } from "../Editor";
import MemeEditorTextSetting from "./Setting";

const MemeEditorTextSettingsList: React.FC<{
  texts: MemeText[];
  updateTexts: (newTexts: MemeText[]) => void;
  clearTexts: () => void;
}> = ({ texts, updateTexts, clearTexts }) => {
  /** Add new empty text. */
  const addText = () => {
    const newTexts = [
      ...texts,
      { text: "New Text", size: 80, xPos: 3, yPos: 80, fontFamily: "Arial" },
    ];
    updateTexts(newTexts);
  };

  /** Remove text with given index from list. */
  const removeText = (index: number) => {
    const newTexts = [...texts];
    newTexts.splice(index, 1);
    updateTexts(newTexts);
  };

  /** Update (i.e., set) text with given id to new given text. */
  const updateText = (index: number, text: MemeText) => {
    const newTexts = [...texts];
    newTexts[index] = text;
    updateTexts(newTexts);
  };

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl">Meme Captions</h3>
        <div>
          <button
            className="rounded-xl border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-2 py-1 mr-2"
            onClick={clearTexts}
          >
            Clear Texts
          </button>
          <button
            className="rounded-xl border border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-2 py-1"
            onClick={addText}
          >
            Add Text
          </button>
        </div>
      </div>
      {texts.map((text, index) => (
        <MemeEditorTextSetting
          key={index}
          text={text}
          id={index}
          updateText={updateText}
          removeText={removeText}
        />
      ))}
    </div>
  );
};
export default MemeEditorTextSettingsList;
