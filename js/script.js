jQuery(document).ready(function ($) {
    $('#loading2').hide();
    $('.card').hide();
    function createBookListItem(book){
        var $li = $('<li>');    
        $li.addClass('list-group-item hover-invert cursor-pointer');
        $li.html(book.title);     
        $li.data('bookId', book.id);
        return $li;
    }
    $('#loading').show();
    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function (response) {
        response.data.forEach(function (book){
            $('#book-list').append(createBookListItem(book));
        });
        $('#loading').hide();
        $('.list-group-item').on('click', function(){
            $('.card').hide();
            $('.list-group-item').removeClass('active');
            var bookId = $(this).data('bookId');
            $(this).addClass('active');
            $('#loading2').show();
            axios.get('http://csc225.mockable.io/books/' + bookId).then(function (response){
                var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title).addClass('card-img-top'); 
                var $title = response.data.title;
                var $author = response.data.author;
                var $pages = response.data.pages + ' pages'; 
                var $year = 'Year: ' + response.data.year; 
                var $country = 'Country: ' + response.data.country; 
                var $language = 'Language: ' + response.data.language; 
                var $linkString = 'Link: '; 
                var $link = $('<a>').attr('href', response.data.link).html(response.data.link); 
                var content = [$linkString, $link];

                $('#img').html($img);
                $('#title').html($title);
                $('#author').html($author);
                $('#pages').html($pages);
                $('#year').html($year);
                $('#country').html($country);
                $('#language').html($language);
                $('#link').html(content);
                
                $('#loading2').hide();
                $('.card').show();
            });
        });
    });
});