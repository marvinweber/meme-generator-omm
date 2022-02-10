import { mdiCloseOctagonOutline, mdiDeleteCircle, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { apiClient } from "../..";

export default function UserMemes() {
  const [memes, setMemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ctr, setCtr] = useState(0);

  // hook to load memes of user initially (and on ctr increase/ change)
  useEffect(() => {
    setLoading(true);
    apiClient.get("/user/memes").then((res) => {
      if (res.data.success) {
        setMemes(res.data.memes);
      }
      setLoading(false);
    });
  }, [ctr]);

  /** Send request to backend to delete meme with given id. */
  const deleteMeme = async (memeId: string) => {
    setLoading(true);
    const res = await apiClient.delete(`/memes/${memeId}`);
    if (res.data.success) {
      setCtr(ctr + 1);
    } else {
      alert("Could not delete the meme!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-5">
        <Icon path={mdiLoading} size={1} spin={true} />
        <span>Loading memes...</span>
      </div>
    );
  } else if (memes.length === 0) {
    return (
      <div className="flex justify-center p-5">
        <Icon path={mdiCloseOctagonOutline} size={1} className="mr-1" />
        <span>You have no memes!</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col max-h-96 overflow-y-auto p-2">
        {memes.map((meme) => (
          <div
            key={meme._id}
            className="flex justify-between my-2 p-2 rounded-lg items-center border"
          >
            <div className="flex flex-col">
              <span className="text-xl">{meme.title}</span>
              <span className="text-sm text-slate-700">
                {new Date(meme.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => deleteMeme(meme._id)}
                className="flex justify-center text-sm border p-1 rounded-md text-red-700 border-red-700 hover:bg-red-600 hover:text-white"
              >
                <Icon path={mdiDeleteCircle} size={0.8} className="mr-1" />
                Delete
              </button>
            </div>
            <div className="w-32">
              <img src={meme.url} alt={meme.title} className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
