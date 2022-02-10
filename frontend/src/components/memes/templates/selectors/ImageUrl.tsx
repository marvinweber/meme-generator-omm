import { mdiUploadOutline } from "@mdi/js";
import Icon from "@mdi/react";
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
      name: templateName,
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
      <strong>Add Template via URL</strong>

      {/* Template Name */}
      <div className="flex flex-col my-3">
        <span className="text-sm">Optional name for the template:</span>
        <input
          ref={templateNameRef}
          type="text"
          placeholder="Template Name"
          name="templateName"
          className="border rounded-md p-1 flex-grow"
        />
      </div>

      {/* URL Input */}
      <div className="flex flex-col md:flex-row justify-between">
        <input
          ref={imageUrlRef}
          type="text"
          placeholder="URL to the image (https only)"
          className="flex-grow p-1 border rounded-md"
        />
        <button
          onClick={uploadHandler}
          className="p-1 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-400 
                     hover:text-white flex items-center justify-center"
        >
          <Icon path={mdiUploadOutline} size={0.8} />
          Upload
        </button>
      </div>
    </div>
  );
};
export default MemeTemplateSelectorImageUrl;
