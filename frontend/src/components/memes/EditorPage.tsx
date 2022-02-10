import { mdiImageMultiple } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useState } from "react";
import { MemeConfig } from "../../lib/memeConfigInterface";
import Expandable from "../util/Expandable";
import MemeEditor from "./editor/Editor";
import MemeTemplateSelection from "./templates/TemplateSelection";

export default function MemeEditorPage() {
  const [templateImageUrl, setTemplateImageUrl] = useState<string>();
  const [templateId, setTemplateId] = useState<string>();
  const [memeConfig, setMemeConfig] = useState<MemeConfig>({ texts: [] });

  const onNewTemplate = (templateUrl: string, templateId?: string) => {
    setTemplateImageUrl(templateUrl);
    setTemplateId(templateId);
  };

  const onMemeDraftSelected = (
    templateUrl: string,
    memeConfig: MemeConfig,
    templateId?: string
  ) => {
    setTemplateImageUrl(templateUrl);
    setMemeConfig(memeConfig);
    setTemplateId(templateId);
  };

  return (
    <>
      <Expandable
        heading="Template Selection"
        content={
          <MemeTemplateSelection
            onNewTemplate={onNewTemplate}
            onMemeDraftSelected={onMemeDraftSelected}
          />
        }
      />

      <hr className="my-5" />

      {templateImageUrl ? (
        <MemeEditor
          templateUrl={templateImageUrl}
          templateId={templateId}
          memeConfig={memeConfig}
          setMemeConfig={setMemeConfig}
        />
      ) : (
        <div className="flex justify-center">
        <Icon path={mdiImageMultiple} size={1} className="mr-1" />
        <span>Select a template to create a meme.</span>
      </div>
      )}
    </>
  );
}
