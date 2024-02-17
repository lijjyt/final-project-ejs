const Book = require('../models/book');

const getAllBooks = (req, res) => {
    res.send("Get all books");
};

const getBookById = (req, res) => {
    res.send("Get book by ID");
};

const addNewBook = (req, res) => {
    res.send("Add new book");
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
