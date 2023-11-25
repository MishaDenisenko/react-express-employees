const express = require('express');
const { auth } = require('../middleware/auth');
const { getOne, getAll, remove, edit, add } = require('../controllers/employees');
const router = express.Router();

router.get('/', auth, getAll);
router.get('/:id', auth, getOne);
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;