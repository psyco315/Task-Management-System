import React, { useState } from "react";
import axios from "axios";
import { FileIcon } from 'lucide-react';
import { useAdminMode } from "../../contexts/admin";

const TaskRow = ({ task, onRightClick }) => {
    const [expanded, setExpanded] = useState(false);
    const description = task.description || "";
    const maxLength = 60;
    const isLong = description.length > maxLength;
    const { adminMode } = useAdminMode()
    const [status, setStatus] = useState(task.status);
    const [isUpdating, setIsUpdating] = useState(false);

    const getPriorityColor = (level) => {
        switch (level) {
            case "high":
                return "bg-red-600";
            case "medium":
            case "mid":
                return "bg-orange-400";
            case "low":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    const getDisplayText = () => {
        if (!isLong || expanded) return description;

        const shortText = description.slice(0, maxLength);
        return (
            <>
                {shortText}
                <span className="bg-gradient-to-r from-blue-400 via-blue-700 to-violet-700 bg-clip-text text-transparent">
                    … read more
                </span>
            </>
        );
    };

    return (
        <tr onContextMenu={onRightClick} className="hover:bg-white/10 transition duration-150 text-black/50 hover:text-black/80 hover:cursor-default">
            <td className="px-4 py-3 w-[14%]">{task.title}</td>

            <td
                className={`px-4 py-3 w-[25%] transition-all duration-300 ease-in-out ${isLong ? "hover:cursor-pointer" : ""}`}
                onClick={() => isLong && setExpanded((prev) => !prev)}
            >
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-40" : "max-h-[3.5rem]"}`}
                >
                    {getDisplayText()}
                </div>
            </td>

            <td className="px-4 py-3 w-[8%]">
                {adminMode ? (
                    status
                ) : (
                    <select
                        value={status}
                        onChange={async (e) => {
                            const newStatus = e.target.value;
                            setStatus(newStatus);
                            setIsUpdating(true);
                            try {
                                await axios.put(`http://localhost:3000/task/${task._id}`, {
                                    status: newStatus,
                                });
                            } catch (err) {
                                console.error("Failed to update status:", err);
                            } finally {
                                setIsUpdating(false);
                            }
                        }}
                        className="bg-transparent outline-none border border-gray-300 px-2 py-1 rounded"
                        disabled={isUpdating}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                )}
            </td>


            <td className="px-4 py-1 w-[6%]">
                <div
                    className={`rounded-[10px] flex justify-center ${getPriorityColor(task.priority)} w-[max] pt-[3px] pb-[4px] px-[9px] text-white`}
                >
                    <div>{task.priority}</div>
                </div>
            </td>

            <td className="px-4 py-3 w-[6%]">{new Date(task.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-3 w-[6%]">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
            <td className="px-4 py-3 w-[16%]">{task.assignedTo || "-"}</td>

            <td className="px-4 py-3 w-[19%]">
                <div className="flex gap-2">
                    {task.attachments.map((fileUrl, index) => (
                        <a
                            key={index}
                            href={fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            <FileIcon className="w-5 h-5" />
                        </a>
                    ))}
                </div>

            </td>
        </tr>
    );
};

export default TaskRow;
