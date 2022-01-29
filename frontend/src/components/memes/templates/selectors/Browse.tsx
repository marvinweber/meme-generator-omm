import React, { useEffect, useState } from "react";
import { apiClient } from "../../../..";

const MemeTemplateSelectorBrowse: React.FC<{
  onNewTemplateUrl: (url: string) => void;
}> = ({ onNewTemplateUrl }) => {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    apiClient.get("/templates").then((res) => {
      setTemplates(res.data.templates);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((template) => (
        <div
          key={template._id}
          style={{ backgroundImage: `url(${template.url})` }}
          className="h-48 rounded-sm shadow-xl hover:scale-110 flex items-end transform cursor-pointer bg-cover"
          onClick={() => onNewTemplateUrl(template.url)}
        >
          <div className="p-2 bg-gray-200 bg-opacity-50 text-xs rounded-xl m-1">
            {template.name}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MemeTemplateSelectorBrowse;
