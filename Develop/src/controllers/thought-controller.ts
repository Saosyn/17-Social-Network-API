import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export async function getThoughts(req: Request, res: Response): Promise<void> {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function getSingleThought(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(thought);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function createThought(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const thought = await Thought.create(req.body);
    // Push the created thought's _id to the associated user
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function updateThought(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(thought);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function deleteThought(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json({ message: 'Thought deleted' });
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function addReaction(req: Request, res: Response): Promise<void> {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(thought);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function removeReaction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(thought);
  } catch (err: any) {
    res.status(500).json(err);
  }
}
