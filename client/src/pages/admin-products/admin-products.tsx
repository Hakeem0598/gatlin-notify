import React, { useContext, useState } from 'react'
import AdminLayout from '../../components/admin-layout/admin-layout'
import AdminProductsTable from '../../components/admin-products-table/admin-products-table'
import AdminSearchBar from '../../components/admin-seach-bar/admin-search-bar'
import Modal from '../../components/modal/modal'
import { ProductsContext } from '../../context/products/products.context'
import { getProducts } from '../../context/products/products.services'
import ProductForm from './components/product-form'

function AdminProducts() {
    const { dispatch } = useContext(ProductsContext);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);

    const modal = <Modal showModal={showModal} toggleModal={toggleModal} render={ref => <ProductForm toggleModal={toggleModal} ref={ref} />} />
    
    return (
        <AdminLayout title='Products' modal={modal} showModal={toggleModal}>
            <AdminSearchBar getFunction={getProducts} filter={'name'} dispatch={dispatch} placeholder='Search products by product name...' />
            <AdminProductsTable />
        </AdminLayout>
    )
}

export default AdminProducts
