import React, { useEffect, useRef, useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import { HiOutlineMenu } from 'react-icons/hi';

const Navbar = ( { userInfo, onSearchNote, handleClearSearch }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const onLogOut = () => {
        localStorage.clear();
        navigate('/login');
        setMenuOpen(false);
    }

    const handleSearch = () => {
        if(searchQuery) {
            onSearchNote(searchQuery);
        }
    }

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])


    return (
        <div className='w-full bg-white flex items-center justify-between px-4 sm:px-10 py-2 drop-shadow'>

            <h2 className='sm:text-xl font-medium text-black py-2'>Notes</h2>
            
            <SearchBar 
            value={searchQuery} 
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch} />

            {/* Desktop / Tablet view */}
            <div className='hidden sm:flex items-center'>
                <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
            </div>

            {/* Mobile menu toggle */}
            <div className='sm:hidden flex items-center' ref={menuRef}>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <HiOutlineMenu className='text-2xl text-slate-800' />
                </button>

                {menuOpen && (
                    <div className='absolute right-4 top-full mt-2 w-52 bg-white border rounded shadow-lg flex flex-col py-2 z-50'>
                        <div className='flex items-center gap-3 px-4 py-2 border-b'>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                                {userInfo && userInfo.fullName
                                    ? userInfo.fullName.split(" ").map(n => n[0]).join("")
                                    : ""}
                            </div>
                            <p className='text-sm font-medium truncate'>{userInfo?.fullName}</p>
                        </div>
                        
                        <button
                            className='mx-auto w-2/3 mt-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600'
                            onClick={onLogOut}>
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
