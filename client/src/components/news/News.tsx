import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { ADMIN, PAGE_LIMIT, WRITER } from "../../consts/consts";
import { getNews, getTotalCountNews, getUser } from "../../selectors/selectors";
import { newsFetchAction } from "../../store/news/newsAction";
import { Store } from "../../store/Types";
import { NewsInfo, NewsRequest } from "../../types/News";
import { UserInfo } from "../../types/User";
import { Header } from "../header/Header";
import { NotAuth } from "../helpers/NotAuth";
import { Pagination } from "../pagination/Pagination";
import { PaginationData } from "../pagination/PaginationTypes";
import { Filter } from "./filter/Filter";
import { NewCard } from "./newCard/NewCard";
import '../news/News.css'

export function News() {

    const pageLimit = PAGE_LIMIT;
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    const [filter, setFilter] = useState<NewsRequest>({
        tags: null,
        onlyNew: null,
        author: null,
        header: null,
        offset: 0,
        limit: pageLimit
    });
    const totalCount = useSelector<Store, number>(state => getTotalCountNews(state));
    const news = useSelector<Store, NewsInfo[]>(state => getNews(state));
    const dispatch = useDispatch();
    useEffect(() => { dispatch(newsFetchAction(filter)) }, [])

    const onPageChanged = (data: PaginationData) => {
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        if (offset < 0) {
            return;
        }
        const newFilter = { ...filter, offset: offset, limit: pageLimit };
        setFilter(newFilter);
        dispatch(newsFetchAction(newFilter));
    }

    const onSubmit = (filterParam: NewsRequest) => {
        const filterNew = {
            ...filter, tags: filterParam.tags,
            onlyNew: filterParam.onlyNew,
            author: filterParam.author,
            header: filterParam.header
        }
        setFilter(filterNew);
        dispatch(newsFetchAction(filterNew));
    }

    const onReset = (filterParam: NewsRequest) => {
        const filterNew = {
            ...filter, tags: filterParam.tags,
            onlyNew: filterParam.onlyNew,
            author: filterParam.author,
            header: filterParam.header
        }
        setFilter(filterNew);
        dispatch(newsFetchAction(filterNew));
    }

    const onReload = () => {
        dispatch(newsFetchAction(filter));
    }

    return <>{!user && <NotAuth />}
        <Header />
        {user && <div className="wrapper">
            <div className="news-wrapper">
                <Filter onSubmit={onSubmit} onReset={onReset} />
                <div className="news-block">
                    <div className="news-block-center">
                        {news && news.map(newInfo => <NewCard card={newInfo} reload={onReload}/>)}
                    </div>
                    <div className="pagination">
                        <Pagination totalRecords={totalCount} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
                    </div>
                </div>
                <div className="news-link-block">
                    <div>
                        <ul className="news-link-block__navigation-menu">
                            <li className="navigation-menu__item navigation-menu__current"><Link to="/news">News</Link></li>
                            <li className="navigation-menu__item"><Link to="/news-subscribe">News subscribe</Link></li>
                        </ul>
                    </div>
                    {(user.role === ADMIN || user.role === WRITER) && <div><Link to="/news/create" className="news-link-block_add-news">Add news</Link></div>}
                </div>
            </div>
        </div>
        }</>
}