import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
    const existing = await User.findOne({ where: { email: 'admin@example.com' } });
    if (existing) return;

    const password = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Admin User', email: 'admin@example.com', password });
    console.log('Sample user seeded');
};

export default async function seedDatabase() {
    await seedUsers();
}