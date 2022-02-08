import React, { useEffect, useState } from "react";
import { SortingModel } from "../../../lib/sortingFilterModel";

const OverviewSorting: React.FC<{
  sortingModel: SortingModel;
  setSortingModel: (m: SortingModel) => void;
}> = ({ sortingModel, setSortingModel }) => {
  const [selectionValue, setSelectionValue] = useState<string>(
    sortingModelToSelectVal(sortingModel)
  );

  // ensure to update selection if model (from prop) changes
  useEffect(() => {
    setSelectionValue(sortingModelToSelectVal(sortingModel));
  }, [sortingModel]);

  const updateSorting = (selectVal: string) => {
    setSortingModel(selectValToSortingModel(selectVal));
    setSelectionValue(selectVal);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl">Sorting</h3>
      <select
        className="border-2 rounded-lg p-2"
        value={selectionValue}
        onChange={(e) => updateSorting(e.target.value)}
      >
        <option disabled>--- By Date ---</option>
        <option value="DATE_DESC">Latest First</option>
        <option value="DATE_ASC">Oldest First</option>
        <option disabled>--- By Metric ---</option>
        <option value="VIEWS_DESC">Most Views</option>
        <option value="VIEWS_ASC">Least Views</option>
        <option value="LIKES_DESC">Most Likes</option>
        <option value="LIKES_ASC">Least Likes</option>
        <option value="COMMENTS_DESC">Most Comments</option>
        <option value="COMMENTS_ASC">Least Comments</option>
      </select>
    </div>
  );
};
export default OverviewSorting;

function sortingModelToSelectVal(m: SortingModel): string {
  return `${m.field}_${m.direction}`;
}
function selectValToSortingModel(val: string): SortingModel {
  const [field, direction] = val.split("_");
  return {
    field,
    direction,
  } as SortingModel;
}
