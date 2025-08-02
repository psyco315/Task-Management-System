import React, { useState } from 'react';
import axios from 'axios';
import { Plus, X } from 'lucide-react';
import { useUser } from '../../contexts/user';

const AddGroup = ({ updateGroup }) => {
    const { currUser } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [createdGroup, setCreatedGroup] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = async () => {
        if (!groupName.trim()) return alert('Enter a valid group name');
        if (!currUser) return alert('User not logged in');

        try {
            const res = await axios.post('http://localhost:3000/group', {
                name: groupName.trim(),
                members: [currUser._id],
                createdBy: currUser._id,
            });

            if (res.data.group) {
                setShowForm(false);
                setGroupName('');
                setCreatedGroup(res.data.group);
                setShowConfirmation(true); // trigger "Group Created" popup
            }
        } catch (err) {
            console.error(err);
            alert('Failed to create group');
        }
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        if (createdGroup) {
            updateGroup?.(createdGroup); // Refresh UI with the new group
            setCreatedGroup(null);
        }
    };

    return (
        <>
            {/* Add Group Button */}
            <button
                onClick={() => setShowForm(true)}
                className="m-4 p-3 h-[100px] relative top-[5px] flex justify-center items-center w-[100px] rounded-full bg-black/10 border border-white/20 text-white hover:bg-black/5 transition hover:scale-105 hover:cursor-pointer"
                title="Create Group"
            >
                <Plus className="w-12 h-12" />
            </button>

            {/* Group Name Input Modal */}
            {showForm && (
                <div className="fixed bg-black/50 inset-0 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded-2xl w-80 shadow-2xl  border border-white/20">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Create Group</h2>
                            <button onClick={() => setShowForm(false)}>
                                <X className="w-5 h-5 hover:text-red-400" />
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-black/70 backdrop-blur-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40 mb-4"
                        />

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-black/20 transition"
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}


            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 text-white p-6 rounded-2xl w-72 text-center shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Group Created</h2>
                        <p className="text-sm mb-4">Your group has been successfully created.</p>
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddGroup;
