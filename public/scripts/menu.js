$(document).ready(function () {
  //OPEN
  $(".description-picture").click(function () {
    //find the name of item
    const data = $(this).data();
    const popup = $('#popup-' + data.id)

    $(".popup").hide();
    popup.show();
  });

  $(".checkout").click(function () {
    $(".checkout-container").show();
    $(".container").css({
      color: "gray",
      opacity: "0.3",
    });
  });

  //CLOSE
  $(".close_button").click(function () {
    $('.popup').hide();
  });

  //CLOSE POPUP WHEN CLICK OUTSIDE
  $(document).mouseup(function (e) {
    let container = $(".popup");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
    }
  });

  $(document).mouseup(function (e) {
    let container = $(".checkout-container");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
    }
    $(".container").css({
      opacity: "1",
      color: "black",
    });
  });

  // WHEN CLICK REDIRECT TO MATCHING SECTIONS
  $("#mostpopular-span").click(function () {
    window.location.href = "#most-popular";
  });
  $("#coffee-span").click(function () {
    window.location.href = "#coffee";
  });
  $("#bakery-span").click(function () {
    window.location.href = "#bakery";
  });
  $("#miscellaneous-span").click(function () {
    window.location.href = "#miscellaneous";
  });

  //REMOVE ITEM FROM CART
  $(".cart-order-items").on("click", ".remove", function () {
    $(this).parent().parent().parent().remove();
    const price = $(this).data("price");
    const quantity = $(this).data("quantity");
    console.log(price);
    console.log(quantity);
    console.log(this);
    const updatedPrice = parseFloat($('.subtotal').text()) - price * quantity;
    const updatedTime = parseInt($('#estimate_time').text()) - 3 * quantity;
    const updatedCartCount = parseInt($('.cart-item-count').text()) - 1;
    $('.subtotal').text(updatedPrice);
    $('#estimate_time').text(updatedTime);
    $('.cart-item-count').text(updatedCartCount);
  });



});
