const { check} = require('express-validator');

const handleValidationErrors = require('../middleware/validate.middleware');
exports.validatePost = [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
    handleValidationErrors,
];

