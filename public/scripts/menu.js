$(document).ready(function () {
    //OPEN
    $(".description-picture").click(function () {
      $(".popup").show();
    });

    //CLOSE
    $("#close").click(function () {
      $(".popup").hide();
    });

    //CLOSE POPUP WHEN CLICK OUTSIDE
    $(document).mouseup(function(e) {
      let container = $('.popup');

      if(!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
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


    //add to cart

  });
