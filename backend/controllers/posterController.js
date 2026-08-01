const Poster = require('../models/Poster');
const aiService = require('../services/aiService');

const generatePoster = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const posterData = await aiService.generatePoster(prompt);

    const poster = await Poster.create({
      user: req.user ? req.user._id : undefined,
      prompt,
      imageUrl: posterData.imageUrl,
    });

    res.status(201).json(poster);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to generate poster' });
  }
};

const getHistory = async (req, res) => {
  try {
    const posters = await Poster.find(
      req.user ? { user: req.user._id } : {}
    ).sort({ createdAt: -1 });

    res.status(200).json(posters);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};

const deletePoster = async (req, res) => {
  try {
    const { id } = req.params;

    const poster = await Poster.findById(id);

    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    await poster.deleteOne();

    res.status(200).json({ message: 'Poster deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete poster' });
  }
};

module.exports = {
  generatePoster,
  getHistory,
  deletePoster,
};