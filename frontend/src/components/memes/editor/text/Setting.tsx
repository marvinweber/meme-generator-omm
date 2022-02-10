import { mdiArrowDown, mdiArrowLeft, mdiArrowRight, mdiArrowUp, mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { MemeText } from "../../../../lib/memeConfigInterface";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
const fontFamilies = [
  "Arial",
  "Brush Script MT",
  "Cambria",
  "Comic Sans MS",
  "Courier New",
  "Garamond",
  "Georgia",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
];

const MemeEditorTextSetting: React.FC<{
  text: MemeText;
  id: number;
  updateText: (id: number, newText: MemeText) => void;
  removeText: (id: number) => void;
  /** Amount (in pixels) to move a text by one button click. */
  moveTextAmount?: number;
}> = ({ text, id, updateText, removeText, moveTextAmount }) => {
  /**
   * Move the texts position in the given direction by the given amount.
   *
   * @param direction direction to move the text to
   * @param amount numeric amount of the move
   */
  const moveText = (direction: Direction) => {
    const newText = { ...text };
    switch (direction) {
      case "UP":
        newText.yPos -= moveTextAmount || 10;
        break;
      case "DOWN":
        newText.yPos += moveTextAmount || 10;
        break;
      case "LEFT":
        newText.xPos -= moveTextAmount || 10;
        break;
      case "RIGHT":
        newText.xPos += moveTextAmount || 10;
        break;
    }
    updateText(id, newText);
  };

  const updateTextString = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = { ...text };
    newText.text = e.target.value;
    updateText(id, newText);
  };

  const updateFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newText = { ...text };
    newText.fontFamily = e.target.value;
    updateText(id, newText);
  };

  const updateTextSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = { ...text };
    const newSize = parseInt(e.target.value);
    newText.size = isNaN(newSize) ? 50 : newSize;
    updateText(id, newText);
  };

  const updateTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = { ...text };
    newText.color = e.target.value;
    updateText(id, newText);
  };

  const updateTextItalic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = { ...text };
    newText.italic = e.target.checked;
    updateText(id, newText);
  };

  const updateTextBold = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = { ...text };
    newText.bold = e.target.checked;
    updateText(id, newText);
  };

  return (
    <div className="flex flex-col border-t mb-2 pt-2">
      <div className="flex justify-between items-end">
        <span className="text-xs">Text {id + 1}:</span>
        <button
          onClick={() => removeText(id)}
          className="px-2 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          <Icon path={mdiDelete} size={0.8} />
        </button>
      </div>
      <div className="flex items-center mt-1">
        {/* TEXT INPUT AND STYLE */}
        <div className="flex flex-col flex-grow">
          <input
            type="text"
            value={text.text}
            onChange={updateTextString}
            placeholder="Caption"
            className="border rounded-md p-1"
          />
          <div className="flex justify-between items-center">
            {/* Bold / Italic */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={text.bold || false}
                  onChange={updateTextBold}
                />
                <span className="text-sm ml-1">Bold</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={text.italic || false}
                  onChange={updateTextItalic}
                />
                <span className="text-sm ml-1">Italic</span>
              </div>
            </div>

            {/* Font Family */}
            <div className="flex flex-col">
              <span className="text-sm">Font Family:</span>
              <select
                value={text.fontFamily}
                onChange={updateFontFamily}
                className="border rounded-md"
              >
                {fontFamilies.map((font) => (
                  <option key={font}>{font}</option>
                ))}
              </select>
            </div>

            {/* Font Color */}
            <div className="flex flex-col">
            <span className="text-sm">Color:</span>
              <input
                type="color"
                value={text.color || "#000000"}
                onChange={updateTextColor}
              />
            </div>

            {/* Font Size */}
            <div className="flex flex-col">
            <span className="text-sm">Size:</span>
              <input
                type="number"
                style={{ width: "80px" }}
                min={1}
                max={10000}
                value={text.size}
                onChange={updateTextSize}
                className="border rounded-md px-1"
              />
            </div>
          </div>
        </div>

        {/* TEXT MOVEMENT */}
        <div className="grid grid-cols-2 gap-1 ml-1">
          <button
            onClick={() => moveText("UP")}
            className="w-10 h-10 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg
                       flex justify-center items-center"
          >
            <Icon path={mdiArrowUp} size={1} />
          </button>
          <button
            onClick={() => moveText("DOWN")}
            className="w-10 h-10 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg
                       flex justify-center items-center"
          >
            <Icon path={mdiArrowDown} size={1} />
          </button>
          <button
            onClick={() => moveText("LEFT")}
            className="w-10 h-10 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg
                       flex justify-center items-center"
          >
            <Icon path={mdiArrowLeft} size={1} />
          </button>
          <button
            onClick={() => moveText("RIGHT")}
            className="w-10 h-10 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg
                       flex justify-center items-center"
          >
            <Icon path={mdiArrowRight} size={1} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MemeEditorTextSetting;
