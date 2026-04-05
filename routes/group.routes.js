
const express = require('express');
const router = express.Router();
const { createGroup, addMember, removeMember, givePostPermission } = require('../controllers/group.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateGroup } = require('../validators/group.validator');
router.use(protect);

router.post('/', validateGroup, createGroup);
router.post('/:id/members', addMember);
router.delete('/:id/members', removeMember);
router.post('/:id/permissions', givePostPermission);

module.exports = router;