import React, { Dispatch, useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Action } from '../../context/payments/payments.actions';
import { PaymentsContext } from '../../context/payments/payments.context';
import { getPayments } from '../../context/payments/payments.services';
import Pagination, { PaginationProps } from '../pagination/pagination';
import Spinner from '../spinner/spinner';
import { tableHeadings } from './data';


const AdminPaymentsTable = () => {
    const { state: { status, payments, pagination }, dispatch } = useContext(PaymentsContext);

    const goToPage = (dispatch: Dispatch<Action>) => (queryString: string) => {
        getPayments(dispatch, queryString)
    }

    console.log(payments);

    return status === 'idle' || status === 'pending' ? (
        <Spinner tailwindHeight='h-full' />
    ) : !payments || !pagination ? (
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
                        {payments.map(({ amount, status, description, customerId, email, date }, i) => (
                            <tr key={i}>
                                <td className="pl-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{i + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400 capitalize">£{amount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex items-center'>
                                        <span className={`${status === 'succeeded' ? 'text-green-600 border-green-600 ' : 'text-red-600 border-red-600'} p-0.5 border-2 rounded-full mr-2`}>
                                            { 
                                                status === 'succeeded' ? <TiTick /> : status === 'failed' ? <AiOutlinePlus className='transform rotate-45' /> : <RiArrowGoBackLine />
                                            }
                                        </span>
                                        <div className='text-xs text-gray-400 capitalize'>
                                            { status }
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to="#" className="text-xs text-blue-600 hover:underline ">
                                        {customerId}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{email}</div>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{new Date(date).toLocaleDateString().replaceAll('/', '-')}</div>
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

export default AdminPaymentsTable;
