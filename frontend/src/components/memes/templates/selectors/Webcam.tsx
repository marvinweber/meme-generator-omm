import React, { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../..";
import dataURIToBlob from "../../../../lib/dataUriToBlob";

const MemeTemplateSelectorWebcam: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const templateNameRef = useRef<HTMLInputElement>(null);
  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string>();

  useEffect(() => {
    const video = videoRef.current;
    if (video && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          document.write(error);
        });
    }
  });

  /** Handler for uploading the selected file to the backend server. */
  const uploadHandler = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    const templateImage = canvas.toDataURL("image/jpg");
    setSnapshotDataUrl(templateImage);

    const templateName = templateNameRef?.current?.value || "Webcam Screenshot";
    const formData = new FormData();
    formData.append("template", dataURIToBlob(templateImage));
    formData.append("name", templateName);
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
        {snapshotDataUrl ? (
          <img src={snapshotDataUrl} alt="Snapshot of the Webcam" />
        ) : (
          <video ref={videoRef} autoPlay></video>
        )}
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
export default MemeTemplateSelectorWebcam;
