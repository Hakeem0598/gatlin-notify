import React, { useContext, Dispatch } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { Link, Navigate } from 'react-router-dom';

import { tableHeadings } from './data';
import Pagination, { PaginationProps } from '../pagination/pagination';
import { Action } from '../../context/users/users.actions';
import { UsersContext } from '../../context/users/users.context';
import { getUsers } from '../../context/users/users.services';
import Spinner from '../spinner/spinner';


const AdminMembersTable = () => {
    const { state: { status, users, pagination }, dispatch } = useContext(UsersContext);

    const goToPage = (dispatch: Dispatch<Action>) => (queryString: string) => {
        getUsers(dispatch, queryString)
    }

    return status === 'idle' || status === 'pending' ? (
        <Spinner tailwindHeight='h-full' />
    ) : !users || !pagination ? (
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
                        {users.map(({ discord: { avatarURL, discriminator, email, username }, subscription: { subscriptionId, customerId, status, currentPeriodEnd }, license: { key }, role }, i) => (
                            <tr key={i}>
                                <td className="pl-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{i + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={avatarURL} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-xs font-medium text-white">{`${username}#${discriminator}`}</div>
                                            <div className="text-xs text-gray-400">{email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{key}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to="#" className="text-xs text-blue-600 hover:underline ">
                                        {subscriptionId}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to="#" className="text-xs text-blue-600 hover:underline ">
                                        {customerId}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex items-center'>
                                        <span className={`${status === 'active' ? 'text-green-600 border-green-600 ' : 'text-red-600 border-red-600'} p-0.5 border-2 rounded-full mr-2`}>
                                            { status === 'active' ? <TiTick /> : <AiOutlinePlus className='transform rotate-45' /> }
                                        </span>
                                        <div className='text-xs text-gray-400 capitalize'>
                                            {status}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-white capitalize">{role}</div>
                                    {
                                        role === 'customer' && <div className="text-sm text-gray-400">£30.00</div>
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xs text-gray-400">{(new Date(currentPeriodEnd)).toLocaleDateString().replaceAll('/', '-')}</div>
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

export default AdminMembersTable;
