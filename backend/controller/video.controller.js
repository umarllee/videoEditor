import Video from '../model/video.model.js';
import Category from '../model/category.model.js';
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVideo = async (req, res) => {
    const { title, description, country, categoryId } = req.body;
    const file = req.file;

    if (!title || !description || !file || !country || !categoryId) {
        return res.status(400).json({ message: 'Title, description, video file, country, and categoryId are required' });
    }

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newVideo = new Video({
            title,
            description,
            filePath: file.path, 
            country, 
            categoryName: category.name, 
        });

        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await Video.findByIdAndDelete(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
