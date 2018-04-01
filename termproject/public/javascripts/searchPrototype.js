$( "document" ).ready( function() {
  $("#searchButtonProto").on( 'click', function(){
    const searchValue = document.getElementById("searchBarProto").value;
    console.log( searchValue );

    const dataObject = {
      keyword : searchValue
    };

    $.ajax({
      type: 'POST',
      url: '/search',
      data: dataObject,
      success: function( results ) {
        const SEARCH_CONTENT = document.getElementById("searchRowProto");
        const SEARCH_COLUMN = document.getElementById("searchColumnProto");
        const SEARCH_RESULT_MESSAGE = `<p class="my-2"> ${results.length} results returned for "${searchValue}"`;
        
        if( results.length > 0 ) {
          SEARCH_COLUMN.innerHTML += SEARCH_RESULT_MESSAGE;

          for( let index = 0; index < results.length; index++ ) {
            const CARDS_TO_APPEND = `<div class="card">
            <img class="card-img-top" src="${ results[ index ].imagePath }">
            <div class="card-body">
              <h5 class="card-title">${ results[ index ].title }</h5>
              <p class="card-text">Description: ${results[ index ].description }</p>
              <p class="card-text">Status: ${ results[ index ].issue_status }</p>
              <p class="card-text">Category: ${ results[ index ].type }</p>
              <p class="card-text">Street Address: ${ results[ index ].streetAddress }</p>
              <p class="card-text">City: ${ results[ index ].city }</p>
              <p class="card-text">State: ${ results[ index ].state }</p>
              <p class="card-text">Zip Code: ${ results[ index ].zipcode }</p>
              <p class="card-text">Submitted By: ${ results[ index ].username }</p>
              <p class="card-text"><small class="text-muted">Created: ${ results[ index ].month }/${ results[ index ].day }/${ results[ index ].year }</small></p>
              <p class="card-text"><small class="text-muted">Last Updated: ${ results[ index ].updatedAt }</small></p>            
            </div>
            </div>`;
            SEARCH_CONTENT.innerHTML += CARDS_TO_APPEND;
          };
        } else {
          SEARCH_COLUMN.innerHTML += SEARCH_RESULT_MESSAGE;

        $.ajax({
          type: 'POST',
          url: '/searchDefault',
          //data: dataObject,
          success: function( resultsDefault ) {

          for( let index = 0; index < resultsDefault.length; index++ ) {
            const CARDS_FOR_DEFAULT = `<div class="card">
            <img class="card-img-top" src="${ resultsDefault[ index ].imagePath }">
            <div class="card-body">
              <h5 class="card-title">${ resultsDefault[ index ].title }</h5>
              <p class="card-text">Description: ${resultsDefault[ index ].description }</p>
              <p class="card-text">Status: ${ resultsDefault[ index ].issue_status }</p>
              <p class="card-text">Category: ${ resultsDefault[ index ].type }</p>
              <p class="card-text">Street Address: ${ resultsDefault[ index ].streetAddress }</p>
              <p class="card-text">City: ${ resultsDefault[ index ].city }</p>
              <p class="card-text">State: ${ resultsDefault[ index ].state }</p>
              <p class="card-text">Zip Code: ${ resultsDefault[ index ].zipcode }</p>
              <p class="card-text">Submitted By: ${ resultsDefault[ index ].username }</p>
              <p class="card-text"><small class="text-muted">Created: ${ resultsDefault[ index ].month }/${ resultsDefault[ index ].day }/${ resultsDefault[ index ].year }</small></p>
              <p class="card-text"><small class="text-muted">Last Updated: ${ resultsDefault[ index ].updatedAt }</small></p>            
            </div>
            </div>`;
            SEARCH_CONTENT.innerHTML += CARDS_FOR_DEFAULT;
          };
          }, error: function () {
            console.log("error posting the default search");
          }
        });     
        //   //make an alert that tells the user nothing was found, but you still display shit from the database
        //   //after this alert is displayed you still need to figure out how to 
        }
      },
      error: function() {
        console.log("error posting to the server!");
      }
    });
  });
});