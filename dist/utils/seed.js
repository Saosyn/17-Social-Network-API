// src/seeds/index.ts
// Option A: If your connection.ts exports a connectDB function
import { connectDB } from '../config/connection.js'; // adjust the path as needed
// Option B: If your connection.ts automatically connects on import,
// simply import it without destructuring:
// import '../config/connection.js';
import User from '../models/User.js';
import Thought from '../models/Thought.js';
const seedUsers = [
    {
        username: 'alice',
        email: 'alice@example.com',
    },
    {
        username: 'bob',
        email: 'bob@example.com',
    },
];
const seedThoughts = [
    {
        thoughtText: "This is Alice's first thought!",
        username: 'alice',
    },
    {
        thoughtText: "This is Bob's first thought!",
        username: 'bob',
    },
];
async function seedDatabase() {
    try {
        // If using Option A, explicitly call connectDB() to establish the connection.
        if (typeof connectDB === 'function') {
            await connectDB();
        }
        console.log('Connected to MongoDB.');
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        // Insert seed data
        const createdUsers = await User.insertMany(seedUsers);
        console.log('Seeded Users:', createdUsers);
        const createdThoughts = await Thought.insertMany(seedThoughts);
        console.log('Seeded Thoughts:', createdThoughts);
        console.log('Seeding complete.');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}
seedDatabase();
