const express = require('express');
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/post');
const auth = require('../middleware/auth');

// @route  GET api/posts
// @desc   Get all posts
router.get('/', auth, getPosts);

// @route  POST api/posts
// @desc   Create a post
router.post('/', auth, createPost);

// @route  PUT api/posts/:id
// @desc   Update a post
router.put('/:id', auth, updatePost);

// @route  DELETE api/posts/:id
// @desc   Delete a post
router.delete('/:id', auth, deletePost);

module.exports = router;
