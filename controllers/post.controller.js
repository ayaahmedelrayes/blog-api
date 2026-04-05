const Post = require('../models/Post');
const AppError = require('../utils/AppError');

exports.createPost = async (req, res, next) => {
    try {
        const { title, content, group } = req.body;
        const post = await Post.create({
            title,
            content,
            group,
            author: req.user._id,
            images: req.uploadedImages || [],
        });
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        next(err);
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email')
            .populate('group', 'name')
            .sort('-createdAt');
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email')
            .populate('group', 'name');
        if (!post) return next(new AppError('Post not found', 404));
        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(new AppError('Post not found', 404));

        if (post.author.toString() !== req.user._id.toString()) {
            return next(new AppError('You can only update your own posts', 403));
        }

        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Post updated successfully', updated });
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(new AppError('Post not found', 404));

        const isSuperAdmin = req.user.role === 'superadmin';
        const isOwner = post.author.toString() === req.user._id.toString();

        if (!isOwner && !isSuperAdmin) {
            return next(new AppError('You can only delete your own posts', 403));
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        next(err);
    }
};
