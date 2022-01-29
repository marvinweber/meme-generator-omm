import React, { useRef } from "react";
import { apiClient } from "../../../..";

const MemeTemplateSelectorUploadFile: React.FC<{
  onNewTemplateUrl: (url: string) => void;
}> = ({ onNewTemplateUrl }) => {
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
      onNewTemplateUrl(uploadResult.data.templates[0].url);
    } else {
      console.error("Could not upload template!");
    }
  };

  return (
    <div className="flex flex-col">
      <strong>Template Image Upload</strong>
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
        <input ref={fileUploadRef} type="file" accept="image/png, image/jpeg" />
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
export default MemeTemplateSelectorUploadFile;
