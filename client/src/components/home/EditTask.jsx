import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

const EditTask = ({ isOpen, onClose, task, onSave }) => {
    const [form, setForm] = useState(() => {
        return task ? { ...task, attachments: task.attachments || [] } : { attachments: [] };
    });
    
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const maxFiles = 3;

    useEffect(() => {
        setSelectedFiles([])
        if (task) {
            setForm({ ...task, attachments: task.attachments || [] });
        }
    }, [task]);



    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const totalFiles = selectedFiles.length + (form.attachments?.length || 0) + newFiles.length;

        if (totalFiles > maxFiles) {
            alert("You can't have more than 3 attachments.");
            return;
        }
        setSelectedFiles(prev => [...prev, ...newFiles]);
    };

    const handleDeleteAttachment = async (indexToDelete) => {
        const fileUrl = form.attachments[indexToDelete];
        const taskId = form._id;

        try {
            await axios.delete(`/api/task/${taskId}/deletepdf`, {
                data: { fileUrl },  // axios requires `data` key in DELETE requests
            });

            // Update local state after successful deletion
            const updatedAttachments = form.attachments.filter((_, i) => i !== indexToDelete);
            setForm(prev => ({ ...prev, attachments: updatedAttachments }));
        } catch (error) {
            console.error('Error deleting attachment:', error);
            alert('Failed to delete attachment');
        }
    };



    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const taskUpdate = { ...form };
            delete taskUpdate.attachments;  // don't send attachments directly

            await axios.put(`/api/task/${task._id}`, taskUpdate);

            if (selectedFiles.length > 0) {
                setLoading(true)
                for (const file of selectedFiles) {
                    const formData = new FormData();
                    formData.append("file", file);
                    await axios.put(`/api/task/${task._id}/upload`, formData);
                }
            }

            setLoading(false)
            onSave();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update task");
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 text-black p-6 rounded-lg w-[90%] max-w-md backdrop-blur-md shadow-xl">
                <h2 className="text-lg font-bold mb-4">Edit Task</h2>

                <input
                    className="w-full mb-2 p-2 border rounded"
                    name="title"
                    value={form?.title || ''}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <textarea
                    className="w-full mb-2 p-2 border rounded"
                    name="description"
                    value={form?.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <select
                    className="w-full mb-2 p-2 border rounded"
                    name="priority"
                    value={form?.priority || ''}
                    onChange={handleChange}
                >
                    <option value="" className='bg-black/20'>Select Priority</option>
                    <option value="low" className='bg-black/20'>Low</option>
                    <option value="medium" className='bg-black/20'>Medium</option>
                    <option value="high" className='bg-black/20'>High</option>
                </select>


                <select
                    className="w-full mb-2 p-2 border rounded"
                    name="status"
                    value={form?.status || ''}
                    onChange={handleChange}
                >
                    <option value="" className='bg-black/20'>Select Status</option>
                    <option value="pending" className='bg-black/20'>Pending</option>
                    <option value="in progress" className='bg-black/20'>In Progress</option>
                    <option value="completed" className='bg-black/20'>Completed</option>
                </select>

                <input
                    className="w-full mb-4 p-2 border rounded"
                    type="date"
                    name="dueDate"
                    value={form?.dueDate?.slice(0, 10) || ''}
                    onChange={handleChange}
                />

                {/* File Upload */}
                <div className="mb-2">
                    <label className="block mb-1">Attachments (max 3)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileChange}
                        className="w-full p-2 rounded bg-white/10 text-black placeholder-black/60 border border-black focus:outline-none focus:ring-2 focus:ring-black file:text-black file:bg-black/10 file:border-none file:rounded file:px-2 file:py-1 file:mr-2"
                    />
                </div>

                {/* Existing Attachments */}
                <div className="flex flex-col gap-2 mb-4">
                    {form.attachments?.map((url, index) => {
                        const extractOriginalFilename = (url) => {
                            const parts = url.split('/');
                            const filenameWithPrefix = parts[parts.length - 1]; // e.g., "1754107379710-ssc%20applcn%20form%2025.pdf"
                            const originalFilename = filenameWithPrefix.split('-').slice(1).join('-');
                            return decodeURIComponent(originalFilename);
                        };

                        return (
                            <div key={index} className="flex items-center gap-2">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline text-sm">
                                    {extractOriginalFilename(url)}
                                </a>
                                <button className='hover:cursor-pointer hover:scale-102' onClick={() => handleDeleteAttachment(index)}>
                                    <FaTrash className="text-red-400 text-sm" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-black/30 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-4 rounded shadow-lg">
                        <p>Uploading PDF...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTask;
