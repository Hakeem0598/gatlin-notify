import React, {  useState } from 'react'
import { BsPlusLg, BsDashLg } from 'react-icons/bs';
import FadeInOnScroll from '../fade-in-on-scroll/fade-in-on-scroll';

type FAQItemProps = React.ComponentProps<'div'> & {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [toggle, setToggle] = useState(false);


    return (
        <div key={question} className='border border-gray-700 rounded-lg p-6 space-y-4 transition-all duration-300 hover:border-gray-400'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-200 text-lg tracking-wide mr-5 sm:mr-0'>{question}</p>
                <div className='cursor-pointer' onClick={() => setToggle(prev => !prev)}>
                    { toggle ? (
                            <BsDashLg className='text-lg text-gray-200 '/>
                        ):  (
                            <BsPlusLg className='text-lg text-gray-200 '/>  
                        )
                    }
                </div>
            </div>
            {
                toggle && <FadeInOnScroll direction='center' className='text-gray-500 text-lg tracking-wide'>{answer}</FadeInOnScroll>
            }
        </div>
    )
}

export default FAQItem
