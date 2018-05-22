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

      const title = document.getElementById("lgFormTitle").value;
      const description = document.getElementById("lgFormDescription").value;
      const category = document.getElementById("lgFormCategory").value;
      const streetAddress = document.getElementById("lgFormStreet").value;
      const city = document.getElementById("lgFormCity").value;
      const state = document.getElementById("lgFormState").value;
      const zipcode = document.getElementById("lgFormZipcode").value;
      const file = document.getElementsByName("image");


      // console.log(file);
      console.log(title);
      console.log(category);

      // let issueObject = {
      //   title: title,
      //   description: description,
      //   category: category,
      //   streetAddress: streetAddress,
      //   city: city,
      //   state: state,
      //   zipcode: zipcode,
      //   // file: file,
      //   lat:location.lat(), 
      //   long:location.lng()
      // };

      // $.ajax({
      //   type: 'POST',
      //   url: '/issue/create',
      //   data: issueObject,
      //   success: function( results ) {
      //     console.log("Successful Ajax Call");
      //   },
      //   error: function() {
      //     console.log("Error Ajax Call");
      //   }
      // });
      
      // Set hidden input for Lng/Lat in the form
      $("#lgFormLng").val(location.lng());
      $("#lgFormLat").val(location.lat());
      
      // Now ready to submit form if no error
      if ($("#error").val().length === 0) {
        $("#formIssue").submit();
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
