import express from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controller/category.controller.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
