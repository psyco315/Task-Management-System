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
    type: String, // Optional: convert to ObjectId if linking to User
    default: '',
  },
  attachments: {
    type: [String], // Array of file URLs or names
    default: [],
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true, // ensure every task belongs to a group
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // every task must be created by a user
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
