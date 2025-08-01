import { useState, useEffect } from 'react';
import axios from 'axios';

const EditTask = ({ isOpen, onClose, task, onSave }) => {
    const [form, setForm] = useState(task);

    useEffect(() => {
        setForm(task); // prefill when task changes
    }, [task]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/task/${task._id}`, form);
            onSave();     // trigger fetchTasks again
            onClose();    // close modal
        } catch (err) {
            console.error(err);
            alert('Failed to update task');
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] bg-opacity-90 text-white p-6 rounded-lg w-[90%] max-w-md backdrop-blur-md shadow-xl">
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
                    <option value="" className='bg-black/30'>Select Priority</option>
                    <option value="low" className='bg-black/30'>Low</option>
                    <option value="medium" className='bg-black/30'>Medium</option>
                    <option value="high" className='bg-black/30'>High</option>
                </select>


                <select
                    className="w-full mb-2 p-2 border rounded"
                    name="status"
                    value={form?.status || ''}
                    onChange={handleChange}
                >
                    <option value="" className='bg-black/30'>Select Status</option>
                    <option value="pending" className='bg-black/30'>Pending</option>
                    <option value="in progress" className='bg-black/30'>In Progress</option>
                    <option value="completed" className='bg-black/30'>Completed</option>
                </select>

                <input
                    className="w-full mb-4 p-2 border rounded"
                    type="date"
                    name="dueDate"
                    value={form?.dueDate?.slice(0, 10) || ''}
                    onChange={handleChange}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-black/50 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
