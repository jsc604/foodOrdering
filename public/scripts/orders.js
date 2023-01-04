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
    // Get the current date and time
    const currentDateTime = new Date().toString();

    // Extract the day of the week (e.g. "Sun"), the month (e.g. "Jan"), and the day of the month (e.g. "01")
    const dayOfWeek = currentDateTime.slice(0, 3);
    const month = currentDateTime.slice(4, 7);
    const dayOfMonth = currentDateTime.slice(8, 10);

    // Extract the year (e.g. "2023"), the hour (e.g. "13"), the minute (e.g. "05"), and the second (e.g. "00")
    const year = currentDateTime.slice(11, 15);
    const hour = currentDateTime.slice(16, 18);
    const minute = currentDateTime.slice(19, 21);
    const second = currentDateTime.slice(22, 24);

    // Create the formatted date and time string
    const formattedDateTime = "Order started: " + dayOfWeek + " " + month + " " + dayOfMonth + " " + year + " " + hour + ":" + minute + ":" + second;

    // Change the text of the button to the formatted date and time
    $(this).text(formattedDateTime);

    $(this).css({
      'background-color': '#ffc107',
      'color': 'black'
    });
  });

  // COMPLETED BUTTON
  $('.start-order').on('click', function() {
    // Enable the "Complete" button when the "Start Order" button is clicked
    $(this).closest('tr').find('.btn-success').removeClass('disabled');
  });
});
