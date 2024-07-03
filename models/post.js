const db = require('../config/db');

const createPost = async (post) => {
    const [result] = await db.query('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [post.user_id, post.title, post.content]);
    return result;
};

const findPosts = async () => {
    const [rows] = await db.query('SELECT * FROM posts');
    return rows;
};

const findPostById = async (id) => {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
};

const updatePost = async (id, post) => {
    const [result] = await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [post.title, post.content, id]);
    return result;
};

const deletePost = async (id) => {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    return result;
};

module.exports = { createPost, findPosts, findPostById, updatePost, deletePost };
