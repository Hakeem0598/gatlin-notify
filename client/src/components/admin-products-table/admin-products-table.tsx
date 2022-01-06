import React, { useContext, Dispatch } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { Link, Navigate } from 'react-router-dom';

import { tableHeadings } from './data';
import Pagination, { PaginationProps } from '../pagination/pagination';
import { Action } from '../../context/products/products.actions';
import { ProductsContext } from '../../context/products/products.context';
import { getProducts } from '../../context/products/products.services';
import Spinner from '../spinner/spinner';


const AdminProductsTable = () => {
    const { state: { status, products, pagination }, dispatch } = useContext(ProductsContext);

    const goToPage = (dispatch: Dispatch<Action>) => (queryString: string) => {
        getProducts(dispatch, queryString)
    }

    return status === 'idle' || status === 'pending' ? (
        <Spinner tailwindHeight='h-full' />
    ) : !products || !pagination ? (
        <Navigate to='/' />
    ) : (
        <div className='overflow-hidden border border-gray-800 rounded-xl flex flex-col'>
            <div className="overflow-auto whitespace-nowrap rounded-xl">
                <table className="divide-y divide-gray-900">
                    <thead className="border-b border-gray-800">
                        <tr>
                            {
                                tableHeadings.map((heading) => {
                                    return (
                                        <th
                                            key={heading}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                                        >
                                            {heading}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {products.map(({ name, productId, priceId, price, active, createdAt }, i) => (
                            <tr key={i}>
                                <td className="pl-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{i + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400 capitalize">{name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to="#" className="text-xs text-blue-600 hover:underline ">
                                        {productId}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to="#" className="text-xs text-blue-600 hover:underline ">
                                        {priceId}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">£{price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex items-center'>
                                        <span className={`${active === true ? 'text-green-600 border-green-600 ' : 'text-red-600 border-red-600'} p-0.5 border-2 rounded-full mr-2`}>
                                            { active === true ? <TiTick /> : <AiOutlinePlus className='transform rotate-45' /> }
                                        </span>
                                        <div className='text-xs text-gray-400 capitalize'>
                                            {
                                                active === true ? 'Active' : 'Inactive'
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString().replaceAll('/', '-')}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination { ...pagination as PaginationProps } goToPage={goToPage(dispatch)} />
        </div>
    )
}

export default AdminProductsTable
