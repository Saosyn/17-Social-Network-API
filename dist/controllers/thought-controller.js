import Thought from '../models/Thought.js';
import User from '../models/User.js';
export async function getThoughts(_req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export async function getSingleThought(req, res) {
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
}
export async function createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        // Push the created thought's _id to the associated user
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export async function updateThought(req, res) {
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
}
export async function deleteThought(req, res) {
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
}
export async function addReaction(req, res) {
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
}
export async function removeReaction(req, res) {
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
}
