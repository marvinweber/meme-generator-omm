import { useState } from "react";
import Expandable from "../util/Expandable";
import MemeEditor from "./editor/Editor";
import MemeTemplateSelection from "./templates/TemplateSelection";

export default function MemeEditorPage() {
  const [templateImageUrl, setTemplateImageUrl] = useState<string>();
  const [templateId, setTemplateId] = useState<string>();

  const onNewTemplate = (templateUrl: string, templateId?: string) => {
    setTemplateImageUrl(templateUrl);
    setTemplateId(templateId);
  };

  return (
    <>
      <h2 className="text-2xl mb-5">Meme Editor</h2>
      <Expandable
        heading="Template Selection"
        content={<MemeTemplateSelection onNewTemplate={onNewTemplate} />}
      />
      <hr className="my-2" />
      {templateImageUrl ? (
        <MemeEditor templateUrl={templateImageUrl} templateId={templateId} />
      ) : (
        <div>Select a Template to start creating your Meme!</div>
      )}
    </>
  );
}
