export type Pagination = {
 [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>,
  page: number,
  per_page: number,
}