import { mdiCloseOctagonOutline, mdiDeleteCircle, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { apiClient } from "../..";

export default function UserTemplates() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ctr, setCtr] = useState(0);

  // hook to load templates of user initially (and on ctr increase/ change)
  useEffect(() => {
    setLoading(true);
    apiClient.get("/user/templates").then((res) => {
      if (res.data.success) {
        setTemplates(res.data.templates);
      }
      setLoading(false);
    });
  }, [ctr]);

  /** Send request to backend to delete template with given id. */
  const deleteTemplate = async (templateId: string) => {
    setLoading(true);
    const res = await apiClient.delete(`/templates/${templateId}`);
    if (res.data.success) {
      setCtr(ctr + 1);
    } else {
      alert("Could not delete the template!");
    }
  };

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
        <span>You have no templates uploaded yet!</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col max-h-96 overflow-y-auto p-2">
        {templates.map((template) => (
          <div
            key={template._id}
            className="flex justify-between my-2 p-2 rounded-lg items-center border"
          >
            <div className="flex flex-col">
              <span className="text-xl">{template.name}</span>
              <span className="text-sm text-slate-700">
                {new Date(template.uploadedAt).toLocaleString()}
              </span>
              <button
                onClick={() => deleteTemplate(template._id)}
                className="flex justify-center text-sm border p-1 rounded-md text-red-700 border-red-700 hover:bg-red-600 hover:text-white"
              >
                <Icon path={mdiDeleteCircle} size={0.8} className="mr-1" />
                Delete
              </button>
            </div>
            <div className="w-32">
              <img src={template.url} alt={template.name} className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
