$(document).ready(function() {
  const charLimit = 140;
  $('textarea').bind('keyup', function() {
    let count = $('#count');
    let charCount = $(this).val().length;
    if (charCount > charLimit) {
      count.addClass('over');
    } else {
      count.removeClass('over');
    }

    count.text(charLimit - charCount);
  });

});