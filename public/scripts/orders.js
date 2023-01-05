// Client facing scripts here
$(() => {

  // PICK UP BUTTON
  $('button.pick-up').click(function() {

    $(this).html('<i class="fa fa-check"></i>');
    $(this).closest('tr').css({
      'opacity': '0.8',
      'background-color': 'lightgreen'
    });
  });

  // START ORDER BUTTON
  $('button.start-order').click(function(event) {
    event.preventDefault();

    const currentDateTime = new Date().toString();
    $(this).text(`ORDER STARTED ON: ${currentDateTime}`);

    $(this).closest('tr').find('.btn-success').removeClass('disabled');

    // Check if the button is already disabled
    if (!$(this).prop('disabled')) {
      $(this).prop('disabled', true);
      $(this).closest('form').submit();
    }

    $(this).css({
      'background-color': '#ffc107',
      'color': 'black'
    });
  });


  // COMPLETED BUTTON
  $('#completeForm').click(function(event) {
    event.preventDefault();
    $.ajax({
      url: '/orders/complete-order',
      type: 'POST',
      data: $('#completeForm').serialize()
    })
      .then(function() {
        location.reload();
      });
  });

});
