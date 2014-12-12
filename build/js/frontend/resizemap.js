$(function() {

    function abso() {

        $('#imagemapper1-wrapper').css({
            position: 'fixed',
            width: $(window).width(),
            height: $(window).height()
        });

    }

    $(window).resize(function() {
        abso();         
    });

    abso();

});