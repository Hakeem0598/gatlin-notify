import React from 'react'
import AdminLayout from '../../components/admin-layout/admin-layout'
import AdminPaymentsTable from '../../components/admin-payments-table/admin-payments-table'
// import AdminSearchBar from '../../components/admin-seach-bar/admin-search-bar'

function AdminPayments() {
    return (
        <AdminLayout title='Payments'>
            {/* <AdminSearchBar /> */}
            <AdminPaymentsTable />
        </AdminLayout>
    )
}

export default AdminPayments
