export default class NewsResponse {
  id: number
  header: string
  description: string
  tags: string[]
  authorNickname: string
  authorFirstName?: string
  authorLastName?: string
  publicationDate?: Date
  author: number
  isRead: boolean

  constructor(props: NewsResponse) {
    this.header = props.header
    this.description = props.description
    this.tags = props.tags
    this.authorNickname = props.authorNickname
    this.authorFirstName = props.authorFirstName
    this.authorLastName = props.authorLastName
    this.id = props.id
    this.publicationDate = props.publicationDate
    this.author = props.author
    this.isRead = props.isRead
  }
}
