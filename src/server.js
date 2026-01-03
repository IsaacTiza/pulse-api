import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import mongoose from 'mongoose';
import app from './app.js';

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectdb().then(() => {
        console.log(`Database connected successfully`);
    });
    console.log(`Server is running on port ${PORT}`);
});