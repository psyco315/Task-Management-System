import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res, Model) => {
    const { email, password } = req.body;
    // console.log('Login attempt:', { email, password });

    try {
        const existingUser = await Model.findOne({ email });
        if (!existingUser) {
            // console.log('User not found');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // console.log('Stored hash:', existingUser.password);

        const isMatch = await bcrypt.compare(password, existingUser.password);
        // console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            success: true,
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            token,
        });
    } catch (err) {
        console.error('Sign-in error:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};




export const signUp = async (req, res, Model) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }


        const newUser = new Model({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token,
        });
    } catch (err) {
        console.error('Signup error:', err.message); // Add this
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

