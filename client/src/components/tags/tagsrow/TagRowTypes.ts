export interface TagProps{
    name: string,
    onUpdate: (name: string, newName: string) => void;
}