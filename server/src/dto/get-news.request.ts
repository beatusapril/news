import Pagination from './Pagination'
export type GetNewsRequest = NewsFilter & NewsSortBy & Pagination

export interface NewsFilter {
  tags?: string
  onlyNew?: boolean
  author?: number
  header?: string
  onlyDraft?: boolean
  offset?: number
  limit?: number
}

export type NewsSortBy = {
  field: 'publicationDate' | 'header'
  order: 'asc' | 'desc'
}
