import React from "react";
import TabbedContainer from "../../util/TabbedContainer";
import MemeTemplateSelectorBrowse from "./selectors/Browse";
import MemeTemplateSelectorImageUrl from "./selectors/ImageUrl";
import MemeTemplateSelectorUploadFile from "./selectors/Upload";
import MemeTemplateSelectorWebcam from "./selectors/Webcam";

const MemeTemplateSelection: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const contents = [
    <MemeTemplateSelectorBrowse onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorUploadFile onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorImageUrl onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorWebcam onNewTemplate={onNewTemplate} />,
  ];
  const titles = [
    "Browse",
    "Upload",
    "From URL",
    "Record from camera",
  ];
  return (
    <div>
      <TabbedContainer titles={titles} contents={contents} maxHeight={500} />
    </div>
  );
};
export default MemeTemplateSelection;
