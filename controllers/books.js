const Book = require('../models/book');
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors/notFound')



const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ createdBy:req.user._id }).sort('createdAt')
        res.status(StatusCodes.OK).render("books", { books });
    } catch (error) {
        console.error(error);
        throw new NotFoundError(`can't get books`);
    }
};

const getBookById = (req, res) => {
    res.send("Get book by ID");
};

const addNewBook = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        if (!req.user._id) {
            throw error
        }
        console.log('Creating book entry:', req.body);
        const book = await Book.create(req.body);
        res.redirect("/books");
    } catch (error) {
        console.error(error);
        throw new NotFoundError(`can't add book`);
    }
};

const updateBook = (req, res) => {
    res.send("Update book by ID");
};

const deleteBook = (req, res) => {
    res.send("Delete book by ID");
};

module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook,
};
