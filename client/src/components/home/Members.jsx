import { useState } from 'react';
import axios from 'axios';

const Members = ({ currGroup }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchGroupMembers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/group');
            const allGroups = res.data.groups || res.data; // Adjust depending on API response
            const group = allGroups.find(g => g._id === currGroup);
            setMembers(group?.members || []);
        } catch (error) {
            console.error('Failed to fetch group members:', error);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = async () => {
        if (!showPopup) await fetchGroupMembers();
        setShowPopup(prev => !prev);
    };

    return (
        <>
            <button
                className="bg-white/40 text-black h-max px-4 py-2 rounded hover:bg-white/70"
                onClick={handleClick}
            >
                Members
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
                        <h2 className="text-xl text-black font-bold mb-4">Group Members</h2>

                        {loading ? (
                            <p className="text-gray-500">Loading...</p>
                        ) : (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {members.length > 0 ? (
                                    members.map((m, i) => (
                                        <li key={i} className="text-gray-800">
                                            {m.name && m.email ? `${m.name} - ${m.email}` : m.name || m.email || m}
                                        </li>

                                    ))
                                ) : (
                                    <li className="text-gray-500">No members found</li>
                                )}
                            </ul>
                        )}

                        <button
                            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleClick}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Members;
