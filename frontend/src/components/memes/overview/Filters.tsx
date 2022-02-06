import { mdiCloseBoxOutline, mdiRefreshCircle } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import { CompareOperation, FilterModel } from "../../../lib/sortingFilterModel";

const OverviewFilters: React.FC<{
  filterModel: FilterModel;
  setFilterModel: (m: FilterModel) => void;
}> = ({ filterModel, setFilterModel }) => {
  // search fields
  const [title, setTitle] = useState(filterModel.title?.value || "");
  const [captions, setCaptions] = useState(filterModel.captions?.value || "");
  const [tags, setTags] = useState(filterModel.tags?.value || "");
  const [user, setUser] = useState(filterModel.user?.value || "");
  const [template, setTemplate] = useState(filterModel.template?.value || "");

  // filter fields
  const [date, setDate] = useState(filterModel.createdAtFilter?.value || "");
  const [dateOp, setDateOp] = useState<CompareOperation>(
    filterModel.createdAtFilter?.operation || "GREATER_THAN"
  );
  const [views, setViews] = useState(filterModel.views?.value || "");
  const [viewsOp, setViewsOp] = useState<CompareOperation>(
    filterModel.createdAtFilter?.operation || "GREATER_THAN"
  );
  const [likes, setLikes] = useState(filterModel.likes?.value || "");
  const [likesOp, setLikesOp] = useState<CompareOperation>(
    filterModel.createdAtFilter?.operation || "GREATER_THAN"
  );
  const [comments, setComments] = useState(filterModel.comments?.value || "");
  const [commentsOp, setCommentsOp] = useState<CompareOperation>(
    filterModel.createdAtFilter?.operation || "GREATER_THAN"
  );

  const updateSearch = () => {
    const newFilter = { ...filterModel };

    if (title && title.length > 0) {
      newFilter.title = { value: title };
    } else {
      delete newFilter.title;
    }
    if (captions && captions.length > 0) {
      newFilter.captions = { value: captions };
    } else {
      delete newFilter.captions;
    }
    if (tags && tags.length > 0) {
      newFilter.tags = { value: tags };
    } else {
      delete newFilter.tags;
    }
    if (user && user.length > 0) {
      newFilter.user = { value: user };
    } else {
      delete newFilter.user;
    }
    if (template && template.length > 0) {
      newFilter.template = { value: template };
    } else {
      delete newFilter.template;
    }

    setFilterModel(newFilter);
  };

  const updateFilters = () => {
    const newFilter = { ...filterModel };

    if (date && date.length > 0) {
      newFilter.createdAtFilter = { value: date, operation: dateOp };
    } else {
      delete newFilter.createdAtFilter;
    }
    if (views) {
      newFilter.views = {
        value: parseInt(views.toString()),
        operation: viewsOp,
      };
    } else {
      delete newFilter.views;
    }
    if (likes) {
      newFilter.likes = {
        value: parseInt(likes.toString()),
        operation: likesOp,
      };
    } else {
      delete newFilter.likes;
    }
    if (comments) {
      newFilter.comments = {
        value: parseInt(comments.toString()),
        operation: commentsOp,
      };
    } else {
      delete newFilter.comments;
    }

    setFilterModel(newFilter);
  };

  return (
    <div className="flex flex-col">
      {/* SEARCH */}
      <div className="flex mb-1">
        <h3 className="text-2xl">Search</h3>
        <div className="flex-grow"></div>
        <div className="shadow-md px-2 flex justify-center rounded-full hover:bg-slate-400 cursor-pointer">
          <button onClick={updateSearch}>
            <Icon
              path={mdiRefreshCircle}
              size={1.2}
              color="green"
              className="border-1"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-8 mt-2">
        <span className="text-xs text-right font-extralight text-gray-600">
          Meme Title
        </span>
        <input
          placeholder="Meme Title"
          className="border-2 rounded-lg p-2 mb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <span className="text-xs text-right font-extralight text-gray-600">
          Captions
        </span>
        <input
          placeholder="Captions"
          className="border-2 rounded-lg p-2 mb-1"
          value={captions}
          onChange={(e) => setCaptions(e.target.value)}
        />

        <span className="text-xs text-right font-extralight text-gray-600">
          Tags
        </span>
        <input
          placeholder="Tags"
          className="border-2 rounded-lg p-2 mb-1"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <span className="text-xs text-right font-extralight text-gray-600">
          User
        </span>
        <input
          placeholder="User"
          className="border-2 rounded-lg p-2 mb-1"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <span className="text-xs text-right font-extralight text-gray-600">
          Template Name
        </span>
        <input
          placeholder="Template Name"
          className="border-2 rounded-lg p-2 mb-1"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="flex mt-2 mb-1">
        <h3 className="text-2xl">Filter</h3>
        <div className="flex-grow"></div>
        <div className="shadow-md px-2 flex justify-center rounded-full hover:bg-slate-400 cursor-pointer">
          <button onClick={updateFilters}>
            <Icon
              path={mdiRefreshCircle}
              size={1.2}
              color="green"
              className="border-1"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-xs font-extralight text-gray-600">
          Creation Date
        </span>
        <div className="flex justify-between">
          <select
            className="border-2 rounded-lg p-2 mb-1"
            value={dateOp}
            onChange={(e) => setDateOp(e.target.value as CompareOperation)}
          >
            <option value="GREATER_THAN">after</option>
            <option value="LESS_THAN">before</option>
          </select>
          <input
            type="datetime-local"
            className="border-2 rounded-lg p-2 mb-1 w-100"
            placeholder="views"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={() => setDate("")}>
            <Icon path={mdiCloseBoxOutline} size={1.7} color="gray" />
          </button>
        </div>

        <span className="text-xs font-extralight text-gray-600">Views</span>
        <div className="flex justify-between">
          <select
            className="border-2 rounded-lg p-2 mb-1"
            value={viewsOp}
            onChange={(e) => setViewsOp(e.target.value as CompareOperation)}
          >
            <option value="GREATER_THAN">more than</option>
            <option value="LESS_THAN">less than</option>
          </select>
          <input
            type="number"
            className="border-2 rounded-lg p-2 mb-1"
            placeholder="views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
          <button onClick={() => setViews("")}>
            <Icon path={mdiCloseBoxOutline} size={1.7} color="gray" />
          </button>
        </div>

        <span className="text-xs font-extralight text-gray-600">Likes</span>
        <div className="flex justify-between">
          <select
            className="border-2 rounded-lg p-2 mb-1"
            value={likesOp}
            onChange={(e) => setLikesOp(e.target.value as CompareOperation)}
          >
            <option value="GREATER_THAN">more than</option>
            <option value="LESS_THAN">less than</option>
          </select>
          <input
            type="number"
            className="border-2 rounded-lg p-2 mb-1"
            placeholder="likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
          <button onClick={() => setLikes("")}>
            <Icon path={mdiCloseBoxOutline} size={1.7} color="gray" />
          </button>
        </div>

        <span className="text-xs font-extralight text-gray-600">Comments</span>
        <div className="flex justify-between">
          <select
            className="border-2 rounded-lg p-2 mb-1"
            value={commentsOp}
            onChange={(e) => setCommentsOp(e.target.value as CompareOperation)}
          >
            <option value="GREATER_THAN">more than</option>
            <option value="LESS_THAN">less than</option>
          </select>
          <input
            type="number"
            className="border-2 rounded-lg p-2 mb-1"
            placeholder="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button onClick={() => setComments("")}>
            <Icon path={mdiCloseBoxOutline} size={1.7} color="gray" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default OverviewFilters;
