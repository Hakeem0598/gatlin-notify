import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/private-route';
import { AuthContext } from './context/auth/auth.context';
import PaymentsContextProvider from './context/payments/payments.context';
import ProductsContextProvider from './context/products/products.context';
import UsersContextProvider from './context/users/users.context';
import PageNotFound from './pages/404/page-not-found';
import AdminHome from './pages/admin-home/admin-home';
import AdminLicenses from './pages/admin-licenses/admin-licenses';
import AdminPayments from './pages/admin-payments/admin-payments';
import AdminProducts from './pages/admin-products/admin-products';
import DashboardPage from './pages/dashboard/dashboard';
import HomePage from './pages/home/home';
import Test from './pages/Test';
import { GeneralObject } from './shared/types';


function App() {
    const { user, status } = useContext(AuthContext);

    return (
        <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/admin'>
                    <Route path='dashboard' element={<PrivateRoute user={user} status={status}><UsersContextProvider><AdminHome /></UsersContextProvider></PrivateRoute>} />
                    <Route path='licenses' element={<PrivateRoute user={user} status={status}><UsersContextProvider><AdminLicenses /></UsersContextProvider></PrivateRoute>} />
                    <Route path='products' element={<PrivateRoute user={user} status={status}><ProductsContextProvider><AdminProducts /></ProductsContextProvider></PrivateRoute>} />
                    <Route path='payments' element={<PrivateRoute user={user} status={status}><PaymentsContextProvider><AdminPayments /></PaymentsContextProvider></PrivateRoute>} />
                </Route>
                
                <Route path='/test' element={<Test />} />
                <Route path='/dashboard' element={<PrivateRoute user={user} status={status}><DashboardPage user={user as GeneralObject} /></PrivateRoute>} />
                <Route path='*' element={<PageNotFound />} /> 
            </Routes>
        </div>
        
    );
}

export default App;
