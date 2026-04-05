const { body} = require('express-validator');

const handleValidationErrors = require('../middleware/validate.middleware');

exports.validateGroup = [
    body('name').notEmpty().withMessage('Group name is required'),
    handleValidationErrors,
];
