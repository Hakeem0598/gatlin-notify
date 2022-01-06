import React from 'react'
import SideBar from '../admin-sidebar/admin-sidebar'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';


type AdminLayoutProps = React.ComponentProps<'div'> & {
    title: string;
    showModal?: () => void;
    modal?: React.ReactNode;
}
    
function AdminLayout({ title, showModal, modal, children }: AdminLayoutProps) {
    return (
        <div className='flex'>
            <SideBar />

            <div className='flex-1 overflow-hidden'>
                <div className='px-10 py-4 space-y-4 h-screen flex flex-col'>
                    <div className='flex justify-between'>
                        <h1 className='text-white text-3xl'>{title}</h1>
                        {
                            modal && (
                                <div onClick={showModal} className='border transition-all duration-300 border-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer'>
                                    <IoEllipsisHorizontalSharp className='text-white' />
                                </div>
                            )
                        }
                    </div>
                    { children }
                </div>
                { modal }
            </div>
        </div>
    )
}

export default AdminLayout
