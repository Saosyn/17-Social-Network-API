import Thought from '../models/Thought';
import User from '../models/User';
export default {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought and push its _id to the associated user's thoughts array
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Push the created thought's _id to the associated user
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought by _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json({ message: 'Thought deleted' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a reaction by reactionId
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
