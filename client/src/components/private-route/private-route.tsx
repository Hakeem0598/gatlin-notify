import React from 'react'
import { Navigate } from 'react-router-dom';
import { GeneralObject } from '../../shared/types';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
    user: GeneralObject | null;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    children: JSX.Element;
}

function PrivateRoute({ children, user, status }: PrivateRouteProps) {
    return status === 'idle' || status === 'pending' ? (
        <Spinner tailwindHeight='min-h-screen' />
    ) : !user ? (
        <Navigate to='/' />
    ) : (
        children
    )
}

export default PrivateRoute
