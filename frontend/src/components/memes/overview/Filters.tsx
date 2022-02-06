import React from "react";
import { FilterModel } from "../../../lib/sortingFilterModel";

const OverviewFilters: React.FC<{
  filterModel: FilterModel;
  setFilterModel: (m: FilterModel) => void;
}> = ({ filterModel, setFilterModel }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl">Search</h3>
      <div className="flex flex-col mb-8 mt-2">
        TODO
      </div>
      <h3 className="text-2xl">Filter</h3>
      <div className="flex flex-col mt-2">
        TODO
      </div>
    </div>
  );
};
export default OverviewFilters;
