import React from "react";
import TabbedContainer from "../../util/TabbedContainer";
import MemeTemplateSelectorBrowse from "./selectors/Browse";
import MemeTemplateSelectorUploadFile from "./selectors/Upload";

const MemeTemplateSelection: React.FC<{
  onNewTemplateUrl: (url: string) => void;
}> = ({ onNewTemplateUrl }) => {
  const contents = [
    <MemeTemplateSelectorBrowse onNewTemplateUrl={onNewTemplateUrl} />,
    <MemeTemplateSelectorUploadFile onNewTemplateUrl={onNewTemplateUrl} />,
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
