import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import GroupCard from './GroupCard';
import { useUser } from '../../contexts/user';
import AddGroup from './AddGroup';
import JoinGroup from './JoinGroup';
import GroupContextMenu from './GroupContextMenu';
import { useAdminMode } from '../../contexts/admin';
import useGroup from '../../contexts/group';

const GroupList = ({ onSelect, updateGroup }) => {
    const { currUser } = useUser();
    const [contextMenu, setContextMenu] = useState(null);
    const contextRef = useRef(null);
    const [editingGroup, setEditingGroup] = useState(null);
    const [editName, setEditName] = useState('');
    const { adminMode } = useAdminMode()
    const { groups } = useGroup()

    const handleRightClick = (e, group) => {
        e.preventDefault();
        setContextMenu({
            group,
            position: { x: e.pageX, y: e.pageY }
        });
    };

    const handleCloseContext = () => setContextMenu(null);

    const handleEditGroup = () => {
        setEditName(contextMenu.group.name);
        setEditingGroup(contextMenu.group);
        handleCloseContext();
    };


    const handleDeleteGroup = async () => {
        try {
            const confirm = window.confirm("Delete this group?");
            if (!confirm) return;

            await axios.delete(`/api/group/${contextMenu.group._id}`);
            updateGroup(); // Refresh group list
            handleCloseContext();
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    useEffect(() => {
        console.log("Groups updated:", groups);
        if (groups.length > 0) {
            // console.log('Current user:', currUser)
        }
    }, [groups]);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contextRef.current && !contextRef.current.contains(e.target)) {
                handleCloseContext();
            }
        };

        if (contextMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contextMenu]);

    return (
        <div className="w-full h-full flex-1 overflow-auto flex flex-wrap relative">
            {adminMode && (
                <AddGroup updateGroup={updateGroup} />
            )}
            {!adminMode && (
                <JoinGroup updateGroup={updateGroup} />
            )}

            {groups.length == 0 ?
                <div className='text-[30px] font-semibold text-black/30 pl-5 pt-10'>
                    No Group Found
                </div>
                :
                <></>
            }

            {groups
                .filter(group =>
                    group.members.some(member => member._id === currUser._id)
                )
                .map(group => (
                    <GroupCard
                        key={group._id}
                        group={group}
                        onSelect={() => onSelect(group._id)}
                        onContextMenu={(e) => handleRightClick(e, group)}
                    />
                ))}



            {adminMode && contextMenu && (
                <div ref={contextRef}>
                    <GroupContextMenu
                        position={contextMenu.position}
                        onEdit={handleEditGroup}
                        onDelete={handleDeleteGroup}
                    />
                </div>
            )}

            {adminMode && editingGroup && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl mb-4">Edit Group</h2>
                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border px-3 py-2 mb-4"
                            placeholder="Group name"
                        />
                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setEditingGroup(null)} className="text-gray-600">Cancel</button>
                            <button
                                onClick={async () => {
                                    try {
                                        await axios.put(`/api/group/${editingGroup._id}`, { name: editName });
                                        updateGroup(); // Refresh list
                                        setEditingGroup(null);
                                    } catch (err) {
                                        console.error(err);
                                        alert("Update failed");
                                    }
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GroupList;
