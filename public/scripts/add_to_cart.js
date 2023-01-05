$(document).ready(function () {
  $('form').submit(function (event) {
    event.preventDefault();
    let itemData = {};
    const formData = $(this).serialize();
    const addOns = formData.split('&');

    //must include size
    if (!formData.includes('size') || !formData.includes('milk')) {
      //error message
      console.log("need size!");
      return;
    }

    //get quantity
    itemData.quantity = $('#quantity').text();
    //get name
    itemData.name = $('#item_name').text();
    //get price
    itemData.price ='3.5';


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
        let instruction = `${data.size}, ${data.milk}`;
        console.log(data.espresso_option);
        if (data.espresso_option !== undefined) {
          instruction.concat(`, ${data.espresso_option}`);
        }
        if (data.special_request !== undefined) instruction.concat(`, ${data.special_request}`);
        console.log(instruction);
        const cart = $('.cart-order-items');
        cart.append(`
          <div class="quantity"><h4>${data.quantity}</h4></div>

          <div class="item-description">

          <div class="item-info">
            <h4 class="item-name">${data.name}</h4>
            <p class="instruction">${instruction}</p>
          </div>
            <div class="remove-opt">
              <span class="remove">Remove</span>
            </div>
          </div>

          <div class="price"><h4>$${data.price}</h4></div>
      `)
      });




      //clear special request
      $('#special_request').val("");
      //reset radio buttons and checkbox
      $(':checkbox').prop('checked', false);
      $(':radio').prop('checked', false);
      //reset quantity
      $('#quantity').text(1);
      //close pop up screen
      $(".popup").hide();




    // Calculate total price when item added
      



    // $.ajax({
    //   url: "",
    //   method: 'POST',
    //   data: itemData
    // })


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
    if (cartData.espresso_option) {
      instruction.append(`, ${cartData.espresso_option}`);
    }
    if (cartData.special_request) instruction.append(`, ${cartData.special_request}`);


    const cart = `
  <div class="cart-order-items">

    <div class="quantity"><h4>${cartData.quantity}</h4></div>

    <div class="item-description">
      <h4 class="item-name">${cartData.name}</h4>
      <p class="instruction">${instruction}</p>
      <span class="remove">Remove</span>
    </div>

    <div class="price"><h4>${cartData.price}</h4></div>

  </div>
  `
  }

  //rendering all items submitted
  const renderItems = function (items) {
    for (const item of items) {
      //creating html element for each item
      const $item_html = createCartElement(item);
      $('.cart-order-items').append($item_html);
    }
  }





});


