import { useState } from "react";
import Expandable from "../util/Expandable";
import MemeEditor from "./editor/Editor";
import MemeTemplateSelection from "./templates/TemplateSelection";

export default function MemeEditorPage() {
  const [templateImageUrl, setTemplateImageUrl] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <h2 className="text-2xl mb-5">Meme Editor</h2>
      <Expandable
        heading="Template Selection"
        content={
          <MemeTemplateSelection onNewTemplateUrl={setTemplateImageUrl} />
        }
      />
      <hr className="my-2" />
      {templateImageUrl ? <MemeEditor templateUrl={templateImageUrl} /> : (
        <div>
          Select a Template to start creating your Meme!
        </div>
      )}
    </>
  );
}
