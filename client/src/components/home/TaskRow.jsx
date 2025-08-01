import React, { useState } from "react";

const TaskRow = ({ task }) => {
    const [expanded, setExpanded] = useState(false);
    const description = task.description || "";
    const maxLength = 60;
    const isLong = description.length > maxLength;

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
        <tr className="hover:bg-white/10 transition duration-150 text-black/50 hover:text-black/80 hover:cursor-default">
            <td className="px-4 py-3">{task.title}</td>

            <td
                className={`px-4 py-3 w-[21%] transition-all duration-300 ease-in-out ${isLong ? "hover:cursor-pointer" : ""}`}
                onClick={() => isLong && setExpanded((prev) => !prev)}
            >
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-40" : "max-h-[3.5rem]"}`}
                >
                    {getDisplayText()}
                </div>
            </td>

            <td className="px-4 py-3">{task.status}</td>

            <td className="px-4 py-1 w-[10%]">
                <div
                    className={`rounded-[10px] ${getPriorityColor(task.priority)} w-max pt-[3px] pb-[4px] px-[9px] text-white`}
                >
                    {task.priority}
                </div>
            </td>

            <td className="px-4 py-3">{new Date(task.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-3">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
            <td className="px-4 py-3">{task.assignedTo || "-"}</td>

            <td className="px-4 py-3">
                <a
                    href="#"
                    className="underline hover:no-underline hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-700 hover:to-violet-700 hover:bg-clip-text hover:text-transparent"
                >
                    View
                </a>
            </td>
        </tr>
    );
};

export default TaskRow;
