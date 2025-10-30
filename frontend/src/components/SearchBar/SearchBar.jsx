import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoClose } from "react-icons/io5";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    }

    return (
        <div className='w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md border border-slate-300'>
            <input 
            type="text" 
            placeholder='Search Notes'
            className='w-full text-xs bg-transparent py-[11px] outline-none'
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown} />

            { value && (
                <IoClose 
                className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
                onClick={onClearSearch} /> 
            )}

            <FaMagnifyingGlass 
            className='text-slate-400 cursor-pointer hover:text-black' 
            onClick={handleSearch}/>
        </div>
    )
}

export default SearchBar
