import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PAGE_LIMIT } from "../../../consts/consts";
import { getDrafts, getTotalCountDrafts, getUser } from "../../../selectors/selectors";
import { fetchDraftsNewsAction } from "../../../store/drafts/draftsAction";
import { Store } from "../../../store/Types";
import { NewsInfo, NewsRequest } from "../../../types/News";
import { UserInfo } from "../../../types/User";
import { Header } from "../../header/Header";
import { Pagination } from "../../pagination/Pagination";
import { PaginationData } from "../../pagination/PaginationTypes";
import { NewCard } from "../newCard/NewCard";
import { TagInput } from "../tagInput/TagInput";

export function Drafts(){
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    const [filter, setFilter] = useState<NewsRequest>({
        tags: null,
        onlyNew: null,
        author: null,
        header: null,
        offset: 0,
        onlyDraft: true,
        limit: PAGE_LIMIT
    });
    const totalCount = useSelector<Store, number>(state => getTotalCountDrafts(state));
    const news = useSelector<Store, NewsInfo[]>(state => getDrafts(state));
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchDraftsNewsAction({ ...filter}));
    }, []);

    const onPageChanged = (data: PaginationData) => {
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        if (offset < 0) {
            return;
        }
        const newFilter = { ...filter, offset: offset, limit: pageLimit };
        setFilter(newFilter);
        dispatch(fetchDraftsNewsAction(newFilter));
    }

    const onReload = () => {
        dispatch(fetchDraftsNewsAction({ ...filter}));
    }

    return <div>
        <Header />
        {user && <div className="wrapper">
            <div className="news-wrapper">
                <div className="news-block">
                    <div className="news-block-center">
                        {news && news.map(newInfo => <NewCard card={newInfo} reload={onReload} draft={true}/>)}
                    </div>
                    <div>
                        <Pagination totalRecords={totalCount} pageLimit={PAGE_LIMIT} pageNeighbours={1} onPageChanged={onPageChanged} />
                    </div>
                </div>
                <div className="news-link-block">
                    <ul className="news-link-block__navigation-menu">
                        <li><Link className="navigation-menu__item" to="/news">News</Link></li>
                        <li><Link className="navigation-menu__item" to="/news-subscribe">News subscribe</Link></li>
                        <li><Link className="navigation-menu__item navigation-menu__current" to="/drafts">Drafts</Link></li>
                    </ul>
                </div>
            </div>
        </div>}</div>
}