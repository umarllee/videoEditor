
import express from 'express';
import multer from 'multer';
import { getAllVideos, createVideo, deleteVideo } from '../controller/video.controller.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getAllVideos);
router.post('/', upload.single('video'), createVideo); 
router.delete('/:id', deleteVideo);

export default router;
