export interface IPaginationOptions {
  page: number
  limit: number
}

export interface IPaginationOutput {
  currentPage: number
  totalPages: number
}

export interface IPaginationQueryParams {
  page: string
  limit: string
}
