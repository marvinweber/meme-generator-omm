import { mdiCamera } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../..";
import dataURIToBlob from "../../../../lib/dataUriToBlob";

const MemeTemplateSelectorWebcam: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const templateNameRef = useRef<HTMLInputElement>(null);
  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string>();

  // hook to initially request access to media devices and start video stream
  // of the webcam
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
      <strong>Create Template from Webcam</strong>

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

      {/* Webcam */}
      <div className="flex">
        <div className="rounded-l-lg">
          {snapshotDataUrl ? (
            <img className="rounded-l-lg" src={snapshotDataUrl} alt="Snapshot of the Webcam" />
          ) : (
            <video className="rounded-l-lg" ref={videoRef} autoPlay></video>
          )}
        </div>
        <div className="flex-grow">
          <button
            onClick={uploadHandler}
            className="p-1 rounded-r-lg border border-blue-500 text-blue-500 hover:bg-blue-400 
                     hover:text-white flex items-center justify-center
                      w-full h-full"
          >
            <Icon path={mdiCamera} size={0.8} />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
export default MemeTemplateSelectorWebcam;
