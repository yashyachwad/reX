const express = require('express');
const protect = require('../middlewares/authMiddleware');
const resumeRoutes = express.Router();
const { createResume, getUserResumes, getResumeById, updateResume, deleteResume } = require('../controllers/resumeController');
const uploadResumeImages = require('../controllers/uploadImages');

resumeRoutes.post('/',protect, createResume);
resumeRoutes.get('/',protect,getUserResumes);
resumeRoutes.get('/:id', protect, getResumeById);
resumeRoutes.put('/:id/upload-images', protect, uploadResumeImages);
resumeRoutes.put('/:id/', updateResume);
resumeRoutes.delete('/:id',protect, deleteResume);

module.exports = resumeRoutes;
