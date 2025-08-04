export const createGroup = async (req, res, Model) => {
    try {
        const { name, members, createdBy } = req.body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: "Group name is required and must be a non-empty string." });
        }

        if (!members || !Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: "Members array is required and must not be empty." });
        }

        if (!createdBy || typeof createdBy !== 'string') {
            return res.status(400).json({ message: "createdBy is required and must be a string." });
        }

        const newGroup = new Model({
            name: name.trim(),
            members,
            createdBy,
            createdAt: new Date(),
        });

        const savedGroup = await newGroup.save();

        res.status(201).json({ group: savedGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getAllGroups = async (req, res, Model) => {
    try {
        const groups = await Model.find().populate('members', '-password');
        res.status(200).json({ groups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGroupsByUserId = async (req, res, Model) => {
    try {
        const { id } = req.params;
        const groups = await Model.find({ members: id }).populate('members', '-password');

        if (!groups || groups.length === 0) {
            return res.status(404).json({ message: 'No groups found for this user' });
        }

        res.status(200).json({ groups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateGroup = async (req, res, Model) => {
    try {
        const { id } = req.params;
        const { name, members } = req.body;

        const group = await Model.findById(id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (name !== undefined) group.name = name;

        if (members !== undefined) {
            // Ensure members is an array
            const newMembers = Array.isArray(members) ? members : [members];

            newMembers.forEach(memberId => {
                if (!group.members.includes(memberId)) {
                    group.members.push(memberId);
                }
            });
        }

        const updatedGroup = await group.save();
        const populatedGroup = await updatedGroup.populate('members', '-password');

        res.status(200).json({ group: populatedGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const joinGroup = async (req, res, Model) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const group = await Model.findById(id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }

        const populated = await group.populate('members', '-password');
        res.status(200).json({ group: populated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const deleteGroup = async (req, res, Model) => {
    try {
        const { id } = req.params;
        const deletedGroup = await Model.findByIdAndDelete(id);

        if (!deletedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
