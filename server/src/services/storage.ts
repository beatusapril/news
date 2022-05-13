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
        return Storage.news.filter(n => n.state === State.published )
            //&& n.publicationDate < new Date())
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
        const news = []
        news.push(this.addNews(new News({
            header: 'Admin news!',
            description: 'Lorem ipsum news. News have more symbols in ',
            tags: new Set(['general', 'news']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Euro falls back towards 2017 lows on Russian energy crisis!',
            description: `The euro hovered near its weakest point since early 2017 on Friday after Russian sanctions 
            led to disruptions in gas supplies to Europe, renewing fears about an economic slowdown in the euro zone `,
            tags: new Set(['general']),
            state: State.published,
            publicationDate: new Date(),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'European gas prices soar after Moscow imposes sanctions on EU energy companies',
            description: `
            Russia’s state-owned gas supplier has said it will cut shipments 
            to Europe through a major pipeline, sending prices surging and reinforcing 
            President Vladimir Putin’s willingness to use energy as a weapon against the EU.
         `,
            tags: new Set(['general']),
            state: State.published,
            publicationDate: new Date("2022-05-13"),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Croatia Passes Law Paving Way for Euro Currency Introduction',
            description: `ZAGREB, Croatia (AP) — Croatian lawmakers on Friday approved a law that paves the way for the introduction of the euro currency next year.

            Croatia is due to replace the Croatian kuna with the euro on Jan. 1, 2023. Lawmakers voted 117-13 in 
            favor of legislation to bring in the euro. One lawmaker abstained in the 151-member parliament.`,
            tags: new Set(['general']),
            state: State.published,
            publicationDate: new Date("2022-05-13"),
            author: id
        })))
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
            header: 'The Euro is currently the weakest it’s been in years!',
            description: `Americans with a European holiday in your sights, here’s some fantastic news. 
            The Euro is currently at the lowest value it’s been in years. As of today (May 12), 
            it’s valued at $1.05 to the dollar, which is the weakest the Eurozone currency has been since January 2017.
Whichever way you cut it, $1.05 is an astonishingly low value for the Euro. For context, just a year ago the currency was at $1.20 to the dollar. In real terms, this essentially means that if you’re an American visiting Europe, your cash will go much further. A €200 hotel room which one year ago cost $240 would now cost just $210. Pretty crazy stuff, eh? `,
            tags: new Set(['general', 'art']),
            state: State.published,
            publicationDate: new Date("2022-05-08"),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'Euro bounces off lows but heads for big weekly loss',
            description: `LONDON : The euro edged off five-year lows to rise back above $1.04 on Friday, but it is headed for a big weekly loss after Russia's decision to restrict gas supplies to Europe renewed fears about an economic slowdown in the euro zone.`,
            tags: new Set(['general', 'news']),
            state: State.published,
            publicationDate: new Date("2022-05-08"),
            author: id
        })))
        news.push(this.addNews(new News({
            header: 'CEB to lend 2 mln euro for Ukrainian refugees in Bulgaria, Moldova, Baltics',
            description: `SOFIA (Bulgaria), May 13 (SeeNews) - The Council of Europe Development Bank (CEB) said it will grant close to 2 million euro ($2.1 million) from its Migrant and Refugee Fund (MRF) to help support people fleeing the war in Ukraine into Bulgaria, Moldova, Estonia and Lithuania.`,
            tags: new Set(['general', 'politics']),
            state: State.published,
            publicationDate: new Date("2022-05-08"),
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
