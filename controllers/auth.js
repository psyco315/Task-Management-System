import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res, Model) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await Model.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // On success, return basic user info
    const user = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Sign-in error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const signUp = async (req, res, Model) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Model.create({ name, email, password: hashedPassword });

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
