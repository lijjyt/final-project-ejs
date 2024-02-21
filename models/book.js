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
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    start: {
        type: Date,
    },
    finish: {
        type: Date,
    },

    status: {
        type: String,
        enum: ['Reading', 'Unread', 'Finished'],
        default: 'Unread',
    },

    recommend: {
        type: String,
        enum: ['None', 'Yes', 'No', 'Maybe'],
        default: 'None',
    },
    
}, {timestamps:true})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;