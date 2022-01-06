import { Model, Query, Document } from 'mongoose';
import { PageLimiter } from './apiFeatures';

export type QueryObject = {
    page?: number;
    limit?: number;
}

class Pagination<T> implements PageLimiter {
    queryObject: { page: number, limit: number }
    totalResults: number = 0;
    currentPage: number = 0;
    pageSize: number = 0;
    totalPages: number = 0;
    resultsFrom: number = 0;
    resultsTo: number = 0;
    prevPage: number = 0;
    nextPage: number = 0;
    hasNextPage: boolean = false;
    hasPreviousPage: boolean = false;
    message: string = '';

    constructor(public model: Model<T>, queryObject: QueryObject, collectionCount: number) {
        this.queryObject = { page: 0, limit: 10, ...queryObject }
        this.totalResults = collectionCount;
    }

    async init() {
        this.currentPage = Number(this.queryObject.page);
        this.pageSize = Number(this.queryObject.limit);
        this.totalPages = Math.ceil(this.totalResults / this.pageSize);
        this.resultsFrom = (this.currentPage * this.pageSize) + 1 <= this.totalResults && (this.currentPage * this.pageSize) + 1 || this.totalResults;
        this.resultsTo = (this.currentPage + 1) * this.pageSize <= this.totalResults && (this.currentPage + 1) * this.pageSize || this.totalResults;
        this.prevPage = this.currentPage - 1 >= 0 ? this.currentPage - 1 : 0;
        this.nextPage = this.currentPage + 1;
        this.hasNextPage = this.currentPage + 1 < this.totalPages;
        this.hasPreviousPage = this.currentPage > 0;
        this.message = `Showing ${this.resultsFrom} to ${this.resultsTo} of ${this.totalResults} results`;
        return this;
    }

    static async build(model: Model<Document>, queryObject: QueryObject, collectionCount: number) {
        return await (new Pagination(model, queryObject, collectionCount)).init();
    }

    paginate(query: any) {
        return query.limit(this.pageSize).skip(this.currentPage * this.pageSize);
    }
}

export default Pagination;