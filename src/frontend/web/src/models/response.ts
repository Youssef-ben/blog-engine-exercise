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
