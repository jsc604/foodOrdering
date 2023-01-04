$(document).ready(function () {
  $(':checkbox').on('change', function(event) {
    if($('input[type=checkbox]:checked').length > 1) {
      $(this).prop('checked', false);
  }
  })
});
