import React, { useState } from "react";

const TabbedContainer: React.FC<{
  titles: string[];
  contents: React.ReactNode[];
  maxHeight?: number;
}> = ({ titles, contents, maxHeight }) => {
  const [selectedTabIndex, setTabIndex] = useState(0);

  return (
    <div className="shadow-gray-500 shadow-md rounded-lg p-2">
      <div className="flex overflow-x-auto">
        {titles.map((title, index) => (
          <button
            onClick={() => setTabIndex(index)}
            className={`mr-2 ${selectedTabIndex === index ? "underline" : ""}`}
            key={index}
          >
            {title}
          </button>
        ))}
      </div>
      <div
        className="border-t-2 p-2 overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: maxHeight }}
      >
        {contents[selectedTabIndex]}
      </div>
    </div>
  );
};

export default TabbedContainer;
