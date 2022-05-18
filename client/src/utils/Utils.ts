import { NewsInfo, NewState, NewsUpdateRequest } from "../types/News";
import { Role, UserInfo, UserUpdateRequest } from "../types/User";

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

export function fromUser(user: UserInfo): UserUpdateRequest{
 return { tags: user.tags,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    showFirstName: user.showFirstName,
    showLastName: user.showLastName,
    showPhone: user.showPhone};
}

export function fromNewsInfo(news: NewsInfo): NewsUpdateRequest{
    return {id: news.id,
        header: news.header,
        description: news.description,
        tags: news.tags,
        state: news.state,
        publicationDate: news.publicationDate};
   }

export function getEmptyUser(): UserUpdateRequest{
    return { tags: [],
       firstName: '',
       lastName: '',
       phone: '',
       showFirstName: true,
       showLastName: true,
       showPhone: true
   }
}