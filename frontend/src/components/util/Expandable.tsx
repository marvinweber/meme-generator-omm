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
          <div className="flex items-center text-slate-600">
            <span className="text-xs mr-1">
              {open ? "Close" : "Open"}
            </span>
            <Icon
              path={open ? mdiArrowUpCircleOutline : mdiArrowDownCircleOutline}
              size={.9}
              className="text-inherit"
            />
          </div>
        </button>
      </div>
      {open ? <div className="border-t mt-2 p-2">{content}</div> : <></>}
    </div>
  );
};

export default Expandable;
