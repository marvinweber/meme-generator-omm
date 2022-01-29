import React, { useState } from "react";

const Expandable: React.FC<{ heading: string; content: React.ReactNode }> = ({
  heading,
  content,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-gray-500 shadow-md rounded-lg p-2">
      <div className="flex justify-between">
        <h3 className="text-xl">{heading}</h3>
        <button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"}
        </button>
      </div>
      {open ? (
        <div className="border-t-2 p-2">
          {content}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Expandable;
