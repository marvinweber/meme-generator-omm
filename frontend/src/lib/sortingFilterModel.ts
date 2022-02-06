export type SortingField = "DATE" | "VIEWS" | "LIKES" | "COMMENTS";
export type SortDirection = "ASC" | "DESC";

export type COMPARE_OPERATION = "LESS_THAN" | "GREATER_THAN";

const SPORTING_FIELD_PARAM_NAME_MAPPING = {
  DATE: "createdAt",
  VIEWS: "viewCount",
  LIKES: "likeCount",
  COMMENTS: "commentCount",
};

export interface DateFilter {
  value: string;
  operation: COMPARE_OPERATION;
}

export interface StringFilter {
  value: string;
}

export interface NumericalFilter {
  value: number;
  operation: COMPARE_OPERATION;
}

export interface SortingModel {
  field: SortingField;
  direction: SortDirection;
}

export interface FilterModel {
  createdAtFilter?: DateFilter;

  title?: StringFilter;
  captions?: StringFilter;
  tags?: StringFilter;
  template?: StringFilter;
  user?: StringFilter;

  views?: NumericalFilter;
  likes?: NumericalFilter;
  comments?: NumericalFilter;
}

export default interface SortingFilterModel {
  sorting: SortingModel;
  filter: FilterModel;
}

export function getDefaultSortingFilterModel(): SortingFilterModel {
  return {
    // sort descending by date (latest first) by default
    sorting: {
      field: "DATE",
      direction: "DESC",
    },
    // empty filter by default
    filter: {},
  };
}

export function sortingFilterModelToAxiosReqParams(m: SortingFilterModel) {
  return {
    ...sortingModelToAxiosReqParams(m.sorting),
  };
}

function sortingModelToAxiosReqParams(m: SortingModel): any {
  const field = SPORTING_FIELD_PARAM_NAME_MAPPING[m.field]
  return {
    [`sort[${field}]`]: m.direction.toLowerCase(),
  };
}
