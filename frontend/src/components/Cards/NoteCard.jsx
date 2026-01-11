import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from 'moment'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
    }) => {
    return (
        <div className="border rounded-xl p-3 sm:p-4 bg-white hover:shadow-xl transition-all ease-in-out duration-200 w-full">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <h6 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 truncate">
                        {title}
                    </h6>
                    <span className="text-xs sm:text-sm text-slate-500 block mt-0.5">
                        {moment(date).format("DD MMM, YYYY")}
                    </span>
                </div>

                <MdOutlinePushPin 
                className={`icon-btn sm:text-xl ${isPinned ? "text-primary" : "text-slate-300"}`}
                onClick={onPinNote} />
            </div>

            <p className="text-sm sm:text-base text-slate-600 mt-2 line-clamp-3 break-words">
                {content}
            </p>

            <div className="flex flex-wrap items-center justify-between mt-3 gap-2">
                <div className="text-xs sm:text-sm text-slate-500 flex flex-wrap gap-1">
                    {tags.map((tag, i) => (
                        <span key={i} className="bg-slate-100 px-2 py-1 rounded-md">
                        #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <MdCreate 
                    className="text-lg sm:text-xl cursor-pointer text-slate-600 hover:text-green-600 transition-colors"
                    onClick={onEdit} />

                    <MdDelete
                    className="text-lg sm:text-xl cursor-pointer text-slate-600 hover:text-red-500 transition-colors"
                    onClick={() => {
                        const confirmed = window.confirm("Are you sure you want to delete this note?");
                        if (confirmed) {
                            onDelete();
                        }
                    }} />
                </div>
            </div>
        </div>
    )
};

export default NoteCard;
