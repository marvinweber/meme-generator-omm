import { mdiAlertCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import { apiClient } from "../../..";
import { useAppSelector } from "../../../hooks";
import {
  apiMemeToMemeModel,
  MemeComment,
  MemeModel,
} from "../../../lib/memeModel";

const MemeComments: React.FC<{
  memeId: string;
  comments: MemeComment[];
  onNewComment: (newMeme: MemeModel) => void;
}> = ({ memeId, comments, onNewComment }) => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const [comment, setComment] = useState<string>("");

  const postComment = async () => {
    const postCommentResponse = await apiClient.post(
      `/memes/${memeId}/comment`,
      { comment }
    );
    if (postCommentResponse.data.success) {
      setComment("");
      onNewComment(apiMemeToMemeModel(postCommentResponse.data.meme));
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl mb-5 mt-8 font-semibold">Comments</h3>

      {/* COMMENT LIST */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="p-2 flex flex-col shadow-md rounded-md"
          >
            <div className="text-sm text-slate-600 font-thin">
              {comment.author.name}&mdash;
              {new Date(comment.posted).toLocaleString()}
            </div>
            {comment.comment}
          </div>
        ))
      ) : (
        <div className="flex">
          <Icon path={mdiAlertCircleOutline} size={1} />
          <span className="ml-2">There are no comments yet...</span>
        </div>
      )}

      {/* NEW COMMENT */}
      {loggedIn ? (
        <div className="shadow-xl rounded-xl flex flex-col p-2 mt-8">
          <textarea
            className="p-2 border-2 rounded-lg border-slate-600 h-24 mb-2"
            placeholder="type something nice..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            onClick={postComment}
            className="p-2 border-2 rounded-lg border-emerald-500 text-emerald-500 hover:bg-emerald-500 
                     hover:text-white disabled:hover:bg-white disabled:text-emerald-500"
            disabled={comment.length === 0}
          >
            Post Comment
          </button>
        </div>
      ) : (
        <div className="flex mt-8">
          <Icon path={mdiAlertCircleOutline} size={1} />
          <span className="ml-2">You need to login to post a comment!</span>
        </div>
      )}
    </div>
  );
};
export default MemeComments;
