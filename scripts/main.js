$(document).ready(function () {
    $('.book-tile').on('click', function () {
        const bookId = $(this).data('id');
        const title = $(this).data('title');
        const author = $(this).data('author');
        const status = $(this).data('status');
        const start = $(this).data('start');
        const finish = $(this).data('finish');
        const recommend = $(this).data('rec');
        
  
        $('#bookTitle').text(title);
        $('#bookAuthor').text(author);
        $('#bookStatus').text(status);
        $('#bookStart').text(start);
        $('#bookFinish').text(finish);
        $('#bookRec').text(recommend);

        //modal.find('#editBookBtn').attr('data-id', bookId);
        $('#deleteBookBtn').data('id', bookId);
    });
    $('#deleteBookBtn').on('click', function (e) {
        e.preventDefault();
        const bookId = $(this).data('id');
        
        jQuery.ajax({
            type: 'DELETE',
            url: `/books/${bookId}`,
            success: function (data) {
                console.log(data);
                window.location.href = '/books';
            },
            error: function (error) {
                console.error(error);
            }
        });
     });
});