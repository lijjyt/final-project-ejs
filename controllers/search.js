const axios = require('axios');

exports.renderPage = (req, res) => {
    res.render('search'); 
};

exports.searchBooks = async (req, res) => {
    const searchQuery = req.query.q; 

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.API_KEY}`);
        const books = response.data.items; 
        const images = books.map(book => {
            return {
                smallThumbnail: book.volumeInfo?.imageLinks?.smallThumbnail || 'No Image Available'
            };
        });
        res.render('searchResults', { books, images }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


