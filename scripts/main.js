$(document).ready(function () {
    $('.book-tile').on('click', function () {
        const bookId = $(this).data('id');
        const title = $(this).data('title');
        const author = $(this).data('author');
        const status = $(this).data('status');
        const start = $(this).data('start');
        const finish = $(this).data('finish');
        const recommend = $(this).data('rec');        
  
        $('#bookModal #bookTitle').text(title);
        $('#bookModal #bookAuthor').text(author);
        $('#bookModal #bookStatus').text(status);
        $('#bookModal #bookStart').text(start);
        $('#bookModal #bookFinish').text(finish);
        $('#bookModal #bookRec').text(recommend);
    
        $('#bookModal #deleteBookBtn').data('id', bookId);

        
    
    
    });
    $('#bookModal #deleteBookBtn').on('click', function (e) {
        e.preventDefault();
        const bookId = $(this).data('id');
        console.log('Book ID:', bookId);
        var csrfToken = $(this).data('csrf');

        jQuery.ajax({
            type: 'DELETE',
            url: `/books/${bookId}`,
            headers: {
                'CSRF-Token': csrfToken,
              },
            success: function (data) {
                console.log(data);
                window.location.href = '/books';
            },
            error: function (error) {
                console.error(error);
            }
        });
     });

     $('#bookModal #editBookBtn').on('click', function (e) {
        const bookId = $('#bookModal #deleteBookBtn').data('id');
        const title = $('#bookModal #bookTitle').text();
        const author = $('#bookModal #bookAuthor').text();
        const status = $('#bookModal #bookStatus').text();
        const start = $('#bookModal #bookStart').text();
        const finish = $('#bookModal #bookFinish').text();
        const recommend = $('#bookModal #bookRec').text();

        console.log(title)

        $('#editModal #editBookId').val(bookId);
        $('#editModal #editBookTitle').val(title);
        $('#editModal #editBookAuthor').val(author);
        $('#editModal #editBookStart').attr('placeholder', start);
        $('#editModal #editBookFinish').attr('placeholder', finish);

        $('#editModal #editBookStatus').val(status);
        $('#editModal #editBookRec').val(recommend);

        $('#editModal').modal('show');
    });
    $('#editModal #saveEditBtn').on('click', function (e) {
        e.preventDefault();

        const bookId = $('#editBookId').val();
        const updatedBook = {
            title: $('#editBookTitle').val(),
            author: $('#editBookAuthor').val(),
            status: $('#editBookStatus').val(),
            start: $('#editBookStart').val(),
            finish: $('#editBookFinish').val(),
            recommend: $('#editBookRec').val()
        };
        var csrfToken = $(this).data('csrf');

        jQuery.ajax({
            type: 'PUT',
            url: `/books/${bookId}`,
            data: updatedBook,
            headers: {
                'CSRF-Token': csrfToken,
              },
            success: function (data) {
                console.log(data);
                $('#editModal').modal('hide');
                updateBookInDOM(bookId, updatedBook);

                $('#bookModal #bookTitle').text(data.book.title);
                $('#bookModal #bookAuthor').text(data.book.author);
                $('#bookModal #bookStatus').text(data.book.status);
                $('#bookModal #bookStart').text(data.book.start);
                $('#bookModal #bookFinish').text(data.book.finish);
                $('#bookModal #bookRec').text(data.book.recommend);
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
    function updateBookInDOM(bookId, updatedBook) {
        const bookElement = $(`.book-tile[data-id="${bookId}"]`);
    
        bookElement.html(`${updatedBook.title} by ${updatedBook.author}`);

        bookElement.data('title', updatedBook.title);
        bookElement.data('author', updatedBook.author);
        bookElement.data('status', updatedBook.status);
        bookElement.data('start', updatedBook.start);
        bookElement.data('finish', updatedBook.finish);
        bookElement.data('rec', updatedBook.recommend);
    }
});