import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../../contexts/user'
import useGroup from '../../contexts/group'

const AddTask = ({ onTaskAdded }) => {
    const { currUser } = useUser()
    const { currGroup, groups } = useGroup()

    const [formVisible, setFormVisible] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const [members, setMembers] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            alert("Can't upload more than 3 files.");
            return;
        }
        setSelectedFiles(files);
    };

    const uploadPdfToTask = async (taskId, files) => {
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            var fileCount = 0

            try {
                const res = await axios.put(`http://localhost:3000/api/task/${taskId}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                fileCount = res.data.task.attachments.length
                // console.log(`Uploaded ${file.name}:`, res.data);
            } catch (err) {
                console.error(`Error uploading ${file.name}:`, err);
            }

            if (fileCount >= 3) {
                return
            }
        }
    };


    useEffect(() => {
        const fetchGroupMembers = async () => {
            if (!currGroup || !groups.length) {
                // console.log('State not set')
                return;
            }

            const group = groups.find(g => g._id === currGroup)
            if (!group || !group.members || !group.members.length) {
                if (!group) {
                    // console.log("Couldn't find group")
                }
                else if (!group.users) {
                    // console.log("Users array doesn't exist")
                }
                else if (!group.users.length) {
                    // console.log("No user in group")
                }

                return;
            }

            // console.log(group.members)

            try {
                const memberOptions = group.members.map(member => ({
                    _id: member._id,
                    email: member.email
                }))
                setMembers(memberOptions)
            } catch (err) {
                console.error('Failed to fetch member emails:', err)
            }
        }

        fetchGroupMembers()
    }, [currGroup, groups])

    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
        assignedTo: '',
        attachments: [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const taskData = {
                ...form,
                attachments: [],
                group: currGroup,
                createdBy: currUser._id,
            }

            const res = await axios.post('http://localhost:3000/api/task', taskData)
            if (res.status === 201) {
                setForm({
                    title: '',
                    description: '',
                    status: 'pending',
                    priority: 'medium',
                    dueDate: '',
                    assignedTo: '',
                    attachments: [],
                })

                const task = res.data.task
                if (task.attachments.length >= 3) {
                    console.error("Only 3 file uploads allowed")
                    return
                }

                // console.log("Adding attachments to", taskId)
                if (selectedFiles.length === 0) {
                    console.error("No file selected")
                    return
                }

                setFormVisible(false);
                setLoading(true); // Show loading popup

                await uploadPdfToTask(task._id, selectedFiles);

                setLoading(false); // Hide loading popup
                setSuccessPopup(true);

            }
        } catch (error) {
            console.error('Error creating task:', error.message)
        }
    }

    const handleSuccessOk = () => {
        setSuccessPopup(false)
        onTaskAdded?.()  // refresh tasks
    }

    return (
        <div className="p-4">
            {/* Add Task button */}
            {!formVisible && (
                <button
                    onClick={() => setFormVisible(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-500"
                >
                    Add Task
                </button>
            )}

            {/* Task Form Popup */}
            {formVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded shadow-lg space-y-4 w-full max-w-md backdrop-blur-md border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40"
                            />
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40"
                            >
                                <option value="pending" className='bg-black'>Pending</option>
                                <option value="in-progress" className='bg-black'>In Progress</option>
                                <option value="completed" className='bg-black'>Completed</option>
                            </select>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black/60 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40"
                            >
                                <option value="low" className='bg-black'>Low</option>
                                <option value="medium" className='bg-black'>Medium</option>
                                <option value="high" className='bg-black'>High</option>
                            </select>
                            <input
                                type="date"
                                name="dueDate"
                                value={form.dueDate}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black/60 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40"
                            />
                            <select
                                name="assignedTo"
                                value={form.assignedTo}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black/60 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40"
                                required
                            >
                                <option value="" className='bg-white text-black'>Assign to member...</option>
                                {members.map(member => (
                                    <option key={member._id} value={member._id} className='bg-white text-black'>
                                        {member.email}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="file"
                                accept=".pdf"
                                multiple
                                onChange={handleFileChange}
                                className="w-full p-2 rounded bg-white/10 text-black placeholder-black/60 border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/40 file:text-black file:bg-black/10 file:border-none file:rounded file:px-2 file:py-1 file:mr-2"
                            />
                            <div className="flex gap-4">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormVisible(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white/40 text-black p-4 rounded shadow-lg">
                        <p>Uploading PDF...</p>
                    </div>
                </div>
            )}


            {successPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-green-100 text-green-800 p-6 rounded shadow-lg text-center w-full max-w-sm">
                        <span className="block mb-4 text-lg font-medium">Task Created Successfully!</span>
                        <button
                            onClick={handleSuccessOk}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddTask
