import React from "react";
import TabbedContainer from "../../util/TabbedContainer";
import MemeTemplateSelectorBrowse from "./selectors/Browse";
import MemeTemplateSelectorUploadFile from "./selectors/Upload";

const MemeTemplateSelection: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const contents = [
    <MemeTemplateSelectorBrowse onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorUploadFile onNewTemplate={onNewTemplate} />,
    <div>TODO</div>,
    <div>TODO</div>,
    <div>TODO</div>,
    <div>TODO</div>,
  ];
  const titles = [
    "Browse",
    "Upload",
    "From URL",
    "Website Screenshot",
    "Record from camera",
    "Draw",
  ];
  return (
    <div>
      <TabbedContainer titles={titles} contents={contents} maxHeight={500} />
    </div>
  );
};
export default MemeTemplateSelection;
