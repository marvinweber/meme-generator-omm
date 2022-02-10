import { mdiCloseOctagonOutline, mdiLoading } from "@mdi/js";
import { Icon } from "@mdi/react";
import React, { useEffect, useState } from "react";
import { apiClient } from "../../../..";

const MemeTemplateSelectorBrowse: React.FC<{
  onNewTemplate: (url: string, id?: string) => void;
}> = ({ onNewTemplate }) => {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);

  // hook to initially load available templates from backend
  useEffect(() => {
    setLoading(true);
    apiClient.get("/templates").then((res) => {
      setTemplates(res.data.templates);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-5">
        <Icon path={mdiLoading} size={1} spin={true} />
        <span>Loading templates...</span>
      </div>
    );
  } else if (templates.length === 0) {
    return (
      <div className="flex justify-center p-5">
        <Icon path={mdiCloseOctagonOutline} size={1} className="mr-1" />
        <span>There are no templates yet!</span>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <div
            key={template._id}
            style={{ backgroundImage: `url(${template.url})` }}
            className="h-48 rounded-sm shadow-xl hover:scale-110 flex items-end transform cursor-pointer bg-cover"
            onClick={() => onNewTemplate(template.url, template._id)}
          >
            <div className="p-2 bg-gray-200 bg-opacity-50 text-xs rounded-xl m-1">
              {template.name}
            </div>
          </div>
        ))}
      </div>
    );
  }
};
export default MemeTemplateSelectorBrowse;
