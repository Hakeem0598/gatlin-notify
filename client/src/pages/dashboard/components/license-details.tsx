import React from 'react'
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import Logo from '../../../assets/gatlin.svg';
import { GeneralObject, License } from '../../../shared/types';
import Label from './label';

type LicenseDetailsProps = {
    subscription: GeneralObject
    license: License;
}

function LicenseDetails({ subscription: { subscriptionType, currentPeriodEnd }, license: { activated } }: LicenseDetailsProps) {
    const Icon = activated ? TiTick : ImCross;

    const timestamp = new Date(currentPeriodEnd);
    const daysLeft = ~~((timestamp.getTime() - Date.now()) / 1000 / 60 / 60 / 24);

    return (
        <div className='border border-gray-700 rounded-lg xl:flex-1'>
            <div className='p-6 border-b border-gray-700'>
                <div className='flex justify-between items-center'>
                    <img className='h-16 w-16 -ml-3' src={Logo} alt='Logo'/>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-200 w-1/2'>
                        <div className='p-3 border border-gray-700 rounded-md'>
                            <Label>License type</Label>
                            <h3 className='text-blue-300 capitalize'>{subscriptionType}</h3>
                        </div>
                        <div className='p-3 border border-gray-700 rounded-md'>
                            <Label>Status</Label>
                            <h3 className={`text-${activated ? 'green' : 'red'}-500 inline-flex items-center space-x-1`}>
                                <Icon />
                                <p>{activated ? 'Activated' : 'Inactivated'}</p>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <h2 className='text-gray-200 text-xl font-semibold'>Gatlin Notify User</h2>
                    <h2 className='text-gray-500 text-md font-semibold'>Gatlin Notify</h2>
                </div>
            </div>
            
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <Label>Days Remaining</Label>
                        <h2 className='text-gray-200'>{daysLeft} days</h2>
                    </div>
                    <div className='w-1/2'>
                        <Label>Expiration Date</Label>
                        <h2 className='text-gray-200'>{timestamp.toLocaleDateString()}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LicenseDetails
