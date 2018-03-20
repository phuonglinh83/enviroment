const loadData = function(e){
  console.log(e.which);
  if(e.which == 13 || e.type == 'click') {
  const searchValue = document.getElementById("searchBar").value;
  console.log( searchValue );

  const dataObject = {
    keyword : searchValue
  };

  $.get('/search?keyword=' + searchValue , function(data) {
      console.log(JSON.stringify(data));
      $('#results-grid').html('');
      data.forEach(function(issue) {
        $('#results-grid').append(`
          <div class="col-md-3">
            <div class="thumbnail">
              <img src="http://www.friedmanarchives.com/Non-Gallery-Images-1/images/PICT5918.jpg">
              <div class="caption">
                <h5>${ issue.title }</h5>
                <p>${issue.description}</p>
              </div>
            </div>
          </div>
        `);
      });
    });
  }
  };

$( "document" ).ready( function() {
  $("#searchButton").on( 'click', loadData);
  $("#searchBar").keyup(loadData);


    // $.ajax({
    //   type: 'POST',
    //   url: '/search',
    //   data: dataObject,
    //   success: function( results ) {
    //     const searchContent = document.getElementById("searchRow");
    //
    //     for( let index = 0; index < results.length; index++ ) {
    //       const cardsToAppend = `<div class="col-lg-6">
    //       <div class="card" style="width: 25rem;">
    //         <div class="card-body">
    //           <h5 class="card-title">${results[index].title} </h5>
    //           <ul class="list-group list-group-flush">
    //               <li class="list-group-item">Username: ${results[index].username} </li>
    //               <li class="list-group-item">City: ${results[index].city} </li>
    //               <li class="list-group-item">State: ${results[index].state} </li>
    //               <li class="list-group-item">Zip Code: ${results[index].zipcode} </li>
    //               <li class="list-group-item">Category: ${results[index].category} </li>
    //           </ul>
    //         </div>
    //         </div>
    //       </div>`;
    //       searchContent.innerHTML += cardsToAppend;
    //     };
    //   },
    //   error: function() {
    //     console.log("error posting to the server!");
    //   }
    // });
  // });
});
