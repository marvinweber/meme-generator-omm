import { mdiCloseOctagonOutline, mdiDeleteCircle, mdiLoading } from "@mdi/js";
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
  const [loading, setLoading] = useState(true);
  const [ctr, setCtr] = useState(0);

  // hook to trigger loading of meme drafts
  useEffect(() => {
    setLoading(true);
    apiClient.get("/memes/drafts").then((res) => {
      if (res.data.success) {
        setMemeDrafts(res.data.memeDrafts);
        setLoading(false);
      }
    });
  }, [ctr]);

  const deleteMemeDraft = async (memeDraftId: string) => {
    setLoading(true);
    const res = await apiClient.delete(`/memes/drafts/${memeDraftId}`);
    if (res.data.success) {
      // trigger reloading meme drafts
      setCtr(ctr + 1);
    } else {
      alert("Something went wrong :(");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-5">
        <Icon path={mdiLoading} size={1} spin={true} />
        <span>Loading drafts...</span>
      </div>
    );
  } else if (memeDrafts.length === 0) {
    return (
      <div className="flex justify-center p-5">
        <Icon path={mdiCloseOctagonOutline} size={1} className="mr-1" />
        <span>You have no drafts!</span>
      </div>
    );
  } else {
    return (
      <ul>
        {memeDrafts.map((draft) => (
          <li key={draft._id}>
            <div className="flex justify-between my-2 p-2 shadow-lg rounded-lg items-center">
              <span
                className="cursor-pointer text-orange-900 hover:underline"
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
              <button
                onClick={() => deleteMemeDraft(draft._id)}
                className="flex text-sm border p-1 rounded-md text-red-700 border-red-700 hover:bg-red-600 hover:text-white"
              >
                <Icon path={mdiDeleteCircle} size={0.8} className="mr-1" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
};
export default MemeTemplateSelectorMemeDraft;
