import React, { useContext, useState } from 'react'
import AdminLayout from '../../components/admin-layout/admin-layout'
import AdminMembersTable from '../../components/admin-members-table/admin-members-table'
import AdminSearchBar from '../../components/admin-seach-bar/admin-search-bar'
import Modal from '../../components/modal/modal'
import { ProductsContext } from '../../context/products/products.context'
import { getUsers } from '../../context/users/users.services'
import LicenseForm from './components/license-form'

function AdminLicenses() {
    const { dispatch } = useContext(ProductsContext);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);

    const modal = <Modal showModal={showModal} toggleModal={toggleModal} render={ref => <LicenseForm toggleModal={toggleModal} ref={ref} />} />

    return (
        <AdminLayout title='Licenses' modal={modal} showModal={toggleModal}>
            <AdminSearchBar getFunction={getUsers} filter={'discord.email'} dispatch={dispatch} placeholder='Search members by email...' />
            <AdminMembersTable />
        </AdminLayout>
    )
}

export default AdminLicenses
