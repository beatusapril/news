import { State } from '../entities/News'

export default class UpdateNewsRequest {
  header: string
  description: string
  tags: string[]
  state: State
  publicationDate?: string

  constructor(props: UpdateNewsRequest) {
    this.header = props.header
    this.description = props.description
    this.tags = props.tags
    this.state = props.state
    this.publicationDate = props.publicationDate
  }
}
