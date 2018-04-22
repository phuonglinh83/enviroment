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
        const myCenter = new google.maps.LatLng(37.720460, -122.478124);
        const mapProp= {
          center:myCenter,
          zoom:14,
          scrollwheel: false,
        };
        const map=new google.maps.Map(document.getElementById("googleMap"),mapProp);  
        const marker = new google.maps.Marker({position:myCenter}); 
        marker.setMap(map); 
        const searchContent = document.getElementById("searchRow");

        for( let index = 0; index < results.length; index++ ) {
          // const cardsToAppend = `<div class="col-lg-6">
          // <div class="card" style="width: 25rem;">
          //   <div class="card-body">
          //     <h5 class="card-title">${results[index].title} </h5>
          //     <ul class="list-group list-group-flush">
          //     <img class="card-img-top" src="${ results[ index ].imagePath }">
          //         <li class="list-group-item">Username: ${results[index].username} </li>
          //         <li class="list-group-item">City: ${results[index].city} </li>
          //         <li class="list-group-item">State: ${results[index].state} </li>
          //         <li class="list-group-item">Zip Code: ${results[index].zipcode} </li>
          //         <li class="list-group-item">Category: ${results[index].type} </li>
          //     </ul>
          //   </div>
          //   </div>
          // </div>`;
          // var express = require('express');
          // var expressThumbnail = require('express-thumbnail');
          // var app = express();
          // app.use(expressThumbnail.register(__dirname + '/assets'));
          
          var imgPath = results[index].imagePath;
          var img = imgPath.split(/\/|\\/).pop();
          var thumbnail = "/images/thumbnails/" + img;
          const cardsToAppend = `
          

<div class="container-fluid col-lg-12 col-md-12 col-sm-12" style="padding-bottom: 2px;">
  <div class = "issueContainer">
    <div class="row" id="rowOverload">
      <div class="col-lg-4 col-md-4 col-sm-4">
              <img class="thumbnail center" style="padding: 0px; border-radius: 0px;" src="${thumbnail}">
            </div>
              <div class="col-lg-8 col-md-8 col-sm-8">
                  <b>${results[index].title}</b>
                  <br>${results[index].city}, ${results[index].state}<br><br>
                  <i>Category: ${results[index].type}</i><br>
                  <i>Status: Unresolved</i>
              </div>
      </div>
    </div>
  </div>`;
          searchContent.innerHTML += cardsToAppend;

            // var address = results[ index ].streetAddress + ' ' + results[ index ].city + ', ' + results[ index ].state + ' ' + results[ index ].zipcode; 
            // geocoder.geocode({'address': address}, function(results, status) { 
            //   if (status === 'OK') { 
            //     var loc = results[0].geometry.location; 
            //     map.setCenter(loc); 
            //     if (loc in locations) { 
            //       locations[loc] += CARDS_TO_APPEND; 
            //     } else { 
            //       locations[loc] = CARDS_TO_APPEND; 
            //       var marker = new google.maps.Marker({ 
            //         position: results[0].geometry.location, 
            //         label: labels[index % labels.length] 
            //       }); 
            //       marker.setMap(map); 
            //       google.maps.event.addListener(marker,'click',function() { 
            //         SEARCH_CONTENT.innerHTML = locations[loc]; 
            //       }); 
            //     } 
            //   } else { 
            //     alert('Geocode was not successful for the following reason: ' + status); 
            //   }
            // }); 
        };
      },
      error: function() {
        console.log("error posting to the server!");
      }
    });
  });
});

