const express = require('express');
const router = express.Router();

const {getAllMessage, sendMessage, deleteChat} = require('../controllers/messsage');

router.get('/:id', getAllMessage);
router.post('/:id', sendMessage);
router.delete('/:id', deleteChat);

module.exports = router;