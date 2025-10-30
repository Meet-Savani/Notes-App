import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ getAllNotes, showToastMessage, noteData, type, onClose }) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title, 
                content,
                tags,
            });

            if(response.data && response.data.note) {
                showToastMessage("Note Added Successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title, 
                content,
                tags,
            });

            if(response.data && response.data.note) {
                showToastMessage("Note Updated Successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    const handleAddNote = () => {
        if(title.trim() === "" || !title) {
            setError("Title is required");
            return;
        }

        if(content.trim() === "" || !content) {
            setError("Content is required");
            return;
        }

        setError("");

        if(type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    }

    return (
        <div className='relative w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 md:px-8'>
            <button className='w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center absolute -top-3 -right-2 sm:-right-3 hover:bg-slate-100 transition'
            onClick={onClose}>
                <MdClose className='text-lg sm:text-xl text-slate-400 hover:text-slate-600' />
            </button>

            <div className="flex flex-col gap-2 mt-4">
                <label className='input-label text-sm sm:text-base'>TITLE</label>
                <input 
                type="text"
                className='text-lg sm:text-2xl text-slate-950 outline-none border-b border-slate-200 focus:border-primary transition w-full bg-transparent p-1 sm:p-2'
                placeholder='Go to Gym At 5'
                value={title}
                onChange={({ target }) => setTitle(target.value)} />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className='input-label text-sm sm:text-base'>CONTENT</label>
                <textarea type="text" 
                className='text-sm sm:text-base text-slate-950 outline-none bg-slate-50 p-2 sm:p-3 rounded w-full resize-none min-h-[120px] sm:min-h-[180px]'
                placeholder='Content'
                rows={6} 
                value={content}
                onChange={({ target }) => setContent(target.value)} />
            </div>

            <div className="mt-3">
                <label className='input-label text-sm sm:text-base'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            { error && (
                <p className="text-red-500 text-xs sm:text-sm pt-3">{error}</p>
            )}

            <button className='btn-primary font-medium mt-6 sm:mt-8 w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-3 rounded-md shadow-md hover:shadow-lg transition-all' 
            onClick={handleAddNote}>
                {type === "edit" ? "UPDATE" : "ADD"}
            </button>
        </div>
    )
}

export default AddEditNotes
