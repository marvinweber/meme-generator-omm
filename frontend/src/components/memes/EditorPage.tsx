import { useState } from "react";
import Expandable from "../util/Expandable";
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
      {/* TODO: Add Meme Editor */}
      <img src={templateImageUrl} />
    </>
  );
}
