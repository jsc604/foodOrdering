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
  $('button.start-order').click(function() {
    const currentDateTime = new Date().toString();

    const dayOfWeek = currentDateTime.slice(0, 3);
    const month = currentDateTime.slice(4, 7);
    const dayOfMonth = currentDateTime.slice(8, 10);

    const year = currentDateTime.slice(11, 15);
    const hour = currentDateTime.slice(16, 18);
    const minute = currentDateTime.slice(19, 21);
    const second = currentDateTime.slice(22, 24);

    const formattedDateTime = "Order started: " + dayOfWeek + " " + month + " " + dayOfMonth + " " + year + " " + hour + ":" + minute + ":" + second;

    $(this).text(formattedDateTime);

    $(this).css({
      'background-color': '#ffc107',
      'color': 'black'
    });
  });

  // COMPLETED BUTTON
  $('.start-order').on('click', function() {
    $(this).closest('tr').find('.btn-success').removeClass('disabled');
  });
});
