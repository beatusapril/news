import { Fragment, useEffect, useState } from "react";
import { PaginationProps } from "./PaginationTypes";
import '../pagination/Pagination.css'

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1): any => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

export function Pagination(props: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageNeighbours, setPageNeighbours] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(props.totalRecords / props.pageLimit))
        setPageNeighbours(Math.max(0, Math.min(props.pageNeighbours, 2)))
    }, [props.totalRecords, props.pageLimit, props.pageNeighbours])

    function gotoPage(page: number) {
        const onPageChanged = props.onPageChanged;

        const currentPage = Math.max(0, Math.min(page, totalPages));

        const paginationData = {
            currentPage: currentPage,
            totalPages:totalPages,
            pageLimit: props.pageLimit,
            totalRecords: props.totalRecords
        };
        setCurrentPage(currentPage);
        onPageChanged(paginationData)
    }

    useEffect(() => {
        gotoPage(1);
    }, [])

    const handleClick = (page: any) => (evt: any) => {
        evt.preventDefault();
        gotoPage(page);
    }

    function handleMoveLeft(evt: any) {
        evt.preventDefault();
        gotoPage(currentPage - (pageNeighbours * 2) - 1);
    }

    function handleMoveRight (evt: any) {
        evt.preventDefault();
        gotoPage(currentPage + (pageNeighbours * 2) + 1);
    }

    
    function fetchPageNumbers() {
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage);

           
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];

        }

        return range(1, totalPages);

    }

    if (!props.totalRecords || totalPages === 1) return null;
    const pages = fetchPageNumbers();

    return (
        <Fragment>
            <nav aria-label="Countries Pagination">
                <ul className="pagination">
                    {pages.map((page: any, index: any) => {

                        if (page === LEFT_PAGE) return (
                            <li key={index} className="page-item">
                                <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                        );

                        if (page === RIGHT_PAGE) return (
                            <li key={index} className="page-item">
                                <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        );

                        return (
                            <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                <a className="page-link" href="#" onClick={handleClick(page)}>{page}</a>
                            </li>
                        );

                    })}

                </ul>
            </nav>
        </Fragment>
    );
}