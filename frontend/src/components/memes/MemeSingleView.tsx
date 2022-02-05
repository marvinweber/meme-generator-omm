import { mdiArrowLeftCircleOutline, mdiArrowRightCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../..";
import { apiMemeToMemeModel, MemeModel } from "../../lib/memeModel";
import Meme from "./meme/Meme";

const MemeSingleView: React.FC<{ memeId: string }> = ({ memeId }) => {
  const navigate = useNavigate();
  const [memeReady, setMemeReady] = useState(false);
  const [meme, setMeme] = useState<MemeModel>();

  useEffect(() => {
    apiClient.get(`/memes/${memeId}`).then((res) => {
      if (res.data.success) {
        setMemeReady(true);
        setMeme(apiMemeToMemeModel(res.data.meme))
      }
    });
  }, [memeId]);

  const previousMeme = async () => {
    const previousMeme = await apiClient.get(`/memes/${memeId}/previous`);
    if (previousMeme.data.success && previousMeme.data.meme.length > 0) {
      const id = previousMeme.data.meme[0]._id
      navigate(`/memes/${id}`);
    }
  };

  const nextMeme = async () => {
    const nextMeme = await apiClient.get(`/memes/${memeId}/next`);
    if (nextMeme.data.success && nextMeme.data.meme.length > 0) {
      const id = nextMeme.data.meme[0]._id
      navigate(`/memes/${id}`);
    }
  };

  return memeReady && meme ? (
    <div className="mt-5 flex">
      <div
        className="flex items-center pr-2 cursor-pointer"
        onClick={previousMeme}
      >
        <Icon path={mdiArrowLeftCircleOutline} size={1.5} />
      </div>
      <Meme meme={meme} />
      <div className="flex items-center pl-2 cursor-pointer" onClick={nextMeme}>
        <Icon path={mdiArrowRightCircleOutline} size={1.5} />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MemeSingleView;
