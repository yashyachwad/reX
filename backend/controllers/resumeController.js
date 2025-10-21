const Resume = require('../models/resumeModel');
const fs = require('fs');
const path = require('path');

// create resume function 
const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // default resume <Pasted from github>
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        profilePreviewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      education: [
        {
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
        },
      ],
      skills: [
        {
          name: '',
          progress: 0,
        },
      ],
      projects: [
        {
          title: '',
          description: '',
          github: '',
          liveDemo: '',
        },
      ],
      certifications: [
        {
          title: '',
          issuer: '',
          year: '',
        },
      ],
      languages: [
        {
          name: '',
          progress: '',
        },
      ],
      interests: [''],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });

    return res.status(201).json(newResume);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create Resume',
      error: error.message,
    });
  }
};

// get resume function 
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    return res.json(resumes);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to get Resumes',
      error: error.message,
    });
  }
};

// get specific resume by id
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume Not Found / Unauthorized',
      });
    }

    return res.json(resume);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to get Resume',
      error: error.message,
    });
  }
};

// update resume function
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume Not Found / Unauthorized' });
    }

    Object.assign(resume, req.body);
    const savedResume = await resume.save();
    return res.json(savedResume);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update Resume',
      error: error.message,
    });
  }
};

// delete resume function
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume Not Found / Unauthorized' });
    }

    const uploadFolder = path.join(process.cwd(), 'uploads');

    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }

    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }

    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Resume Not Found / Unauthorized' });
    }

    return res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete Resume',
      error: error.message,
    });
  }
};

module.exports = { createResume, getUserResumes, getResumeById, updateResume, deleteResume };
