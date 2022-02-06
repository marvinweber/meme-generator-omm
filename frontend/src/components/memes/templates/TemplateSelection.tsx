import React from "react";
import { MemeConfig } from "../../../lib/memeConfigInterface";
import TabbedContainer from "../../util/TabbedContainer";
import MemeTemplateSelectorBrowse from "./selectors/Browse";
import MemeTemplateSelectorImageUrl from "./selectors/ImageUrl";
import MemeTemplateSelectorMemeDraft from "./selectors/MemeDraft";
import MemeTemplateSelectorUploadFile from "./selectors/Upload";
import MemeTemplateSelectorWebcam from "./selectors/Webcam";

const MemeTemplateSelection: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
  onMemeDraftSelected: (
    templateUrl: string,
    memeConfig: MemeConfig,
    templateId?: string
  ) => void;
}> = ({ onNewTemplate, onMemeDraftSelected }) => {
  const contents = [
    <MemeTemplateSelectorBrowse onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorUploadFile onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorImageUrl onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorWebcam onNewTemplate={onNewTemplate} />,
    <MemeTemplateSelectorMemeDraft onMemeDraftSelected={onMemeDraftSelected} />,
  ];
  const titles = [
    "Browse",
    "Upload",
    "From URL",
    "Record from camera",
    "Meme Draft",
  ];
  return (
    <div>
      <TabbedContainer titles={titles} contents={contents} maxHeight={500} />
    </div>
  );
};
export default MemeTemplateSelection;
