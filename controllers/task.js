const testTask = async (req, res, Model) => {
    const result = [
        { title: 'Sample Task 1', isCompleted: false },
        { title: 'Sample Task 2', isCompleted: true }
    ];

    res.status(200).json({ result, nbHits: result.length })
}

const createTask = async (req, res, Model) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      attachments
    } = req.body;

    const newTask = await Model.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      attachments
    });

    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTask = async (req, res, Model) => {
  try {
    const tasks = await Model.find();
    res.status(200).json({ tasks, count: tasks.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGivenTask = async (req, res, Model) => {
  try {
    const { id } = req.params;
    const task = await Model.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res, Model) => {
  try {
    const { id } = req.params;
    const updatedTask = await Model.findByIdAndUpdate(id, req.body, {
      new: true,       // Return the updated document
      runValidators: true, // Enforce schema validation
    });

    if (!updatedTask) {
      return res.status(404).json({ message: `No task found with ID: ${id}` });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res, Model) => {
  try {
    const { id } = req.params;
    const deletedTask = await Model.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: `No task found with ID: ${id}` });
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadPdf = async (req, res, Task) => {
  try {
    console.log("Uploaded file info:", req.file);
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = req.file.url || req.file.path;
    if (!fileUrl) return res.status(500).json({ error: "File not uploaded to Cloudinary" });


    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $push: { attachments: fileUrl } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "PDF uploaded and task updated",
      task: updatedTask
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { testTask, createTask, getTask, getGivenTask, updateTask, deleteTask, uploadPdf }