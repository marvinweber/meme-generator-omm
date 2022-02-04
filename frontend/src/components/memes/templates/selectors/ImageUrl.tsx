import React, { useRef } from "react";
import { apiClient } from "../../../..";

const MemeTemplateSelectorImageUrl: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const templateNameRef = useRef<HTMLInputElement>(null);

  /** Handler for uploading the selected file to the backend server. */
  const uploadHandler = async () => {
    const templateUrl = imageUrlRef?.current?.value;
    const templateName = templateNameRef?.current?.value;
    // no file selected -> no upload
    if (!templateUrl) {
      return;
    }

    const uploadResult = await apiClient.post("/templates/upload/url", {
      templateUrl,
      templateName,
    });
    if (uploadResult.data.success) {
      onNewTemplate(
        uploadResult.data.templates[0].url,
        uploadResult.data.templates[0]._id
      );
    } else {
      console.error("Could not upload template!");
    }
  };

  return (
    <div className="flex flex-col">
      <strong>Template Image Upload (by URL)</strong>
      <div className="flex my-2">
        Optional name for the template:
        <input
          ref={templateNameRef}
          type="text"
          placeholder="Template Name"
          name="templateName"
          className="border-1 rounded-md"
        />
      </div>
      <div className="flex justify-between">
        <input
          ref={imageUrlRef}
          type="text"
          placeholder="URL to the image (https only)"
          className="w-full"
        />
        <button
          onClick={uploadHandler}
          className="p-1 rounded-xl border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
        >
          Upload
        </button>
      </div>
    </div>
  );
};
export default MemeTemplateSelectorImageUrl;
