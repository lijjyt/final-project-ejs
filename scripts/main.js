$(document).ready(function () {
    $('.book-tile').on('click', function () {
        const title = $(this).data('title');
        const author = $(this).data('author');
        const status = $(this).data('status');
        const start = $(this).data('start');
        const finish = $(this).data('finish');
        const recommend = $(this).data('rec');
        const bookId = $(this).data('id');
  
        $('#bookTitle').text(title);
        $('#bookAuthor').text(author);
        $('#bookStatus').text(status);
        $('#bookStart').text(start);
        $('#bookFinish').text(finish);
        $('#bookRec').text(recommend);

        $('#editBookBtn').data('id', bookId);
        $('#deleteBookBtn').data('id', bookId);
    });
    //$('#deleteBookBtn').on('click', function (e) {
    //    e.preventDefault();  
    //    const bookId = $(this).data('id');  
    //    window.location.href = `/books/${bookId}`;
    // });
});