const { createPost, findPosts, findPostById, updatePost, deletePost } = require('../models/post');

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        let posts
        if(req.params.id!==undefined){
            posts = await findPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }
            res.json(post);
        }else{
            posts = await findPosts();
            res.json(posts);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create a post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = {
            user_id: req.user.id,
            title,
            content
        };

        const post = await createPost(newPost);
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await findPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        post.title = title;
        post.content = content;

        await updatePost(req.params.id, post);
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await findPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        await deletePost(req.params.id);
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
