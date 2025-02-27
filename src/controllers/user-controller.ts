import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// Get all users
export async function getUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

// Get single user by _id and populate thoughts and friends
export async function getSingleUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

// Create a new user
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

// Update a user by _id
export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

// Delete a user by _id (and optionally delete associated thoughts)
export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    // BONUS: Remove user's associated thoughts
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err: any) {
    res.status(500).json(err);
  }
}

// Add a friend
export async function addFriend(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

// Remove a friend
export async function removeFriend(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json(err);
  }
}
