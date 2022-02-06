import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../..";
import dataURIToBlob from "../../../lib/dataUriToBlob";
import { MemeConfig, MemeText } from "../../../lib/memeConfigInterface";
import MemeEditorTextSettingsList from "./text/SettingsList";

const MemeEditor: React.FC<{
  templateUrl: string;
  templateId?: string;
  memeConfig: MemeConfig;
  setMemeConfig: (mc: MemeConfig) => void;
}> = ({ templateUrl, templateId, memeConfig, setMemeConfig }) => {
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [templateImage] = useState(new Image());

  // refs for "create options"
  const outputMemeTitle = useRef<HTMLInputElement>(null);
  const outputMemeTags = useRef<HTMLInputElement>(null);
  const outputFileSizeLimitCheckbox = useRef<HTMLInputElement>(null);
  const outputFileSizeLimitInput = useRef<HTMLInputElement>(null);

  const [draftName, setDraftName] = useState("");

  // hook to update template image if templateUrl changes
  useEffect(() => {
    // draw meme after image has been loaded
    templateImage.onload = () => {
      drawMeme();
    };
    templateImage.src = templateUrl;
    templateImage.crossOrigin = "anonymous";
  }, [templateUrl]);

  // hook to trigger re-drawing if meme configuration changes
  useEffect(() => {
    drawMeme();
  }, [memeConfig]);

  const updateMemeTexts = (texts: MemeText[]) => {
    setMemeConfig({ ...memeConfig, texts });
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // set correct canvas size
    ctx.canvas.height = templateImage.height ?? 500;
    ctx.canvas.width = templateImage.width ?? 500;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw meme template image
    ctx.drawImage(templateImage, 0, 0);

    // render texts
    memeConfig.texts.forEach((text) => {
      let font = `${text.size}px ${text.fontFamily}`;
      if (text.italic) {
        font = `italic ${font}`;
      }
      if (text.bold) {
        font = `bold ${font}`;
      }
      ctx.font = font;
      ctx.fillStyle = text.color || "black";
      ctx.fillText(text.text, text.xPos, text.yPos);
    });
  };

  /**
   *
   * @param canvas Canvas element to create image from.
   * @param size Maximum target file size in KB (optional).
   */
  const createImageFromCanvas = (
    canvas: HTMLCanvasElement,
    size: number = Number.POSITIVE_INFINITY
  ): string => {
    let currentSize = Number.POSITIVE_INFINITY;
    let image;
    let currentQuality = 0.92;
    while (currentSize >= size * 1000 && currentQuality >= 0.0001) {
      image = canvas.toDataURL("image/jpeg", currentQuality);
      currentSize = image.length;
      // reduce quality by 10% each step
      currentQuality = currentQuality * 0.9;
    }
    return image || "";
  };

  const getOutputMaxFileSize = (): number => {
    const limit = outputFileSizeLimitCheckbox.current?.checked || false;
    if (!limit) {
      return Number.POSITIVE_INFINITY;
    }
    const value = parseInt(outputFileSizeLimitInput.current?.value || "");
    const maxSize = isNaN(value) ? Number.POSITIVE_INFINITY : value;
    return maxSize;
  };

  const getOutputTags = (): string[] => {
    const tags =
      outputMemeTags.current?.value && outputMemeTags.current.value.length > 0
        ? outputMemeTags.current?.value.split(" ")
        : [];
    // exclude empty tags (caused by multiple whitespaces)
    return tags.filter((tag) => !!tag);
  };

  const createLocalAndDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const maxFileSize = getOutputMaxFileSize();
    const image = createImageFromCanvas(canvas, maxFileSize);

    //
    // Download Image
    //
    const a = document.createElement("a");
    a.href = image;
    a.download = "meme.jpeg";
    a.target = "_blank";
    a.click();
  };

  const createLocalAndPublish = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const maxFileSize = getOutputMaxFileSize();
    const image = createImageFromCanvas(canvas, maxFileSize);

    const formData = new FormData();
    formData.append("meme", dataURIToBlob(image));
    formData.append("name", outputMemeTitle.current?.value || "No Title");
    formData.append("tags", JSON.stringify(getOutputTags()));
    formData.append(
      "captions",
      JSON.stringify(memeConfig.texts.map((text) => text.text))
    );
    if (templateId) {
      formData.append("template", templateId);
    }

    const uploadResult = await apiClient.post("/memes/file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (uploadResult.data.success) {
      const memeId = uploadResult.data.memes[0]._id;
      navigate(`/memes/${memeId}`);
    } else {
      console.error("Could not upload template!");
    }
  };

  const createOnlineAndPublish = async () => {
    const maxFileSize = getOutputMaxFileSize();

    const formData = new FormData();
    formData.append("name", outputMemeTitle.current?.value || "No Title");
    formData.append("tags", JSON.stringify(getOutputTags()));

    const srvMemeConfig: any = {
      templateId,
      templateUrl,
      title: outputMemeTitle.current?.value || "No Title",
      tags: getOutputTags(),
      texts: memeConfig.texts,
    };

    if (maxFileSize !== Number.POSITIVE_INFINITY) {
      srvMemeConfig["maxFileSize"] = maxFileSize;
    }

    const uploadResult = await apiClient.post("/memes/config", {
      memeConfigs: [srvMemeConfig],
    });
    if (uploadResult.data.success) {
      const memeId = uploadResult.data.memes[0]._id;
      navigate(`/memes/${memeId}`);
    } else {
      console.error("Could not upload template!");
    }
  };

  /** Send a request to the backend to save current meme config as draft. */
  const saveDraft = async () => {
    const payload = {
      name: draftName,
      templateUrl,
      templateId,
      memeConfig: JSON.stringify(memeConfig),
    };
    const res = await apiClient.post("/memes/drafts", payload);
    if (res.data.success) {
      alert("Draft has been saved!");
      setDraftName('');
    }
  };

  return (
    <>
      <div className="flex items-start flex-col md:flex-row">
        <canvas
          ref={canvasRef}
          className="mb-5 w-1/2 m-1 shadow-lg rounded-md"
        ></canvas>
        <MemeEditorTextSettingsList
          texts={memeConfig.texts}
          updateTexts={updateMemeTexts}
          clearTexts={() => updateMemeTexts([])}
        />
      </div>

      <hr className="my-5" />

      {/* Create / Output Options and Buttons */}
      <div className="flex flex-col">
        <h3 className="text-xl">Create Image</h3>

        {/* Output Settings */}
        <div className="flex-col mt-2 mb-4 p-2 border border-gray-500 rounded">
          <h4 className="text-lg">Options</h4>
          <div className="flex flex-col md:flex-row justify-between">
            <input
              ref={outputMemeTitle}
              type="text"
              placeholder="Meme Title"
              className="border-2 border-gray-500 rounded-md p-1 flex-grow"
            />
            <input
              ref={outputMemeTags}
              type="text"
              placeholder="Tags (whitespace separated)"
              className="border-2 border-gray-500 rounded-md p-1 flex-grow mx-0 md:mx-1 my-1 md:my-0"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <input ref={outputFileSizeLimitCheckbox} type="checkbox" />
                <span className="ml-1">Limit File Size:</span>
              </div>
              <input
                ref={outputFileSizeLimitInput}
                type="number"
                placeholder="Max Size in KBs"
                className="border-2 border-gray-500 rounded-md p-1"
              />
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <button
          onClick={createLocalAndDownload}
          className="border-2 p-2 mb-2 rounded-md hover:bg-green-600 hover:border-green-600 hover:text-white"
        >
          Create Locally &amp; Download (No Publish)
        </button>
        <button
          onClick={createLocalAndPublish}
          className="border-2 p-2 mb-2 rounded-md hover:bg-green-600 hover:border-green-600 hover:text-white"
        >
          Create Locally &amp; Publish
        </button>
        <button
          onClick={createOnlineAndPublish}
          className="border-2 p-2 mb-2 rounded-md hover:bg-green-600 hover:border-green-600 hover:text-white"
        >
          Create Online &amp; Publish
        </button>
      </div>

      <hr className="my-5" />

      {/* Save as Draft */}
      <div className="flex flex-col">
        <h3 className="text-xl">Save Draft</h3>
        <div className="flex">
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Draft Name"
            className="border-2 border-gray-500 rounded-md p-1 flex-grow"
          />
          <button
            onClick={saveDraft}
            className="border-2 p-2 mb-2 rounded-md hover:bg-green-600 hover:border-green-600
                     hover:text-white disabled:hover:bg-white disabled:text-gray-300 disabled:hover:text-gray-300
                     disabled:hover:border-gray-300 disabled:border-gray-300"
            disabled={memeConfig.texts.length === 0}
          >
            Save
          </button>
        </div>
      </div>

      <hr className="my-5" />
    </>
  );
};
export default MemeEditor;
