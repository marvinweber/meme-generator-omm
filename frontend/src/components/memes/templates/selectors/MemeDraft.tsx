import { mdiDeleteCircle } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { apiClient } from "../../../..";
import { MemeConfig } from "../../../../lib/memeConfigInterface";

const MemeTemplateSelectorMemeDraft: React.FC<{
  onMemeDraftSelected: (
    templateUrl: string,
    memeConfig: MemeConfig,
    templateId?: string
  ) => void;
}> = ({ onMemeDraftSelected }) => {
  const [memeDrafts, setMemeDrafts] = useState<any[]>([]);
  const [ctr, setCtr] = useState(0);

  useEffect(() => {
    apiClient.get("/memes/drafts").then((res) => {
      if (res.data.success) {
        setMemeDrafts(res.data.memeDrafts);
        console.log(memeDrafts);
      }
    });
  }, [ctr]);

  const deleteMemeDraft = async (memeDraftId: string) => {
    const res = await apiClient.delete(`/memes/drafts/${memeDraftId}`);
    if (res.data.success) {
      // trigger reloading meme drafts
      setCtr(ctr + 1);
    } else {
      alert("Something went wrong :(");
    }
  };

  return (
    <div className="">
      <ul>
        {memeDrafts.map((draft) => (
          <li key={draft._id}>
            <div className="flex justify-between my-2">
              <span
                className="cursor-pointer"
                onClick={() =>
                  onMemeDraftSelected(
                    draft.templateUrl,
                    JSON.parse(draft.memeConfig) as MemeConfig,
                    draft.templateId
                  )
                }
              >
                {draft.name} &mdash;{" "}
                {new Date(draft.createdAt).toLocaleString()}
              </span>
              <button onClick={() => deleteMemeDraft(draft._id)}>
                <Icon path={mdiDeleteCircle} size={1} color="red" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MemeTemplateSelectorMemeDraft;
