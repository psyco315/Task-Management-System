import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: String, // You can change this to mongoose.Schema.Types.ObjectId if referencing a User model
    default: '',
  },
  attachments: {
    type: [String], // Array of file URLs or names
    default: [],
  }
}, { timestamps: true });


// The collection will be named "tasks"
const Task = mongoose.model('Task', taskSchema);

export default Task;