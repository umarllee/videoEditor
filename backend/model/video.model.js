import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    country: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String, 
        required: true,
    },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
