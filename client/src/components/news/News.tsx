import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getNews, getTotalCountNews, getUser } from "../../selectors/selectors";
import {  newsFetchAction } from "../../store/news/newsAction";
import { Store } from "../../store/Types";
import { NewInfo, NewsRequest } from "../../types/News";
import { UserInfo } from "../../types/User";
import { Header } from "../header/Header";
import { Pagination } from "../pagination/Pagination";
import { PaginationData } from "../pagination/PaginationTypes";
import { Filter } from "./filter/Filter";
import { NewCard } from "./newCard/NewCard";

export function News() {

    const pageLimit = 5;
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
    const news = useSelector<Store, NewInfo[]>(state => getNews(state));
    const dispatch = useDispatch();
    useEffect(() => { dispatch(newsFetchAction(filter)) }, [])

    const onPageChanged = (data: PaginationData) => {
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const newFilter = { ...filter, offset: offset, limit: pageLimit };
        setFilter(newFilter);
        dispatch(newsFetchAction(newFilter));
    }

    if (!user && !localStorage.getItem("auth")){
        return <Navigate to="/"/>
    }

    const onSubmit = (filterParam: NewsRequest) => {
        const filterNew = {...filter, tags: filterParam.tags,
            onlyNew: filterParam.onlyNew,
            author: filterParam.author,
            header: filterParam.header}
        setFilter(filterNew);
        dispatch(newsFetchAction(filterNew));
    }

    const onReset = (filterParam: NewsRequest) => {
        const filterNew = {...filter, tags: filterParam.tags,
            onlyNew: filterParam.onlyNew,
            author: filterParam.author,
            header: filterParam.header}
        setFilter(filterNew);
        dispatch(newsFetchAction(filterNew));
    }

    return <div>
        <Header/>
        <Filter onSubmit={onSubmit} onReset={onReset}/>
        <span>News</span>
        {news && news.map(newInfo => <NewCard card={newInfo}/>)}
        <div>
         <Pagination totalRecords={totalCount} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
        </div>
    </div>;
}