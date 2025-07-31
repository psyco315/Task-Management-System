const createUserA = async (req, res, Model) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await Model.create({ email, password, role });
    res.status(201).json({ message: 'User created successfully', user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserA = async (req, res, Model) => {
  try {
    const { id } = req.params;

    const user = await Model.findById(id).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserA = async (req, res, Model) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await Model.findByIdAndUpdate(
      id,
      { email },
      { new: true, runValidators: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserA = async (req, res, Model) => {
  try {
    const { id } = req.params;

    const user = await Model.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUserA, getUserA, updateUserA, deleteUserA };