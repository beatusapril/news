export interface TagProps{
    name: string,
    onUpdate: (name: string, newName: string) => void;
    onDelete: (name: string) => void;
}