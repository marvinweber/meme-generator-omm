import {
  mdiCommentMultipleOutline,
  mdiCounter,
  mdiDownload,
  mdiHeart,
  mdiImageFrame,
  mdiShareVariant,
  mdiTextToSpeech,
} from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiClient } from "../../..";
import { useAppSelector } from "../../../hooks";
import { MemeModel } from "../../../lib/memeModel";
import memeToSpeech from "../../../lib/memeToSpeech";

const Meme: React.FC<{
  meme: MemeModel;
  /** Flag whether to count interactions (likes, share, download, meme to
   *  speech) as meme view. Defaults to false. Only one view is counted over
   *  the lifetime of the component (no matter how many interactions are
   *  made). */
  countInteractionsAsView?: boolean;
}> = ({ meme, countInteractionsAsView }) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const userId = useAppSelector((state) => state.user.user._id);
  const [memeViewUrl, setMemeViewUrl] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState(meme.likes);
  const [likeCount, setLikeCount] = useState(meme.likeCount);
  const [memeToSpeechActive, setMemeToSpeechActive] = useState(false);
  const viewCounted = useRef(false);

  // update values depending on meme
  useEffect(() => {
    // like data
    setLikes(meme.likes);
    setLikeCount(meme.likeCount);

    // single view url of the meme
    const protocol = document.location.protocol;
    const host = document.location.host;
    setMemeViewUrl(`${protocol}//${host}/memes/${meme.id}`);
  }, [meme]);

  // hook to update the "is liked" status whenever new likes are available
  // or the user login state changes
  useEffect(() => {
    const liked = likes.filter((like) => like.liker._id === userId).length > 0;
    setIsLiked(liked);
  }, [loggedIn, userId, likes]);

  const toggleLike = async () => {
    // only logged in user can like
    if (!loggedIn) {
      return;
    }

    const endpoint = isLiked ? "unlike" : "like";
    const response = await apiClient.post(`/memes/${meme._id}/${endpoint}`);
    if (response.data.success) {
      setLikeCount(response.data.meme.likeCount);
      setLikes(response.data.meme.likes);
    }
    countView();
  };

  const share = () => {
    navigator.clipboard.writeText(memeViewUrl).then(() => {
      alert("Link copied to clipboard!");
    });
    countView();
  };

  const download = () => {
    window.open(meme.url, "_blank");
    countView();
  };

  const onMemeToSpeech = () => {
    setMemeToSpeechActive(true);
    memeToSpeech(meme).then(() => setMemeToSpeechActive(false));
    countView();
  };

  const countView = () => {
    // skip view count if not requested via prop or already done
    if (!countInteractionsAsView || viewCounted.current) {
      return;
    }

    viewCounted.current = true;
    apiClient.get(`/memes/${meme._id}`, {
      params: { countView: "true" },
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between">
        <NavLink to={`/memes/${meme.id}`}>
          <h1 className="text-4xl">{meme.title}</h1>
        </NavLink>
        <button onClick={onMemeToSpeech} disabled={memeToSpeechActive}>
          <Icon
            path={mdiTextToSpeech}
            size={1.5}
            color={memeToSpeechActive ? "green" : "black"}
            spin={memeToSpeechActive}
          />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>{meme.tags.map((m) => `#${m}`).join(" ")}</div>
        {meme?.template?.name ? (
          <div className="flex items-center text-slate-600" title="Template">
            <span className="text-xs mr-1">{meme?.template?.name}</span>
            <Icon path={mdiImageFrame} size={0.8} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-2">
        <NavLink to={`/memes/${meme.id}`}>
          <img
            src={meme.url}
            alt={`${meme.title}: ${meme.captions.join("; ")}`}
            className="w-full rounded-lg shadow-lg"
          />
        </NavLink>
      </div>
      <div className="flex mt-2">
        {/* Name and Upload Date */}
        <div className="flex flex-col">
          <span className="font-semibold tracking-wide">
            {meme.owner?.name || "Unkown"}
          </span>
          <span className="font-thin text-slate-600">
            {meme.createdAt.toLocaleString()}
          </span>
        </div>

        {/* spacer between name/date and social actions */}
        <div className="flex-grow"></div>

        {/* Download Button */}
        <div className="flex items-center mr-3">
          <button onClick={download}>
            <Icon path={mdiDownload} size={1} />
          </button>
        </div>

        {/* Share Button */}
        <div className="flex items-center mr-3">
          <button onClick={share}>
            <Icon path={mdiShareVariant} size={1} />
          </button>
        </div>

        {/* View Count */}
        <div className="flex items-center mr-3" title="Views">
          <Icon path={mdiCounter} size={1} />
          <span>{meme.viewCount}</span>
        </div>

        {/* Comment Count */}
        <div className="flex items-center mr-3">
          <Icon path={mdiCommentMultipleOutline} size={1} />
          <span>{meme.commentCount}</span>
        </div>

        {/* Like Count & Like Button*/}
        <div className="flex items-center">
          <button onClick={toggleLike}>
            <Icon path={mdiHeart} size={1} color={isLiked ? "red" : "gray"} />
          </button>
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

Meme.defaultProps = {
  countInteractionsAsView: false,
};

export default Meme;
