/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import  Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../assets/images/add-notes.png'
import NoDataImg from '../../assets/images/no-data.png'

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    })
    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
    }

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        })
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        })
    }

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if(error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    // Get All Notes 
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if(response.data && response.data.notes) {
                const sortedNotes = response.data.notes.sort((a, b) => b.isPinned - a.isPinned);
                setAllNotes(sortedNotes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again later.", error);
        }
    }

    // Delete Note
    const deleteNote = async (noteData) => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);

            if(response.data && !response.data.error) {
                showToastMessage("Note Deleted Successfully", "delete");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    // Search for a Note
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: { query },
            });
            if(response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;

        try {
            const response = await axiosInstance.put("/update-isPinned/" + noteId, {
                "isPinned": !noteData.isPinned,
            })

            if(response.data && response.data.note) {
                showToastMessage(
                    !noteData.isPinned ? "Note Pinned Successfully" : "Note Unpinned Successfully"
                );
                
                const updatedNotes = allNotes.map(note =>
                    note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
                );

                updatedNotes.sort((a, b) => b.isPinned - a.isPinned);

                setAllNotes(updatedNotes);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {}
    }, []);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar 
            userInfo={userInfo} 
            onSearchNote={onSearchNote} 
            handleClearSearch={handleClearSearch} /> 
            
            <div className="px-4 sm:px-6 md:px-8 xl:px-10 max-w-7xl mx-auto w-full">
                {allNotes.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
                    {allNotes.map((note) => (
                        <NoteCard
                        key={note._id}
                        title={note.title}
                        date={note.createdAt}
                        content={note.content}
                        tags={note.tags}
                        isPinned={note.isPinned}
                        onEdit={() => handleEdit(note)}
                        onDelete={() => deleteNote(note)}
                        onPinNote={() => updateIsPinned(note)} />
                    ))}
                </div> 
                ) : (
                    <EmptyCard 
                    imgSrc={isSearch ? NoDataImg : AddNotesImg} 
                    message={isSearch 
                        ? `Oops! No notes found matching your search.` 
                        : `Start creating your first note! Click the 'Add' button to join down your thoughts, ideas, and reminders. Let's get started!`} />
                )}
            </div>

            <button 
            className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-6 bottom-6 sm:right-10 sm:bottom-10 shadow-lg transition-transform hover:scale-110'
            onClick={() => {
                setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}>
                <MdAdd className='text-[28px] sm:text-[32px] text-white' />
            </button>

            <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
            }}
            contentLabel=""
            className="w-[90%] sm:w-[70%] md:w-[50%] max-h-[85vh] sm:max-h-[90vh] bg-white rounded-md mt-10 p-5 overflow-y-auto mx-auto shadow-lg">
                <AddEditNotes 
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={() => {
                    setOpenAddEditModal({ isShown: false, type: "add", data: null });
                }}
                getAllNotes={getAllNotes}
                showToastMessage={showToastMessage} /> 
            </Modal>

            <Toast 
            isShown={showToastMsg.isShown} 
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast} />
        </div>
    )
}

export default Home
