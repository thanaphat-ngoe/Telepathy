const express = require('express');
const router = express.Router();

const {getAllMessage, sendMessage} = require('../controllers/messsage');

router.get('/:id', getAllMessage);
router.post('/:id', sendMessage);

module.exports = router;