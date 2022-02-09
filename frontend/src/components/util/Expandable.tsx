import { mdiArrowDownCircleOutline, mdiArrowUpCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";

const Expandable: React.FC<{ heading: string; content: React.ReactNode }> = ({
  heading,
  content,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg p-2 border">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">{heading}</h3>
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded-md border border-slate-300 hover:bg-slate-200"
        >
          <div className="flex items-center">
            <span className="text-slate-600 text-xs mr-1">
              {open ? "Close" : "Open"}
            </span>
            <Icon
              path={open ? mdiArrowUpCircleOutline : mdiArrowDownCircleOutline}
              size={1}
            />
          </div>
        </button>
      </div>
      {open ? <div className="border-t-2 mt-2 p-2">{content}</div> : <></>}
    </div>
  );
};

export default Expandable;
