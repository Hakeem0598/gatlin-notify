import { Model, Query, Document, HydratedDocument } from 'mongoose';
import Pagination from './pagination';
import _ from 'lodash';


type QueryString = {
    page?: number;
    limit?: number;
    fields?: string;
    sort?: string;
}

type Features = 'page' | 'sort' | 'limit' | 'fields';

export interface PageLimiter {
    totalResults: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    resultsFrom: number;
    resultsTo: number;
    prevPage: number;
    nextPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    message: string;
    paginate(query: any): any;
}

class APIFeatures<T extends Document> {
    query: any;
    pagination = {} as PageLimiter;
    queryObject: { page: number; limit: number; fields: string, sort: string };
    collectionCount: number = 0;
    defaultQueryObject = {
        page: 0,
        limit: 10,
        fields: '-_id,-__v,-updatedAt',
        sort: '-createdAt'
    }

    constructor(public model: Model<T>, queryString: QueryString) {
        this.model = model;
        this.queryObject = { ...this.defaultQueryObject, ...queryString };
    }

    async init(): Promise<this> {
        await this.filter();
        this.pagination = await Pagination.build(this.model, this.queryObject, this.collectionCount);
        return this;
    }

    static async build (model: Model<Document>, queryString: QueryString) {
        return await (new APIFeatures(model, queryString)).init()
    }

    // Filter
    async filter(): Promise<this> {
        // 1A. Basic Filtering --> removes 'page', 'sort', 'limit' and 'fields'
        const queryObj = { ...this.queryObject }
        const excludedFields: Features[] = ['page', 'sort', 'limit', 'fields'];
        const filteredQueryObj = (_.omit(queryObj, excludedFields) as { [key: string]: any })

        // 1B. Advanced Filtering - ?price[gt]=2000 --> find({'price':{'$gt':'2000'}})
        let queryStr = JSON.stringify(filteredQueryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const obj = JSON.parse(queryStr);

        // Convert values to RegEx
        for (const property in obj ) {
            obj[property] = new RegExp(obj[property], 'i')
        }

        this.query = this.model.find(obj);
        this.collectionCount = await this.model.countDocuments(obj);
        return this;
    }

    // Pagination
    paginate = (): this => {
        // Pagination ?page=5&limit=5 --> skip(20).limit(5)
        this.query = this.pagination.paginate(this.query);
        return this;
    }

    // Field limting
    limitFields(): this {
        // Field Limiting ?fields=name,price,ratingsQuantity --> select('name price ratingsQuantity')
        if (this.queryObject.fields) {
            const fields = this.queryObject.fields.replace(/,/g, ' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this;
    }

    // Sorting
    sort() {
        // Sorting ?sort=price,ratingsQuantity --> sort('price ratingsQuantity')
        const sortBy = this.queryObject.sort.replace(/,/g, ' ');
        this.query = this.query.sort(sortBy);
        return this
    }
}

export default APIFeatures;