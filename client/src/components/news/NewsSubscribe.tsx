import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { PAGE_LIMIT } from "../../consts/consts";
import {  getSubscribeNews, getTotalCountSubscribeNews, getUser } from "../../selectors/selectors";
import { newsFetchAction } from "../../store/news/newsAction";
import { fetchSubscribeNewsAction } from "../../store/subscribeNews/SubscribeNewsAction";
import { Store } from "../../store/Types";
import { meUpdateAction } from "../../store/user/actionUser";
import { NewInfo, NewsRequest } from "../../types/News";
import { UserInfo } from "../../types/User";
import { fromUser } from "../../utils/Utils";
import { Header } from "../header/Header";
import { NotAuth } from "../helpers/NotAuth";
import { Pagination } from "../pagination/Pagination";
import { PaginationData } from "../pagination/PaginationTypes";
import { NewCard } from "./newCard/NewCard";
import { TagInput } from "./tagInput/TagInput";

export function NewsSubscribe() {
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
    const totalCount = useSelector<Store, number>(state => getTotalCountSubscribeNews(state));
    const news = useSelector<Store, NewInfo[]>(state => getSubscribeNews(state));
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.tags && user.tags.length > 0) {
            setFilter({ ...filter, tags: user.tags });
            dispatch(fetchSubscribeNewsAction({ ...filter, tags: user.tags }));

        }
    }, [filter.tags]);

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
            dispatch(meUpdateAction(fromUser({ ...user, tags: newTags })));
        }
    }
    const addTag = (tagNew: string) => {
        if (user && user.tags !== null && user.tags !== undefined && tagNew) {
            if (user.tags?.filter(tag => tag === tagNew).length > 0) {
                return;
            };
            const newTags = [...user.tags, tagNew];
            dispatch(meUpdateAction(fromUser({ ...user, tags: newTags })));
        }
    }

    return <div>
        <Header />
        {user && <div>
            <span>News subscribe</span>
            <div>
                <ul>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/news-subscribe">News subscribe</Link></li>
                </ul>
            </div>
            <TagInput tags={user.tags} onDelete={onDelete} addTag={addTag}></TagInput>
            {user && (!user.tags || user.tags.length < 1) && <div>Not have select tags</div>}
            {news && news.map(newInfo => <NewCard card={newInfo} />)}
            <div>
                <Pagination totalRecords={totalCount} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
            </div>
        </div>}</div>
}