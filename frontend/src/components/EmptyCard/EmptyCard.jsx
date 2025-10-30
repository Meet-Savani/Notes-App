import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-16 px-4 sm:mt-20'>
            <img src={imgSrc} alt="No notes" className='w-40 sm:w-52 md:w-60 lg:w-64 max-w-full object-contain' />

            <p className="text-center text-slate-700 text-sm sm:text-base md:text-lg font-medium leading-6 sm:leading-7 mt-5 max-w-xs sm:max-w-md md:max-w-lg">
                {message}
            </p>
        </div>
    )
}

export default EmptyCard
