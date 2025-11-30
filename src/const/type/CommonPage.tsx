export type CommonPage<T> = {
    list: Array<T>,
    pageNo: number,
    pageSize: number,
    totalPage: number,
    total: number
}