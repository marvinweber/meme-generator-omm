import Icon from "@mdi/react";
import React, { useState } from "react";

const TabbedContainer: React.FC<{
  titles: string[];
  contents: React.ReactNode[];
  icons?: string[];
  maxHeight?: number;
}> = ({ titles, contents, icons, maxHeight }) => {
  const [selectedTabIndex, setTabIndex] = useState(0);

  return (
    <div className="rounded-lg">
      <div className="flex overflow-x-auto">
        {titles.map((title, index) => (
          <button
            onClick={() => setTabIndex(index)}
            className={`flex-grow mr-2 last-of-type:mr-0 border p-2 border-slate-300 hover:bg-slate-200 rounded-t-md ${
              selectedTabIndex === index ? "bg-slate-200" : ""
            }`}
            key={index}
          >
            {icons && icons[index] ? (
              <div className="flex justify-center">
                <Icon path={icons[index]} size={1} className="mr-1" />
                {title}
              </div>
            ) : (
              <span>{title}</span>
            )}
          </button>
        ))}
      </div>
      <div
        className="border rounded-b-lg p-2 overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: maxHeight }}
      >
        {contents[selectedTabIndex]}
      </div>
    </div>
  );
};

export default TabbedContainer;
