import { mdiArrowDownCircleOutline, mdiArrowUpCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";

const Expandable: React.FC<{ heading: string; content: React.ReactNode }> = ({
  heading,
  content,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border">
      <div
        onClick={() => setOpen(!open)}
        className="flex p-2 justify-between items-center cursor-pointer
                   hover:bg-slate-200 rounded-lg"
      >
        <h3 className="text-xl">{heading}</h3>
        <Icon
          path={open ? mdiArrowUpCircleOutline : mdiArrowDownCircleOutline}
          size={0.9}
          className="text-inherit"
        />
      </div>
      {open ? <div className="border-t mt-2 p-2">{content}</div> : <></>}
    </div>
  );
};

export default Expandable;
