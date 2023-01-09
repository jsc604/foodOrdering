$(document).ready(function () {
  $('.add-to-cart').submit(function (event) {
    event.preventDefault();
    let itemData = {};
    const formData = $(this).serialize();
    const addOns = formData.split('&');
    const id = $(this).data().id;

    //must include size
    if (id <= 4) {
      if (!formData.includes('size')) {
        //error message
        return;
      } else if (!formData.includes('milk')) {
        return;
      }
    }

    if (id > 4 && id <= 7) {
      if (!formData.includes('flavour')) {
        return;
      }
    }

    //get quantity
    itemData.quantity = $(`#quantity-${id}`).text();
    //get name
    itemData.name = ($(`#item-name-${id}`).text()).trim();
    //get price
    itemData.price = parseFloat((($(`#item-price-${id}`).text()).trim()).slice(1));


    for (const addOn of addOns) {
      const data = addOn.split('=');
      itemData[data[0]] = data[1];
    }


    //update price for diff size
    if (itemData.size === 'medium') {
      itemData.price += 0.75;
    } else if (itemData.size === 'large') {
      itemData.price += 1.5;
    }
    //update price for diff milk
    if (itemData.milk === "almond_milk" || itemData.milk === "oat_milk" || itemData.milk === "soy_milk") itemData.price += 1;

    //update price for espresso shots
    if (itemData.espresso_option === "extra_shot") itemData.price += 1;


    //submit data
    $.post('/menu', itemData)
      .then(data => {
        createCartElement(data, id);
        const updatedPrice = parseFloat($('.subtotal').text()) + data.price * data.quantity;
        const updatedTime = parseInt($('#estimate_time').text()) + 3 * data.quantity;
        const updatedCartCount = parseInt($('.cart-item-count').text()) + 1;
        $('.subtotal').text(updatedPrice);
        $('#estimate_time').text(updatedTime);
        $('.cart-item-count').text(updatedCartCount);
      });

    //reset page
    resetPage(id);
  })


  //CART

  //reset page
  const resetPage = function (id) {
    //clear special request
    $('.special_request').val("");
    //reset radio buttons and checkbox
    $(':checkbox').prop('checked', false);
    $(':radio').prop('checked', false);
    //reset quantity
    $(`#quantity-${id}`).text(1);
    //close pop up screen
    $(".popup").hide();
  }

  //creating html element for each item
  const createCartElement = function (data, id) {
    let instruction = "";

    console.log(data.special_request)
    const cart = $('.cart-order-items');

    //coffee
    if (id <= 4) {
      instruction = `${data.size}, ${data.milk}`;
      if (data.espresso_option !== undefined) instruction+=`, ${data.espresso_option}`;
      //check if there is a special request
      if (data.special_request !== undefined) {
        //add special request to instruction
        instruction+= `, ${data.special_request}`;
      }
      cart.append(`
    <div class="cart-order-item" >
      <div class="quantity"><h4>${data.quantity}</h4></div>
          <div class="item-description">
            <h4 class="item-name" data-id="${id}">${data.name}</h4>
            <p class="instruction">${instruction}</p>
            <div class="price"><h4 class="remove" data-quantity="${data.quantity}"
            data-price="${data.price}">remove</h4></div>
          </div>
          <h4>$${data.price * data.quantity}</h4>
    </div>
      `)
    } else if (id > 4 && id <= 7) { //bakery
      instruction = `${data.flavour}`;
      if (data.special_request !== undefined) {
        instruction+= `, ${data.special_request}`;
      }
      cart.append(`
      <div class="cart-order-item" >
      <div class="quantity"><h4>${data.quantity}</h4></div>
          <div class="item-description">
            <h4 class="item-name" data-id="${id}">${data.name}</h4>
            <p class="instruction">${instruction}</p>
            <div class="price"><h4 class="remove" data-quantity="${data.quantity}"
            data-price="${data.price}"
            >remove</h4></div>
          </div>
          <h4>$${data.price * data.quantity}</h4>
    </div>`)
    } else if (id > 7) { //miscellaneous
      if (data.special_request !== undefined) {
        instruction+= `${data.special_request}`;
      }
      cart.append(`
        <div class="cart-order-item" >
        <div class="quantity"><h4>${data.quantity}</h4></div>
            <div class="item-description">
              <h4 class="item-name" data-id="${id}">${data.name}</h4>
              <p class="instruction">${instruction}</p>
              <div class="price"><h4 class="remove" data-quantity="${data.quantity}"
              data-price="${data.price}">remove</h4></div>
            </div>
            <h4 class="item-price">$${data.price * data.quantity}</h4>
      </div>`)
    }

  };




});


