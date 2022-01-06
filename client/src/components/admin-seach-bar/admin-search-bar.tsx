import React, { useState, useRef, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';


type AdminSearchBarProps = {
    getFunction(dispatch: React.Dispatch<any>, queryString?: string | undefined): Promise<void>;
    filter: string;
    placeholder: string;
    dispatch: React.Dispatch<any>;
}

function AdminSearchBar({ getFunction, filter, placeholder, dispatch }: AdminSearchBarProps) {
    const [query, setQuery ] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handleClear = () => {
        setQuery('')
        getFunction(dispatch);
    };

    const SearchbarRef = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        const findValue = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (!query) {
                    getFunction(dispatch);
                } else {
                    getFunction(dispatch, `?${filter}=${query}`);
                }
            } 
        }

        const refValue =  SearchbarRef.current
        refValue.addEventListener('keypress', findValue)

        return () => {
            refValue.removeEventListener('keypress', findValue)
        }
    }, [dispatch, query, getFunction, filter]) 

    

    return (
        <div ref={SearchbarRef} className={`transition-all duration-300 flex items-center rounded-lg border border-gray-800 hover:bg-gray-700 px-3`}>
            <div  className='py-2 pr-3 cursor-pointer'>
                <BsSearch  className='text-gray-500 '/>
            </div>
            <input
                type='text'
                value={query}
                className='py-3 w-full text-sm text-gray-200 bg-transparent focus:outline-none placeholder-gray-500 '
                placeholder={placeholder}
                onChange={handleChange}
            />
            {
                query && (
                    <div onClick={handleClear} className='py-2 cursor-pointer'>
                        <AiOutlinePlus className='transform rotate-45 text-gray-500 text-2xl font-semibold '/>
                    </div>
                )
            }
        </div>
    )
}
export default AdminSearchBar;
