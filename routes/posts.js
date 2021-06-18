const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { remove } = require('../models/Post');

// CRUD API

// Get all the posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Henter alle vores posts.
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  //Gemmer til vores DB.
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete specific post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({
      _id: req.params.postId,
    });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update specific post
router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      {
        _id: req.params.postId,
      },
      { $set: { title: req.body.title } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
