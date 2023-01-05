$(document).ready(function () {
  //OPEN
  $(".description-picture").click(function () {
    $(".popup").show();
  });

  $(".checkout").click(function () {
    $(".checkout-container").show();
    $('.container').css({
      "color" : "gray",
      "opacity" : "0.3"
    })
  });

  //CLOSE
  $("#close").click(function () {
    $(".popup").hide();
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
    $('.container').css({
      "opacity": "1",
      "color": "black"
    })
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
  $(document).on("click", ".remove-opt", function () {
    $(this).parent().remove();
    $(".price").remove();
    $(".quantity").remove();
  });
  //
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

  //CART ITEM COUNT
});
