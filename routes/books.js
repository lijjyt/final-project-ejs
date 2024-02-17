const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');


router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getBookById);

router.post('/', bookController.addNewBook);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;