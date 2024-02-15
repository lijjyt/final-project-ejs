const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
    },
    finish: {
        type: Date,
    },

    status: {
        type: String,
        enum: ['reading', 'unread', 'finished'],
        default: 'unread',
    },

    recommend: {
        type: String,
        enum: ['yes', 'no', 'maybe', 'none'],
        default: 'none',
    },
    
}, {timestamps:true})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;