export interface ErrorResponse {
  code: string;
  userMessage: string;
}

export interface ApiResponse<TModel> {
  code: string;
  results: TModel;
}

export interface Pagination<TModel> {
  pageNumber: number;
  firstPage: number;
  lastPage: number;
  recordsPerPage: number;
  nextPage: number;
  previousPage: number;
  totalRecords: number;
  records: TModel[];
}

export const EMPTY_PAGINATION_VALUES = {
  nextPage: 0,
  lastPage: 0,
  firstPage: 0,
  previousPage: 0,
  totalRecords: 0,
  pageNumber: 1,
  recordsPerPage: 100,
  records: [],
};
