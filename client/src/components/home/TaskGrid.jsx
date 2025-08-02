import axios from "axios";
import TaskRow from "./TaskRow";
import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useAdminMode } from "../../contexts/admin";

const TaskGrid = ({ tasks, fetchTasks, groupId }) => {
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        task: null,
    });
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const { adminMode } = useAdminMode()

    const handleEdit = (task) => {
        setTaskToEdit(task);
        setEditModalOpen(true);
    };

    const handleDelete = async (task) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/task/${task._id}`);
            fetchTasks();     // Refresh task list
            setEditModalOpen(false)   // Close the modal
        } catch (err) {
            console.error(err);
            alert('Failed to delete task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        const handleClickOutside = () => setContextMenu({ ...contextMenu, visible: false });
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [contextMenu]);

    const handleSort = (key) => {
        const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortOrder(newOrder);
    };

    const getSortedTasks = () => {
        if (!sortKey) return tasks;

        return [...tasks].sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];

            // Special handling for priority
            if (sortKey === "priority") {
                const priorityOrder = { low: 1, mid: 2, medium: 2, high: 3 };
                valA = priorityOrder[valA.toLowerCase()] || 0;
                valB = priorityOrder[valB.toLowerCase()] || 0;
                return sortOrder === "asc" ? valA - valB : valB - valA;
            }

            // Date comparison
            if (sortKey === "createdAt" || sortKey === "dueDate") {
                const dateA = new Date(valA);
                const dateB = new Date(valB);
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            }

            // String comparison
            if (typeof valA === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            // Default numeric comparison
            return sortOrder === "asc" ? valA - valB : valB - valA;
        });
    };

    const sortedTasks = getSortedTasks().filter(task => task.group === groupId);

    const headers = [
        { label: "Title", key: "title" },
        { label: "Description", key: "description" },
        { label: "Status", key: "status" },
        { label: "Priority", key: "priority" },
        { label: "Date Added", key: "createdAt" },
        { label: "Due Date", key: "dueDate" },
        { label: "Assigned To", key: "assignedTo" },
        { label: "Documents", key: null }
    ];

    return (
        <div className="overflow-auto h-full p-5 backdrop-blur-md">
            <table className="min-w-full table-auto text-sm text-left text-white bg-white/10">
                <thead className="bg-black/20 text-white uppercase text-xs tracking-wider">
                    <tr>
                        {headers.map(({ label, key }) => (
                            <th
                                key={label}
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => key && handleSort(key)}
                            >
                                <div className={`w-max hover:scale-102 transition-transform duration-150 ${key ? "hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-700 hover:to-violet-700 hover:bg-clip-text hover:text-transparent" : ""}`}>
                                    {label}
                                    {sortKey === key && (
                                        <span className="ml-1 text-xs">{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {sortedTasks.map((task) => (
                        <TaskRow
                            key={task._id}
                            task={task}
                            onRightClick={(e) => {
                                e.preventDefault();
                                setContextMenu({
                                    visible: true,
                                    x: e.pageX,
                                    y: e.pageY,
                                    task,
                                });
                            }}
                        />
                    ))}
                </tbody>
            </table>

            {adminMode && contextMenu.visible && (
                <div
                    className="absolute z-50 bg-white text-black rounded shadow-lg w-36"
                    style={{ top: contextMenu.y - 150, left: contextMenu.x }}
                    onClick={() => setContextMenu({ ...contextMenu, visible: false })}
                >
                    <button
                        onClick={() => handleEdit(contextMenu.task)}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(contextMenu.task)}
                        className="block w-full px-4 py-2 hover:bg-red-100 text-left"
                    >
                        Delete
                    </button>
                </div>
            )}

            {adminMode && (
                <EditTask
                    isOpen={editModalOpen}
                    task={taskToEdit}
                    onClose={() => setEditModalOpen(false)}
                    onSave={fetchTasks}
                />
            )}

        </div>
    );
};

export default TaskGrid;
