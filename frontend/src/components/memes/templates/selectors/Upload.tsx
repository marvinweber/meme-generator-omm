import { mdiUploadOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useRef } from "react";
import { apiClient } from "../../../..";

const MemeTemplateSelectorUploadFile: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const templateNameRef = useRef<HTMLInputElement>(null);

  /** Handler for uploading the selected file to the backend server. */
  const uploadHandler = async () => {
    const selectedFiles = fileUploadRef?.current?.files;
    const templateName = templateNameRef?.current?.value;
    // no file selected -> no upload
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const file = selectedFiles[0];
    const formData = new FormData();
    formData.append("template", file);
    if (templateName) {
      formData.append("name", templateName);
    }

    const uploadResult = await apiClient.post(
      "/templates/upload/file",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
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
      <strong>Template Image Upload</strong>

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

      {/* File Selection */}
      <div className="flex flex-col md:flex-row justify-between">
        <input ref={fileUploadRef} type="file" accept="image/png, image/jpeg" />
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
export default MemeTemplateSelectorUploadFile;
