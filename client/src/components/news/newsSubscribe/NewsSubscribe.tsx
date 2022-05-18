import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { PAGE_LIMIT } from "../../../consts/consts";
import { getSubscribeNews, getTotalCountSubscribeNews, getUser } from "../../../selectors/selectors";
import { newsFetchAction } from "../../../store/news/newsAction";
import { fetchSubscribeNewsAction, resetSubscribeNews } from "../../../store/subscribeNews/SubscribeNewsAction";
import { Store } from "../../../store/Types";
import { fetchMeAction, meUpdateAction } from "../../../store/user/actionUser";
import { NewsInfo, NewsRequest } from "../../../types/News";
import { UserInfo } from "../../../types/User";
import { fromUser } from "../../../utils/Utils";
import { Header } from "../../header/Header";
import { Pagination } from "../../pagination/Pagination";
import { PaginationData } from "../../pagination/PaginationTypes";
import { NewCard } from "../newCard/NewCard";
import { TagInput } from "../tagInput/TagInput";
import '../newsSubscribe/NewsSubscribe.css'

export function NewsSubscribe() {
    const pageLimit = PAGE_LIMIT;
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    const [filter, setFilter] = useState<NewsRequest>({
        tags: null,
        onlyNew: null,
        author: null,
        header: null,
        offset: 0,
        onlyDraft: null,
        limit: pageLimit
    });
    const totalCount = useSelector<Store, number>(state => getTotalCountSubscribeNews(state));
    const news = useSelector<Store, NewsInfo[]>(state => getSubscribeNews(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMeAction())
    }, [filter.tags, dispatch]);

    useEffect(() => {
        if (user?.tags && user.tags.length > 0) {
            setFilter({ ...filter, tags: user.tags });
            dispatch(fetchSubscribeNewsAction({ ...filter, tags: user.tags }));

        }
    }, []);

    const onPageChanged = (data: PaginationData) => {
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        if (offset < 0) {
            return;
        }
        const newFilter = { ...filter, offset: offset, limit: pageLimit };
        setFilter(newFilter);
        dispatch(fetchSubscribeNewsAction(newFilter));
    }

    const onDelete = (name: string) => {
        if (user && user.tags !== null && user.tags !== undefined) {
            const newTags = [...user.tags?.filter(tag => tag != name)];
            setFilter({ ...filter, tags: newTags })
            dispatch(meUpdateAction(fromUser({ ...user, tags: newTags })));
        }
    }
    const addTag = (tagNew: string) => {
        if (user && user.tags !== null && user.tags !== undefined && tagNew) {
            if (user.tags?.filter(tag => tag === tagNew).length > 0) {
                return;
            };
            const newTags = [...user.tags, tagNew];
            setFilter({ ...filter, tags: newTags })
            dispatch(meUpdateAction(fromUser({ ...user, tags: newTags })));
        }
    }

    const onApply= () =>{
        if (user && user.tags && user.tags.length > 0){
            dispatch(fetchSubscribeNewsAction({ ...filter, tags: user.tags }));
        }
        if (user && (!user.tags || user.tags.length <= 0)){
            dispatch(resetSubscribeNews())
        }
    }

    const onReload = () => {
        if (user && user.tags && user.tags.length > 0){
            dispatch(fetchSubscribeNewsAction({ ...filter, tags: user.tags }));
        }
        if (user && (!user.tags || user.tags.length <= 0)){
            dispatch(resetSubscribeNews())
        }
    }

    return <div>
        <Header />
        {user && <div className="wrapper">
            <div className="news-wrapper">
                <div className="news-subscribe__tags">
                    <TagInput tags={user.tags} onDelete={onDelete} addTag={addTag}></TagInput>
                    {(!user.tags || user.tags.length < 1) && <div>Not have select tags</div>}
                    <button className="btn btn-custom news-subscribe-btn-apply" onClick={onApply}>Apply</button>
                </div>
                <div className="news-block">
                    <div className="news-block-center">
                        {news && news.map(newInfo => <NewCard card={newInfo} reload={onReload} draft={false}/>)}
                    </div>
                    <div>
                        <Pagination totalRecords={totalCount} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
                    </div>
                </div>
                <div className="news-link-block">
                    <ul className="news-link-block__navigation-menu">
                        <li><Link className="navigation-menu__item" to="/news">News</Link></li>
                        <li><Link className="navigation-menu__item navigation-menu__current" to="/news-subscribe">News subscribe</Link></li>
                        <li><Link className="navigation-menu__item" to="/drafts">Drafts</Link></li>
                    </ul>
                </div>
            </div>
        </div>}</div>
}