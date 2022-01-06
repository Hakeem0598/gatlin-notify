import React from 'react';

import Container from '../../components/container/container';
import Navbar from './components/navbar';
import LicenseDetails from './components/license-details';
import AccountDetails from './components/account-details';
import Header from './components/header';
import NoLicense from './components/no-license';
import { GeneralObject } from '../../shared/types';

type DashboardPageProps = React.ComponentProps<'div'> & {
    user: GeneralObject;
}

const DashboardPage = ({ user: { discord, createdAt, license, subscription }}: DashboardPageProps) => {

    return (
        <div className='bg-opacity-20 min-h-screen'>
            <Navbar />
            <Container>
                <div className='grid grid-cols-1 grid-rows-2 xl:grid-rows-1 xl:grid-cols-5 gap-x-8'>
                    <div className='xl:col-start-1 xl:col-end-4 space-y-8 flex flex-col'>
                        <Header heading={`Welcome ${discord.username} 👋`} description='View your active license below' />
                        {
                            license?.key ? (
                                <LicenseDetails license={license} subscription={subscription} />
                            ) : (
                                <NoLicense />
                            )
                        }
                    </div>

                    <div className='xl:col-start-4 xl:col-end-6 space-y-8 mb-10 xl:mb-0 flex flex-col'>
                        <Header heading='Account Details' description='Manage your accounts below' />
                        <AccountDetails { ...discord } license={license} createdAt={createdAt} />
                    </div>
                </div>
            </Container>
        </div>
    )
}


export default DashboardPage;
