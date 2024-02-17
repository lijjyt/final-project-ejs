const Book = require('../models/book');
const {StatusCodes} = require('http-status-codes')

//const { NotFoundError } = require('../errors/notFound');



const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ createdBy:req.user._id }).sort('createdAt')
        res.status(StatusCodes.OK).render("books", { books });

    } catch (error) {
        console.error(error);
        req.flash('error', error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getEntryPage = async (req, res) => {
    try {
        res.status(StatusCodes.OK).render('entry');
    } catch (error) {
        req.flash('error', error.message)
    }
}


const addNewBook = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        if (!req.user._id) {
            throw Error
        }


        console.log('Creating book entry:', req.body);
        const book = await Book.create({
            ...req.body,
            createdBy: req.user._id,
        });
        res.redirect("/books");
    } catch (error) {
        req.flash('error', error.message)
        res.send(error.message)
    }
}

const updateBook = async (req, res) => {
    const {
        body: { title, author, status, start, finish, recommend, createdBy },
        user: { userId },
        params: { id: bookId },
    } = req;
    
      try {
        if (!title || !author) {
          throw new Error('Title and Author are required');
        }
        
        const book = await Book.findByIdAndUpdate(
          { _id: bookId, createdBy: userId },
          { title, author, status, start, finish, recommend },
          { new: true, runValidators: true }
        );
    
        if (!book) {
          throw new Error('Book not found');
        }
    
        res.status(StatusCodes.OK).json({ book });
      } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
};

const deleteBook = async (req, res) => {
    const {
        user: { userId },
        params: { id: bookId }
    } = req;

    try {
        const book = await Book.findByIdAndDelete(
            { _id: bookId, createdBy: userId },
        );

        if (!book) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Book not found' });
        }

        res.status(StatusCodes.OK).json({ msg: 'The entry was deleted.' });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllBooks,
    getEntryPage,
    addNewBook,
    updateBook,
    deleteBook,
};
