import Pagination from './Pagination'
export type GetNewsRequest = NewsFilter & NewsSortBy & Pagination

export interface NewsFilter {
  tags?: string
  onlyNew?: boolean
  author?: string
  header?: string
  onlyDraft?: boolean
  offset?: number
  limit?: number
}

export type NewsSortBy = {
  field: 'publicationDate' | 'header'
  order: 'asc' | 'desc'
}
