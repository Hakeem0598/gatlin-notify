import React from 'react';
import { Link } from 'react-router-dom';

export type PaginationProps = {
    totalPages: number;
    currentPage: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    nextPage: number;
    prevPage: number;
    message: string;
    goToPage(queryString: string): void;
}

const Pagination = ({ totalPages, currentPage, hasPreviousPage, hasNextPage, nextPage, prevPage, message,  goToPage }: PaginationProps) => {

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="px-4 py-3 border-t border-gray-800 sm:px-6 w-full">
            <div className="flex-1 flex justify-between sm:hidden">
                <Link
                    to="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </Link>
                <Link
                    to="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </Link>
            </div>

            <div className="hidden sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-200 font-medium">
                        { message }
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex items-center space-x-4 text-sm" aria-label="Pagination">
                        <button
                            onClick={() => goToPage(`?page=${prevPage}`)}
                            disabled={!hasPreviousPage}
                            className="disabled:opacity-50 disabled:cursor-not-allowed hover:underline relative text-gray-500 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            Previous
                        </button>
                        {
                            pageNumbers.map(number => (
                                <div
                                    key={number}
                                    onClick={() => goToPage(`?page=${number - 1}`)}
                                    className={`${number - 1 === currentPage && 'py-1 px-2.5 rounded-full bg-white bg-opacity-20'} cursor-pointer`}
                                >
                                    <span className={`${number - 1 === currentPage ? 'text-white' : 'text-gray-500'}`}>
                                        {number}
                                    </span>
                                </div>
                            ))
                        }
                        <button
                            onClick={() => goToPage(`?page=${nextPage}`)}
                            disabled={!hasNextPage}
                            className="disabled:opacity-50 disabled:cursor-not-allowed hover:underline relative text-gray-500 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination;