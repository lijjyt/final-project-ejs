const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');


router.get('/', searchController.renderPage)
router.get('/find', searchController.searchBooks)



module.exports = router;