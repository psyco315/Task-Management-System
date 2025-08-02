const createUser = async (req, res, Model) => {
  try {
    let { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // // Set role to admin for specific email
    // if (email === 'admin@test.com') {
    //   role = 'admin';
    // }

    console.log('Before upload', req.body)
    const user = await Model.create({ name, email, password, role });
    res.status(201).json({ 
      message: 'User created successfully', 
      user: { name: user.name, email: user.email, role: user.role } 
    });

    console.log('After upload:', user)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res, Model) => {
  try {
    const users = await Model.find().select('-password'); // exclude password from all

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUser = async (req, res, Model) => {
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

const updateUser = async (req, res, Model) => {
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

const deleteUser = async (req, res, Model) => {
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

export { createUser, getAllUsers, getUser, updateUser, deleteUser };