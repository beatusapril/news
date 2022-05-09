export interface TagInputProps{
    tags: string[],
    onDelete: (name: string) => void,
    addTag: (name: string) => void
}