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
    itemData.price = '3.5';


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
    $.post('/menu', itemData)
      .then(data => {
        createCartElement(data);
      });

    //reset page
    resetPage();
  })


  //CART

  //reset page
  const resetPage = function () {
    //clear special request
    $('#special_request').val("");
    //reset radio buttons and checkbox
    $(':checkbox').prop('checked', false);
    $(':radio').prop('checked', false);
    //reset quantity
    $('#quantity').text(1);
    //close pop up screen
    $(".popup").hide();
  }

  //creating html element for each item
  const createCartElement = function (data) {
    let instruction = `${data.size}, ${data.milk}`;
    if (data.espresso_option !== undefined) instruction.concat(`, ${data.espresso_option}`);
    if (data.special_request !== undefined) instruction.concat(`, ${data.special_request}`);

    //if option has a price, need to add on the total price


    const cart = $('.cart-order-items');
    cart.append(`
    <div class="cart-order-item">
      <div class="quantity"><h4>${data.quantity}</h4></div>
          <div class="item-description">
            <h4 class="item-name">${data.name}</h4>
            <p class="instruction">${instruction}</p>
          </div>
          <span class="remove">Remove</span>
          <div class="price"><h4>$${data.price * data.quantity}</h4></div>
    </div>

      `)
  };

  //rendering all items submitted
  const renderItems = function (items) {
    for (const item of items) {
      //creating html element for each item
      const $item_html = createCartElement(item);
      $('.cart-order-items').append($item_html);
    }
  }





});


