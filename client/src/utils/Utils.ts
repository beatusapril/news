import { Role } from "../types/User";

export function fromNumberRole(number: number){
    switch(number){
        case 0:
            return Role.reader;
        case 1:
            return Role.writer;
        case 2:
            return Role.admin;
        default:
            return null;
    }
}