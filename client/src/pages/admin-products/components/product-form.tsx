import React, { forwardRef, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi';
import { object, string, number } from 'yup';
import api from '../../../context/api';

type ProductFormProps = {
    toggleModal(): void;
}

type FormState = {
    name: string;
    interval: 'day' | 'month' | 'week' | 'year';
    interval_count: number;
    currency: string;
    unit_amount: number;
}

const createProductSchema = object({
    name: string().required("Name is required"),
    interval: string().matches(/(day|month|week|year)/, "Interval must be one of month, year, week, or day").required("Interval is required"),
    interval_count: number().required("Interval count is required").typeError('Interval count must be a number'),
    unit_amount: number().required("Unit amount is required").typeError('Amount must be a number')
});

const ProductForm = forwardRef<HTMLDivElement, ProductFormProps>(({ toggleModal }, ref) => {
    const [state, setState] = useState<FormState>({
        name: '',
        interval: 'month',
        interval_count: 0,
        currency: 'gbp',
        unit_amount: 0
    });

    const [error, setError] = useState('');


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setState( prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setState( prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createProductSchema.validate(state);
            await api.create('/products', state);
            toggleModal()
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div ref={ref} className='rounded-xl bg-black overflow-hidden text-sm border border-gray-800'>
            <form className='p-8' onSubmit={handleSubmit}>
                <h1 className='text-lg font-light text-gray-100 capitalize'>Create a new plan</h1>
                <div className='flex mt-4'>
                    <div className='flex-1'>
                        <label htmlFor='name' className='text-gray-1000'>Name</label>
                        <input 
                            className='bg-transparent border border-gray-1000 shadow-xl placeholder-gray-1000 p-2 rounded flex-1 focus:outline-none focus:placeholder-transparent text-gray-200 mt-2 w-full'
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Monthly'
                            value={state.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='flex-1 ml-2'>
                        <label className='text-gray-1000'>Type</label>
                        <div className='relative'>
                            <select defaultValue='' name='type' id='type' className='w-full focus:outline-none bg-black border border-gray-1000 rounded overflow-hidden text-gray-200 p-2 mt-2 appearance-none'>
                                <option value='' disabled hidden>Select your option</option>
                                <option value='recurring'>Recurring</option>
                            </select>
                            <HiOutlineChevronDown className='absolute text-gray-1000 right-2 top-5' />
                        </div>
                    </div>
                </div>

                <div className='mt-6'>
                    <label className='text-gray-1000'>Amount</label>
                    <div className='flex mt-2'>
                        <input
                            aria-label='Amount'
                            className='w-1/3 bg-transparent rounded-tl rounded-bl border border-gray-1000 shadow-xl placeholder-gray-1000 p-2  focus:outline-none focus:placeholder-transparent text-gray-200'
                            type='number'
                            min={0}
                            name='unit_amount'
                            value={state.unit_amount}
                            onChange={handleInputChange}
                        />

                        <div className='relative w-1/5'>
                            <select defaultValue='gbp' aria-label='Currency' name='currency'  className='w-full focus:outline-none bg-black border-t border-r border-b border-gray-1000 overflow-hidden text-gray-200 p-2 appearance-none uppercase' onChange={handleSelectChange}>
                                <option value='gbp'>gbp</option>
                            </select>
                            <HiOutlineChevronDown className='absolute text-gray-1000 right-2 top-3' />
                        </div>

                        <div className='p-2 border-t border-r border-b border-gray-1000 text-gray-1000 inline-flex items-center'>every</div>

                        <input 
                            aria-label='Interval count'
                            className='w-1/5 bg-transparent border-t border-r border-b border-gray-1000 shadow-xl placeholder-gray-1000 p-2  focus:outline-none focus:placeholder-transparent text-gray-200'
                            type='number'
                            min={0}
                            name='interval_count'
                            value={state.interval_count}
                            onChange={handleInputChange}
                        />

                        <div className='relative w-1/4'>
                            <select aria-label='Interval' defaultValue='month' name='interval' className='w-full focus:outline-none border-t border-r border-b rounded-tr rounded-br bg-black  border-gray-1000 overflow-hidden text-gray-200 p-2 appearance-none' onChange={handleSelectChange}>
                                <option value='year'>year(s)</option>
                                <option value='month'>month(s)</option>
                                <option value='week'>week(s)</option>
                                <option value='day'>day(s)</option>
                            </select>
                            <HiOutlineChevronDown className='absolute text-gray-1000 right-2 top-3' />
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex items-center justify-end space-x-2'>
                    <button onClick={toggleModal} className='bg-transparent border border-gray-1000 text-white py-2 px-8 rounded ml-2 shadow-xl'>
                        Cancel
                    </button>
                    <button type='submit' className='bg-blue-500 text-white py-2 px-8 rounded ml-2 shadow-xl'>
                        Create
                    </button>
                </div>

                { error && <p className='text-red-500 text-sm mt-8'>* {error}</p> }
            </form>
        </div>
    )
})

export default ProductForm;
