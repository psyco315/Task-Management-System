import axios from "axios";
import TaskRow from "./TaskRow";
import { useEffect, useState } from "react";

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const getData = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    const reqURL = "http://localhost:3000/task";

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getData(reqURL);
            setTasks(data.tasks); // assuming API returns { tasks: [...] }
        };

        fetchTasks();
    }, []);

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

    const sortedTasks = getSortedTasks();

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
        <div className="overflow-auto p-5 shadow-xl border border-white/20 backdrop-blur-md">
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
                        <TaskRow key={task._id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskGrid;
