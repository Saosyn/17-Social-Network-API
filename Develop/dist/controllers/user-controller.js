import User from '../models/User';
import Thought from '../models/Thought';
export default {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single user by _id and populate thoughts and friends
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user by _id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
                new: true,
            });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user by _id (and optionally delete associated thoughts)
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            // BONUS: Remove user's associated thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
