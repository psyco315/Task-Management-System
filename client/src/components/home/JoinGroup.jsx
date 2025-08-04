import { useState } from 'react';
import { useUser } from '../../contexts/user';
import { Plus } from 'lucide-react';
import axios from 'axios';

const JoinGroup = ({ updateGroup }) => {
    const { currUser } = useUser();
    const [showPopup, setShowPopup] = useState(false);
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('');

    const handleJoin = async () => {
        if (!currUser || !inviteCode) return;

        try {
            const response = await axios.put(`http://localhost:3000/api/group/${inviteCode}/join`, {
                userId: currUser
            });

            console.log("Joined group:", response.data.group);
            setShowPopup(false);
            setInviteCode('');
            setError('');
            updateGroup(); // refresh group list
        } catch (error) {
            console.error("Error joining group:", error.message);
            setError('Code is invalid');
        }
    };

    return (
        <>
            {/* Join Button */}
            <button
                onClick={() => setShowPopup(true)}
                className="m-4 p-3 h-[100px] relative top-[5px] flex justify-center items-center w-[100px] rounded-full bg-black/10 border border-white/20 text-white hover:bg-black/5 transition hover:scale-105 hover:cursor-pointer"
                title="Join Group"
            >
                <Plus className="w-12 h-12" />
            </button>

            {/* Invite Code Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] bg-opacity-90 text-white p-6 rounded-lg shadow-lg w-[300px] space-y-4">
                        <h2 className="text-lg font-semibold">Enter Invite Code</h2>
                        <input
                            type="text"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            placeholder="Enter here..."
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    setInviteCode('');
                                    setError('');
                                }}
                                className="px-3 py-1 rounded bg-black/20 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleJoin}
                                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default JoinGroup;
