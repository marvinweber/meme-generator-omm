import {
  mdiArrowLeftCircleOutline,
  mdiArrowRightCircleOutline,
  mdiPlayCircle,
  mdiPlayCircleOutline,
  mdiShuffleDisabled,
  mdiShuffleVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { apiMemeToMemeModel, MemeModel } from "../../lib/memeModel";
import {
  toggleAutoplay,
  toggleShuffle,
} from "../../store/slices/singleMemeViewSettingsSlice";
import Meme from "./meme/Meme";
import MemeComments from "./meme/MemeComments";

// frequency (in ms) how often a new meme should be loaded in autoplay mode
const AUTOPLAY_FREQUENCY = 1000 * 10; // 10 seconds

const MemeSingleView: React.FC<{ memeId: string }> = ({ memeId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const shuffle = useAppSelector(
    (state) => state.singleMemeViewSettings.shuffle
  );
  const autoplay = useAppSelector(
    (state) => state.singleMemeViewSettings.autoplay
  );
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timer>();

  const [memeReady, setMemeReady] = useState(false);
  const [meme, setMeme] = useState<MemeModel>();

  useEffect(() => {
    apiClient.get(`/memes/${memeId}`).then((res) => {
      if (res.data.success) {
        setMemeReady(true);
        setMeme(apiMemeToMemeModel(res.data.meme));
      }
    });
  }, [memeId]);

  const previousMeme = async () => {
    const previousMeme = await apiClient.get(`/memes/${memeId}/previous`);
    if (previousMeme.data.success && previousMeme.data.meme) {
      const id = previousMeme.data.meme._id;
      navigate(`/memes/${id}`);
    }
  };

  const nextMeme = async () => {
    // depending on whether shuffle is enabled: jump either to next meme or to random meme
    const endpoint = shuffle ? "random" : `${memeId}/next`;

    const nextMeme = await apiClient.get(`/memes/${endpoint}`);
    if (nextMeme.data.success && nextMeme.data.meme) {
      const id = nextMeme.data.meme._id;
      navigate(`/memes/${id}`);
    }
  };

  useEffect(() => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    if (autoplay) {
      const newInterval = setInterval(nextMeme, AUTOPLAY_FREQUENCY);
      setAutoplayInterval(newInterval);
    } else {
      setAutoplayInterval(undefined);
    }

    return () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };
  }, [autoplay, shuffle, memeId]);

  return memeReady && meme ? (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex-grow"></div>
        <div>
          <button onClick={() => dispatch(toggleShuffle(!shuffle))}>
            <Icon
              path={shuffle ? mdiShuffleVariant : mdiShuffleDisabled}
              size={1.5}
              color={shuffle ? "green" : "gray"}
            />
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(toggleAutoplay(!autoplay))}>
            <Icon
              path={autoplay ? mdiPlayCircle : mdiPlayCircleOutline}
              size={1.5}
              color={autoplay ? "green" : "gray"}
            />
          </button>
        </div>
      </div>
      <div className="mt-5 flex">
        <div
          className="flex items-center pr-2 cursor-pointer"
          onClick={previousMeme}
        >
          <Icon path={mdiArrowLeftCircleOutline} size={1.5} />
        </div>
        <Meme meme={meme} />
        <div
          className="flex items-center pl-2 cursor-pointer"
          onClick={nextMeme}
        >
          <Icon path={mdiArrowRightCircleOutline} size={1.5} />
        </div>
      </div>

      <hr className="my-5" />

      <MemeComments
        memeId={meme._id}
        comments={meme.comments}
        onNewComment={(newMeme) => setMeme(newMeme)}
      />

      <hr className="my-10" />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MemeSingleView;
