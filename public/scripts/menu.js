$(document).ready(function () {
  //OPEN
  $(".description-picture").click(function () {
    $(".popup").show();
  });

  $(".checkout").click(function () {
    $(".checkout-container").show();
    $(".container").css({
      color: "gray",
      opacity: "0.3",
    });
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
    $(this).parent().remove();

  });

  //UPDATE CART TOTAL
  function update_amounts() {
    let sum = 0.0;
    $(".quantity").each(function () {
      let quantity = $(this).find("#quantity").val();
      console.log(quantity, "test");
      let price = $(this).find(".price").val();
      let amount = quantity * price;
      sum += amount;
      $(this)
        .find(".subtotal")
        .text("" + amount);
    });
    $("subtotal").text(sum);
  }
});
