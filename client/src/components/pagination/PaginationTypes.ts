export interface PaginationData{
    totalRecords: number,
    pageLimit: number,
    totalPages: number,
    currentPage: number
}

export interface PaginationProps{
    totalRecords: number,
    pageLimit: number,
    pageNeighbours: number,
    onPageChanged: (data: PaginationData) => void
}