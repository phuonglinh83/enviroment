$( "document" ).ready( function() {
  console.log("we out here in the javascripts/search.js");
  $("#searchButton").on( 'click', function(){
    const searchValue = document.getElementById("searchBar").value;
    console.log(searchValue);

    const dataObject = {
      keyword : searchValue
    };

    $.ajax({
      type: 'POST',
      url: '/search',
      data: dataObject,
      success: function(results){
        //results is what we respond with in routes/search.js
        //on success, results will be an array of objects (the objects are the results form the db)
        //we will need to loop through these results and display them onto the page
        console.log(results);
      },
      error: function() {
        console.log("error posting to the server!");
      }
    });
  });
});