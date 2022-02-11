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

  /** Upate filter if a keyboard event was caused by an Enter click. */
  const onEnterPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    clb: CallableFunction
  ) => {
    if (e.code === "Enter") {
      clb();
    }
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
        <div className="flex items-center">
          <input
            placeholder="Meme Title"
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateSearch)}
          />
          <button onClick={() => setTitle("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        <span className="text-xs text-right font-extralight text-gray-600">
          Captions
        </span>
        <div className="flex items-center">
          <input
            placeholder="Captions"
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            value={captions}
            onChange={(e) => setCaptions(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateSearch)}
          />
          <button onClick={() => setCaptions("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        <span className="text-xs text-right font-extralight text-gray-600">
          Tags
        </span>
        <div className="flex items-center">
          <input
            placeholder="Tags"
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateSearch)}
          />
          <button onClick={() => setTags("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        <span className="text-xs text-right font-extralight text-gray-600">
          User
        </span>
        <div className="flex items-center">
          <input
            placeholder="User"
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateSearch)}
          />
          <button onClick={() => setUser("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        <span className="text-xs text-right font-extralight text-gray-600">
          Template Name
        </span>
        <div className="flex items-center">
          <input
            placeholder="Template Name"
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateSearch)}
          />
          <button onClick={() => setTemplate("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>
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
        {/* Date + Time */}
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
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            placeholder="views"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              updateFilters();
            }}
          />
          <button onClick={() => setDate("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        {/* Views */}
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
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            placeholder="views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateFilters)}
          />
          <button onClick={() => setViews("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        {/* Likes */}
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
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            placeholder="likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateFilters)}
          />
          <button onClick={() => setLikes("")}>
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>

        {/* Comments */}
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
            className="border-2 rounded-lg p-2 mb-1 flex-grow"
            placeholder="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            onKeyPress={(e) => onEnterPress(e, updateFilters)}
          />
          <button
            onClick={() => {
              setComments("");
              updateFilters();
            }}
          >
            <Icon
              path={mdiCloseBoxOutline}
              size={1}
              className="text-slate-700 hover:text-red-700"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default OverviewFilters;
