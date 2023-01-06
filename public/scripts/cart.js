$(document).ready(function() {

  $('#confirm-order').submit(function(event) {
    event.preventDefault();
    const orderItems = [];
    const orderItemElements = $(this).parent().parent().siblings().find('.cart-order-item');

    for (let item of orderItemElements) {
      const quantity = $(item).find('.quantity').text();
      const name = $(item).find('.item-name').text();
      const menu_item_id = $(item).find('.item-name').data().id;
      const price = parseFloat($(item).children('h4').text().slice(1));
      const instructions = $(item).find('.instruction').text();

      orderItems.push({quantity, name, price, instructions, menu_item_id});
    }

    const phone = $('#phone').val();
    const name = $('#customer-name').val();
    const total_price = $('.subtotal').text();
    const estimated_prep_time = $('#estimate_time').text();
    const order_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sendData = {name, phone, orderItems, total_price, estimated_prep_time, order_time};
    $.post('/checkout', sendData)
      .then(data => {
        $('.popup-phone').hide();
        $('.cart-order-item').remove();
        $('.subtotal').text(0);
        $('#estimate_time').text(0);
        $('.cart-item-count').text(0);
      })
      .catch(err => {
        console.log('error at checkout',err);
      })
  })
});

