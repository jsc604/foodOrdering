$(document).ready(function () {
  $('.quantity_button').on('click', function () {
    let $button = $(this);
    let currentValue = $button.closest('.quantity_selector').find('#quantity').text();
    let newValue = 0;
    if($button.text() === '+') {
      newValue = parseInt(currentValue) + 1;
    } else if ($button.text() === '-') {
        if(currentValue > 0) {
          newValue = parseInt(currentValue) - 1;
        }
    }
    $button.closest('.quantity_selector').find('#quantity').text(newValue);
  })
});
