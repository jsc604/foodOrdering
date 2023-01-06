$(document).ready(function() {

  $('.confirm-order').submit(function(event) {
    event.preventDefault();
    const orderItems = [];
    const orderItemElements = $(this).parent().parent().siblings().find('.cart-order-item');
    for (let item of orderItemElements) {
      const quantity = $(item).find('.quantity').text();
      const name = $(item).find('.item-name').text();
      const price = $(item).find('.price').text();
      const instruction = $(item).find('.instruction').text();
      orderItems.push({quantity, name, price, instruction});
    }
    console.log('orderItems', orderItems);
  })

  $.ajax({
    url:"/confirm-order",
    method: "POST",
    data: $(this).serialize(),
    success: function (){
        alert ("hello");
    },
    error: function(res) {
        alert(res)
    }
})
})

