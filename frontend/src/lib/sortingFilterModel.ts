export type SortingField = "DATE" | "VIEWS" | "LIKES" | "COMMENTS";
export type SortDirection = "ASC" | "DESC";

export type CompareOperation = "LESS_THAN" | "GREATER_THAN";

const SPORTING_FIELD_PARAM_NAME_MAPPING = {
  DATE: "createdAt",
  VIEWS: "viewCount",
  LIKES: "likeCount",
  COMMENTS: "commentCount",
};

const COMPARE_OPERATION_PARAM_NAME_MAPPING = {
  LESS_THAN: "$lt",
  GREATER_THAN: "$gt",
};

export interface DateFilter {
  value: string;
  operation: CompareOperation;
}

export interface StringFilter {
  value: string;
}

export interface NumericalFilter {
  value: number;
  operation: CompareOperation;
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

/**
 * Generate a axios request params object containing the filter/ sorting
 * configuration of the given model in the "backend-understandable-form".
 * 
 * @param m SortingFilter model to convert to axios request params.
 * @returns The axios request params as object.
 */
export function sortingFilterModelToAxiosReqParams(m: SortingFilterModel) {
  const model = {
    ...sortingModelToAxiosReqParams(m.sorting),
  };

  // add text search filters
  if (m.filter.title?.value && m.filter.title.value.length > 0) {
    model["title"] = m.filter.title.value;
  }
  if (m.filter.captions?.value && m.filter.captions.value.length > 0) {
    model["captions"] = m.filter.captions.value;
  }
  if (m.filter.tags?.value && m.filter.tags.value.length > 0) {
    model["tags"] = m.filter.tags.value;
  }
  if (m.filter.user?.value && m.filter.user.value.length > 0) {
    model["owner"] = m.filter.user.value;
  }
  if (m.filter.template?.value && m.filter.template.value.length > 0) {
    model["template"] = m.filter.template.value;
  }

  // add numerical / compare filters
  if (
    m.filter.createdAtFilter?.value &&
    m.filter.createdAtFilter.value.length > 0
  ) {
    const op =
      COMPARE_OPERATION_PARAM_NAME_MAPPING[m.filter.createdAtFilter.operation];
    model[`createdAt[${op}]`] = m.filter.createdAtFilter.value;
  }
  if (m.filter.views && m.filter.views?.value >= 0) {
    const op = COMPARE_OPERATION_PARAM_NAME_MAPPING[m.filter.views.operation];
    model[`viewCount[${op}]`] = m.filter.views.value;
  }
  if (m.filter.likes && m.filter.likes?.value >= 0) {
    const op = COMPARE_OPERATION_PARAM_NAME_MAPPING[m.filter.likes.operation];
    model[`likeCount[${op}]`] = m.filter.likes.value;
  }
  if (m.filter.comments && m.filter.comments?.value >= 0) {
    const op =
      COMPARE_OPERATION_PARAM_NAME_MAPPING[m.filter.comments.operation];
    model[`commentCount[${op}]`] = m.filter.comments.value;
  }
  return model;
}

function sortingModelToAxiosReqParams(m: SortingModel): any {
  const field = SPORTING_FIELD_PARAM_NAME_MAPPING[m.field];
  return {
    [`sort[${field}]`]: m.direction.toLowerCase(),
  };
}
