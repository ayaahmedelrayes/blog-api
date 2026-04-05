const { body } = require('express-validator');
const handleValidationErrors = require('../middleware/validate.middleware');

exports.validateUser = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please enter a valid email'),
    handleValidationErrors,
];