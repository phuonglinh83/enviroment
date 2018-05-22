/**
 * ================================= newIssue.js ===================================
 * Responsible for validating user input, converting from address to LongLat append
 * submit issue create form to back end.
 *
 * CONTRIBUTORS: Lily Linh Lan
 */
submitIssue = function() {
  console.log("IM IN THE CLICK FUNCTION");
  const address = $("#lgFormStreet").val() + ' ' + $("#lgFormCity").val() + ' ' + $("#lgFormState").val() + ' ' + $("#lgFormZipcode").val();
  // console.log(address);

  // Use geocoder to convert address into long/lat
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
    console.log(status);
    // Callback to handle location received from geocoder for each address
    if (status === 'OK') {
      const location = results[0].geometry.location;
      console.log(location.lng());
      console.log(location.lat());

      const issue_object = { title : $("#lgFormTitle").val(),
        description : $("#lgFormDescription").val(),
        category : $("#lgFormCategory").val(),
        streetAddress : $("#lgFormStreet").val(),
        city : $("#lgFormCity").val(),
        state : $("#lgFormState").val(),
        zipcode : $("#lgFormZipcode").val(),
        file : $("#exampleInputFile"),
        latitude : location.lng(),
        longitude : location.lat()
      }


      // console.log(file);
      console.log(title);
      console.log(category);

      // Set hidden input for Lng/Lat in the form
      $("#lgFormLng").val(location.lng());
      $("#lgFormLat").val(location.lat());

      // Now ready to submit form if no error
      if ($("#error").val().length === 0) {
        $("#formIssue").submit();
        // $.post('/issue/create', issue_object);
      }
    } else {
      if (status === 'ZERO_RESULTS') {
        // Must use a correct address
        $("#error").append("'" + address + "' is an incorrect address");
      } else {
        $("#error").append("Error in calling Google geocoder service. Status: " + status);
      }
    }
  });
  $("#error").empty();
  // Validate the input for the new issue
  const title = $("#lgFormTitle").val();
  // Title should not be empty
  if (title.length < 1) {
    $("#error").append("Please enter a title <br/>");
  }

  const description = $("#lgFormDescription").val();
  // Description must be long enough
  if (description.length < 10) {
    $("#error").append("Please add at least 10 characters for issue description <br />");
  }



  const category = $("#lgFormCategory").val();
  // Category is required
  if (category.length < 1) {
    $("#error").append("Please select a category <br />");
  }


}

$( "document" ).ready( function() {
  $("#submitIssue").on('click', submitIssue);
});
