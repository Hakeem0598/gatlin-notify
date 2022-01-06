import React, { useState } from 'react'
import Modal from '../components/modal/modal'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { ImCross } from 'react-icons/im'

type LicenseFormProps =  {
    toggleModal(): void;
}

const LicenseForm = React.forwardRef<HTMLDivElement, LicenseFormProps>(({ toggleModal }, ref) => {
    return (
        <div ref={ref} className='rounded-xl bg-black overflow-hidden text-sm border border-gray-700 w-5/12'>
            <form className='p-8'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-light text-gray-100 capitalize'>Create new license</h1>
                    <ImCross onClick={toggleModal} className='text-gray-100 font-light cursor-pointer'/>
                </div>
                <div className='mt-4'>
                    <h5 className='text-gray-1000'>Invite</h5>
                    <div className='flex mt-2'>
                        <input 
                            className='bg-gray-950 shadow-xl placeholder-gray-500 px-2 rounded flex-1 focus:outline-none focus:placeholder-transparent text-gray-200'
                            type="text"
                            placeholder='Enter an email...'
                        />
                        <button type='submit' className='bg-blue-500 text-white py-2 px-8 rounded ml-2 shadow-xl'>
                            Share
                        </button>
                    </div>
                </div>
                <div className='mt-6'>
                    <h5 className='text-gray-1000'>Plan</h5>
                    <div className='relative'>
                        <select defaultValue="" name="plans" id="plans" className='w-full focus:outline-none bg-black border border-gray-1000 rounded overflow-hidden text-gray-1000 p-2 mt-2 appearance-none'>
                            <option value="" disabled hidden>Select your option</option>
                            <option value="lifetime">Lifetime</option>
                            <option value="fnf">FnF</option>
                        </select>
                        <HiOutlineChevronDown className='absolute text-gray-1000 right-2 top-5' />
                    </div>
                </div>
            </form>

            <div className='bg-gray-1050 px-8 py-6'>
                <h5 className='text-gray-1000'>Note</h5>
                <p className='text-gray-400 mt-2'>
                    You may only create lifetime and friends and family licenses from this page. If you need to create a recurring license, direct the recipient to the homepage.
                </p>
            </div>
        </div>
    )
})


function Test() {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);

    return (
        <div>
            <h1 className='text-white text-center text-4xl uppercase font-bold pt-20' onClick={toggleModal}>Hello</h1>
            <Modal showModal={showModal} toggleModal={toggleModal} render={ref => <LicenseForm toggleModal={toggleModal} ref={ref} />} />
        </div>
        
    )
}

export default Test
