$(document).ready(function () {
  $('form').submit(function(event) {
    event.preventDefault();
    let itemData = {};
    const formData = $(this).serialize();
    //must include size
    if (!formData.includes('size')) {
      //error message
    }

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
    console.log(formData, 'formData');
    console.log(itemData);


  })

});
