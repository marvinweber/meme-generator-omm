import { mdiDelete, mdiPlusCircle, mdiTextRecognition } from "@mdi/js";
import { Icon } from "@mdi/react";
import React from "react";
import { MemeText } from "../../../../lib/memeConfigInterface";
import MemeEditorTextSetting from "./Setting";

const MemeEditorTextSettingsList: React.FC<{
  texts: MemeText[];
  updateTexts: (newTexts: MemeText[]) => void;
  clearTexts: () => void;
  /** Amount (in pixels) to move a text by one button click. */
  moveTextAmount?: number;
  /** Default size for a new text. */
  newTextDefaultSize?: number;
}> = ({
  texts,
  updateTexts,
  clearTexts,
  moveTextAmount,
  newTextDefaultSize,
}) => {
  /** Add new empty text. */
  const addText = () => {
    const size = newTextDefaultSize || 80;
    const newTexts = [
      ...texts,
      { text: "New Text", size, xPos: 3, yPos: size, fontFamily: "Arial" },
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
    <div className="flex flex-col p-2 w-full shadow-lg rounded-xl">
      {/* Heading and Add / Clear Buttons */}
      <div className="flex justify-between mb-4">
        <h3 className="text-xl">Meme Captions</h3>
        <div className="flex">
          <button
            onClick={clearTexts}
            className="p-1 rounded-lg border border-red-700 text-red-700 hover:bg-red-600 
                     hover:text-white flex items-center justify-center mr-1"
          >
            <Icon path={mdiDelete} size={0.8} />
            Texts
          </button>
          <button
            onClick={addText}
            className="p-1 rounded-lg border border-green-700 text-green-700 hover:bg-green-600 
                     hover:text-white flex items-center justify-center"
          >
            <Icon path={mdiPlusCircle} size={0.8} />
            Text
          </button>
        </div>
      </div>

      {/* Text Settings List */}
      {texts.length > 0 ? (
        texts.map((text, index) => (
          <MemeEditorTextSetting
            key={index}
            text={text}
            id={index}
            updateText={updateText}
            removeText={removeText}
            moveTextAmount={moveTextAmount}
          />
        ))
      ) : (
        <div className="flex justify-center mt-10">
          <Icon path={mdiTextRecognition} size={1} className="mr-1" />
          No Captions added yet!
        </div>
      )}
    </div>
  );
};
export default MemeEditorTextSettingsList;
