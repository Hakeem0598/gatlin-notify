import React from 'react'
import AdminLayout from '../../components/admin-layout/admin-layout'
import AdminMembersTable from '../../components/admin-members-table/admin-members-table';
import AnalyticsCardsContainer from './components/analytics-cards-container';

function AdminHome() {
    return (
        <AdminLayout title='Overview'>
            <AnalyticsCardsContainer />
            <AdminMembersTable />
        </AdminLayout>
    )
}

export default AdminHome
