import React from "react";
import { MemeText } from "../Editor";

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
}> = ({ text, id, updateText, removeText }) => {
  /**
   * Move the texts position in the given direction by the given amount.
   *
   * @param direction direction to move the text to
   * @param amount numeric amount of the move
   */
  const moveText = (direction: Direction, amount: number = 10) => {
    const newText = { ...text };
    switch (direction) {
      case "UP":
        newText.yPos -= amount;
        break;
      case "DOWN":
        newText.yPos += amount;
        break;
      case "LEFT":
        newText.xPos -= amount;
        break;
      case "RIGHT":
        newText.xPos += amount;
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
    <div className="flex flex-col border-b-2 mb-2 pb-1">
      <div className="flex justify-between items-end">
        <span className="text-xs">Text {id + 1}:</span>
        <button
          onClick={() => removeText(id)}
          className="px-2 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          x
        </button>
      </div>
      <input
        type="text"
        value={text.text}
        onChange={updateTextString}
        placeholder="Caption"
        className="border-2 border-gray-500 rounded-md my-1 p-1"
      />
      <div className="flex justify-between">
        {/* Bold / Italic */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={text.bold || false}
              onChange={updateTextBold}
            />
            Bold
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={text.italic || false}
              onChange={updateTextItalic}
            />
            Italic
          </div>
        </div>

        {/* Font Family */}
        <div className="flex flex-col">
          Font Family:
          <select
            value={text.fontFamily}
            onChange={updateFontFamily}
            className="border-2 border-gray-500 rounded-md"
          >
            {fontFamilies.map((font) => (
              <option key={font}>{font}</option>
            ))}
          </select>
        </div>

        {/* Font Color */}
        <div className="flex flex-col">
          Color:
          <input
            type="color"
            value={text.color || "#000000"}
            onChange={updateTextColor}
          />
        </div>

        {/* Font Size */}
        <div className="flex flex-col">
          Size:
          <input
            type="number"
            style={{ width: "60px" }}
            min={1}
            max={10000}
            value={text.size}
            onChange={updateTextSize}
            className="border-2 border-gray-500 rounded-md px-1"
          />
        </div>

        {/* Text Movement Controls */}
        <div className="flex flex-col">
          <div className="flex">
            <button
              onClick={() => moveText("UP")}
              className="w-7 h-7 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg"
            >
              ↑
            </button>
            <button
              onClick={() => moveText("DOWN")}
              className="w-7 h-7 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg"
            >
              ↓
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => moveText("LEFT")}
              className="w-7 h-7 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg"
            >
              ←
            </button>
            <button
              onClick={() => moveText("RIGHT")}
              className="w-7 h-7 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemeEditorTextSetting;
