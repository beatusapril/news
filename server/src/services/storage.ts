import {AuthData, Role} from '../entities/AuthData'
import News, {State} from '../entities/News'
import User from '../entities/User'

export default class Storage {
    public static news: News[] = []
    public static users: Map<number, User> = new Map<number, User>() // by id
    public static tags: Set<string> = new Set<string>(['general', 'politics', 'news', 'art'])
    public static authorities: Map<string, AuthData> = new Map<string, AuthData>() // by string 'user@password'
    public static authorized: Map<string, AuthData> = new Map<string, AuthData>() // by token
    public static admins: User[] = []

    private static newsIndex: number = 1
    private static userIndex: number = 1

    public static get publishedNews() {
        return Storage.news.filter(n => n.state === State.published && n.publicationDate < new Date())
    }

    public static addNews(item: News) {
        const id = this.newsIndex++
        this.news.push({...item, id})
        return id
    }

    public static addUser(item: User) {
        const id = this.userIndex++
        this.users.set(id, {...item, id})
        return id
    }

    public static init() {
        // add admin
        let id = Storage.userIndex++
        this.users.set(
            id,
            {
                id,
                firstName: '-',
                lastName: '-',
                nickname: '-',
                tags: [],
                readNewsList: new Set<number>(),
                myNewsList: []
            }
        )
        this.admins.push(this.users.get(id))
        this.authorities.set(
            'admin@admin',
            {
                login: 'admin',
                password: 'admin',
                role: Role.admin,
                userId: id
            }
        )
        // add author and news
        id = Storage.userIndex++
        const news = []
        // published one
        news.push(this.addNews(new News({
            header: 'Important thing!',
            description: '1A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'news']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '2A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '3A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '4A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '5A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '6A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '7A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '8A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '9A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '10A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '11A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '12A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '13A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '14A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '15A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '16A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '17A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '18A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '19A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '20A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '21A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '22A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '23A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '24A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '25A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '26A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '27A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '28A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '29A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Breaking news!',
            description: '30A thing happened here yestarday. Details are being ascertained.',
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        // draft one
        news.push(this.addNews(new News({
            header: 'A draft thing!',
            description: 'This news is not published yet.To be done.',
            tags: new Set(['news']),
            state: State.draft,
            author: id
        })))
        this.users.set(
            id,
            {
                id,
                firstName: 'Author',
                lastName: 'Author',
                nickname: 'author',
                tags: [],
                readNewsList: new Set<number>(),
                myNewsList: news
            }
        )
        this.authorities.set(
            'author@author',
            {
                login: 'author',
                password: 'author',
                role: Role.writer,
                userId: id
            }
        )
        // add reader
        id = Storage.userIndex++
        this.users.set(
            id,
            {
                id,
                firstName: 'Reader',
                lastName: 'reader',
                nickname: 'reader',
                tags: [],
                readNewsList: new Set<number>(),
                myNewsList: []
            }
        )
        this.authorities.set(
            'reader@reader',
            {
                login: 'reader',
                password: 'reader',
                role: Role.reader,
                userId: id
            }
        )
    }
}
