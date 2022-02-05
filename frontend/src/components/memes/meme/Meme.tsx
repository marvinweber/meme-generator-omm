import {
  mdiCommentMultipleOutline,
  mdiDownload,
  mdiHeart,
  mdiShareVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiClient } from "../../..";
import { useAppSelector } from "../../../hooks";
import { MemeModel } from "../../../lib/memeModel";

const Meme: React.FC<{
  meme: MemeModel;
}> = ({ meme }) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const userId = useAppSelector((state) => state.user.user._id);
  const [memeViewUrl, setMemeViewUrl] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState(meme.likes);
  const [likeCount, setLikeCount] = useState(meme.likeCount);

  useEffect(() => {
    const protocol = document.location.protocol;
    const host = document.location.host;
    setMemeViewUrl(`${protocol}//${host}/memes/${meme.id}`);
  }, [meme]);

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
    const response = await apiClient.post(`/memes/${meme.id}/${endpoint}`);
    if (response.data.success) {
      setLikeCount(response.data.meme.likeCount);
      setLikes(response.data.meme.likes);
    }
  };

  const share = () => {
    navigator.clipboard.writeText(memeViewUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const download = () => {
    window.open(meme.url, "_blank");
  };

  return (
    <div className="flex flex-col flex-grow">
      <NavLink to={`/memes/${meme.id}`}>
        <h1 className="text-4xl">{meme.title}</h1>
      </NavLink>
      <div>{meme.tags.map((m) => `#${m}`).join(" ")}</div>
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
export default Meme;
