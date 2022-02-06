import React from "react";
import SortingFilterModel, {
  FilterModel,
  SortingModel,
} from "../../../lib/sortingFilterModel";
import OverviewFilters from "./Filters";
import OverviewSorting from "./Sorting";

const OverviewSortingAndFilters: React.FC<{
  model: SortingFilterModel;
  setModel: (m: SortingFilterModel) => void;
}> = ({ model, setModel }) => {
  const onNewSorting = (m: SortingModel) => {
    const newModel = { ...model };
    newModel.sorting = m;
    setModel(newModel);
  };

  const onNewFilter = (m: FilterModel) => {
    const newModel = { ...model };
    newModel.filter = m;
    setModel(newModel);
  };

  return (
    <div>
      <div className="mb-8 p-2 shadow-lg rounded-lg bg-slate-100">
        <OverviewSorting
          sortingModel={model.sorting}
          setSortingModel={onNewSorting}
        />
      </div>

      <div className="mb-8 p-2 shadow-lg rounded-lg bg-slate-100">
        <OverviewFilters
          filterModel={model.filter}
          setFilterModel={onNewFilter}
        />
      </div>
    </div>
  );
};
export default OverviewSortingAndFilters;
