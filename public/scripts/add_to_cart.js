$(document).ready(function () {
  $('form').submit(function(event) {
    event.preventDefault();
    let itemData = {};
    const formData = $(this).serialize();
    //must include size
    if (!formData.includes('size')) {
      //error message
    }
    //get quantity
    itemData.quantity = $('#quantity').text();
    const addOns = formData.split('&');
    for (const addOn of addOns) {
      const data = addOn.split('=');
      itemData[data[0]] = data[1];
    }
    //check if there is a special request
    if ($('#special_request').val()) {
      //add special request to itemData
      itemData.special_request = $('#special_request').val();
    }

    //submit data
    $.post('/echo', itemData)
      .then(data => {
        const cart = $('.cart-order-items');
        cart.append('<p>added item</p>');
      })



    // $.ajax({
    //   url: "",
    //   method: 'POST',
    //   data: itemData
    // })
    //clear special request
    //unclick radio buttons

    $("#close").click(function () {
      $(".popup").hide();
    });

    //$(this).prop('checked', false);
    // $(function () {
    //   const $orders = $('.cart-order-items');

    //   $.ajax({
    //     type: "GET",
    //     // URL TO DATABASE
    //     url: "#",
    //     success: function (data) {
    //       //test with console.log('success', data) to see objects
    //       $.each(orders, function (i, order) {
    //          $orders.append(``)
    //       });
    //     },
    //   });
    // });

  })


//CART

  //load all previous items in cart
  const loadCart = function () {
    $.ajax({
      url: "/tweets/",
      method: 'GET',
    })
      .then((data) => {
        renderTweets(data);
      })
  };


//creating html element for each item
const createCartElement = cartData => {
  let instruction = `${cartData.size}, ${cartData.milk}`;
  if(cartData.espresso_option) {
    instruction.append(`, ${cartData.espresso_option}`) ;
  }
  if (cartData.special_request) instruction.append(`, ${cartData.special_request}`);


  const cart = `
  <div class="cart-order-items">
    <span class="quantity">${cartData.quantity}</span>
    <div class="item-description">
      <h4 class="item-name">${cartData.name}</h4>
      <p class="instruction">${instruction}</p>
      <h4 class="price">${cartData.price}</h4>
    </div>
  </div>

  `
}

//rendering all items submitted
const renderItems = function (items) {
  for(const item of items) {
    //creating html element for each item
    const $item_html = createCartElement(item);
    $('.cart-order-items').append($item_html);
  }
}





});


