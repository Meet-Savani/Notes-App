import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ userInfo, onLogOut }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                {getInitials(userInfo?.fullName)}
            </div>

            <div className='hidden sm:flex flex-col'>
                <p className="text-xs sm:text-sm font-medium">{userInfo?.fullName}</p>
                <button className='text-xs sm:text-sm text-slate-700 underline' onClick={onLogOut}>
                    LogOut
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo
