import React, { useEffect, useState } from 'react'
import { LuCheck } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'

const Toast = ({ isShown, message, type, onClose }) => {
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        if (isShown) {
            setProgress(100)
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev <= 0) {
                        clearInterval(interval)
                        onClose() 
                        return 0
                    }
                    return prev - 1.5
                })
            }, 45) 

            return () => clearInterval(interval)
        }
    }, [isShown, onClose])

    if (!isShown) return null 

    return (
        <div
            className="fixed top-5 right-4 sm:right-6 z-50 w-full max-w-72 sm:max-w-sm transition-all duration-300">
            <div className="relative bg-white border shadow-2xl rounded-md overflow-hidden">
                <div
                    className={`absolute left-0 top-0 w-1 h-full ${type === "delete" ? "bg-red-500" : "bg-green-500"}`}
                ></div>

                <div className="flex items-center gap-3 py-2 px-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type === "delete" ? "bg-red-50" : "bg-green-50"}`}>
                        {type === "delete" ? (
                            <MdDeleteOutline className='text-xl text-red-500' />
                        ) : (
                            <LuCheck className='text-xl text-green-500' />
                        )}
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 break-words">{message}</p>
                </div>

                {/* Bottom shrinking progress bar */}
                <div
                    className={`${type === "delete" ? "bg-red-500" : "bg-green-500"} absolute bottom-0 left-0 h-1`}
                    style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
                ></div>
            </div>
        </div>
    )
}

export default Toast
