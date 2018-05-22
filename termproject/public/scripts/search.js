/**
 * ================================= search.js ===================================
 * This files makes ajax calls to dynamically update the search results without reloading the page.
 *
 */

let filter = "all";

const zipcode = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");

const search =  (query, searchFilter, option) => {
  $.get('/search?keyword=' + query +"&filter=" + searchFilter.toLowerCase(), function(data) {
    console.log(JSON.stringify(data));

    const myCenter = new google.maps.LatLng(37.720460, -122.478124);
    const mapProp= {
      center:myCenter,
      zoom:14,
      scrollwheel: false,
    };
    const map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    // geocoder will convert address into LongLat location on the map
    const geocoder = new google.maps.Geocoder();
    // label to display each marker on the map
    // const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let index = 1;
    // dict to map each marker location to a list of issues on that location
    let locations = [];
    let loc_labels = [];
    // bounds to fit all markers into the map
    var bounds = new google.maps.LatLngBounds();

    if(option != 1) {
      if(!data.success)
        $('#resultsCount').html("0 results found. But here are the recents posts.");
      else
        $('#resultsCount').html(data.issues.length + " results found.");
    }

    $('#resultsRow').html("");
    data.issues.forEach(function(issue) {
      var imgPath = issue.imagePath;
      var img = imgPath.split(/\/|\\/).pop();
      var thumbnail = "/images/thumbnails/" + img;
      console.log(issue.imagePath);

      const loc = new google.maps.LatLng(issue.latitude, issue.longtitude);
      if (!(loc in loc_labels)) {
        loc_labels[loc] = index++;
      }

      let card_to_append = `
      <div class="container-fluid col-lg-12 col-md-12 col-sm-12" style="padding-bottom: 2px;">
        <div class = "issueContainer">
          <a class="row" id="rowOverload" href="/issue/${issue.issue_id}">
            <div class="col-lg-4 col-md-4 col-sm-4">
              <img class="thumbnail center" src="${ issue.imagePath }">
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8">
              <b>${issue.title}</b>
              <br>${issue.city}, ${issue.state}<br><br>
              <i>Category: ${issue.type}</i><br>
              <i>Status: Unresolved</i>
            </div>
          </a>
        </div>
      </div>
    `

      if (loc in locations) {
        // Existing location, just append issue content to the corresponding entry in the dict
        locations[loc] += card_to_append;
      } else {
        // New location, first extend the map boundary
        bounds.extend(loc);
        // Create a new entry for the location dict
        locations[loc] = card_to_append;
        // Create a maker for the location
        const marker = new google.maps.Marker({
          position: loc,
          label: "" + loc_labels[loc]
        });
        // show the marker
        marker.setMap(map);
        google.maps.event.addListener(marker,'click',function() {
          // if the marker is clicked, only show issues related to the location
          $('#resultsRow').html(locations[loc]);
        });
      }
      map.fitBounds(bounds);

      $('#resultsRow').append(card_to_append);
    });
  });
}
// Funciton to update the filter name on the button
const setFilter = function(element) {
  filter = $(element).text().trim();
  if(filter != 'All' ) {
    $('#filterMenu').text(filter);
    $('#searchBar').attr("placeholder", `Search By ${filter}...`);
  } else {
    $('#filterMenu').text("Search All");
    $('#searchBar').attr("placeholder", 'Search by Title, Description, City, or Zipcode...');
  }
};


// Function to load and put search results on the page
const loadData = function(e){
  $('#results-count').html('');
  // console.log(e.which);
  if(e.which == 13 || e.type == 'click') {
  const searchValue = document.getElementById("searchBar").value;
  console.log( searchValue );
  search(searchValue, filter);

  } else {
    let value = parseInt($('#searchBar').val());
    if(filter.toLowerCase() == "city or zip" && !isNaN(value)) {
      if(!zipcode.test(value)) {
        $('#searchBar').addClass('is-invalid text-danger');
        $('#error-message').html('Invlid Zip Code');
      } else {
        $('#searchBar').removeClass('is-invalid text-danger');
        $('#error-message').html('');
      }
    } else {
      $('#searchBar').removeClass('is-invalid text-danger');
      $('#error-message').html('');      
    }
    if($('#searchBar').hasClass('is-invalid')) {
      $('#searchButton').prop('disabled', true);
    } else {
      $('#searchButton').prop('disabled', false);
    }
  }
};

$( "document" ).ready( function() {
  $("#searchButton").on( 'click', loadData);
  $("#searchBar").keyup(loadData);
  search("", filter, 1); 
});


// If user clicks on "All"
$("#allFilter").on('click', function () {
  setFilter('#allFilter');
});

// If user clicks on "Category"
$("#categoryFilter").on('click', function () {
  setFilter('#categoryFilter');
});

// If user clicks on "City"
$("#cityFilter").on('click', function () {
  setFilter('#cityFilter');
});

// If user clicks on "Status"
$("#statusFilter").on('click', function () {
  setFilter('#statusFilter');
});
