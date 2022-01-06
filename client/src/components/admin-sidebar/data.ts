import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineKey } from 'react-icons/hi';
import { FiPackage, FiSettings } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';

export const sideBarData = [
    {
        title: 'Home',
        path: '/admin/dashboard',
        icon: AiOutlineHome
    },
    {
        title: 'Licenses',
        path: '/admin/licenses',
        icon: HiOutlineKey
    },
    {
        title: 'Products',
        path: '/admin/products',
        icon: FiPackage
    },
    {
        title: 'Payments',
        path: '/admin/payments',
        icon: MdPayment
    },
    {
        title: 'Settings',
        path: '/admin/settings',
        icon: FiSettings
    }
]