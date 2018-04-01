$( "document" ).ready( function() {
  $("#searchButton").on( 'click', function(){
    const searchValue = document.getElementById("searchBar").value;
    console.log( searchValue );

    const dataObject = {
      keyword : searchValue
    };

    $.ajax({
      type: 'POST',
      url: '/search',
      data: dataObject,
      success: function( results ) {
        const searchContent = document.getElementById("searchRow");

        for( let index = 0; index < results.length; index++ ) {
          const cardsToAppend = `<div class="col-lg-6">
          <div class="card" style="width: 25rem;">
            <div class="card-body">
              <h5 class="card-title">${results[index].title} </h5>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Username: ${results[index].username} </li>
                  <li class="list-group-item">City: ${results[index].city} </li>
                  <li class="list-group-item">State: ${results[index].state} </li>
                  <li class="list-group-item">Zip Code: ${results[index].zipcode} </li>
                  <li class="list-group-item">Category: ${results[index].type} </li>
              </ul>
            </div>
            </div>
          </div>`;
          searchContent.innerHTML += cardsToAppend;
        };
      },
      error: function() {
        console.log("error posting to the server!");
      }
    });
  });
});
