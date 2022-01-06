import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/spinner/spinner';
import api from '../../../context/api';
import AnalyticsCard from './analytics-card';

type Analytic = {
    title: string;
    value: string | number;
    url: string;
};

type Analytics = Analytic[];

const AnalyticsCardsContainer = () => {
    const [analytics, setAnalytics] = useState<Analytics>([]);

    useEffect(() => {
        let unmounted = false;

        const getAnalytics = async () => {
            const { data: { analytics } } = await api.get('/users/analytics');
            if (!unmounted) setAnalytics([ ...analytics ])
        }

        getAnalytics()
        return () => {
            unmounted = true;
        }
    }, []);

   
    return !analytics.length ? (
        <Spinner tailwindHeight='h-96' /> 
    ) : (
        <div className='flex flex-col space-y-4 sm:space-y-0 items-center sm:flex-row sm:items-center sm:justify-between sm:space-x-4'>
            {
                analytics.map(({ title, value, url }) => (
                    <AnalyticsCard key={title} title={title} value={value} path={url}/>
                ))

            }
        </div>
    )
}

export default AnalyticsCardsContainer;