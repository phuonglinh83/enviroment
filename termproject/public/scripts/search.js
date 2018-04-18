/**
 * ================================= search.js ===================================
 * This files makes ajax calls to dynamically update the search results without reloading the page.
 *
 */

// Funciton to update the filter name on the button
const setFilter = function(element) {
  const label = $(element).text();
  if(label.trim() != 'All' ) {
    $('#filterMenu').text(label);
    $('#searchBar').attr("placeholder", `Search By ${label}...`);
  } else {
    $('#filterMenu').text("Search All");
    $('#searchBar').attr("placeholder", 'Search by Title, Description, City, or Zipcode...');
  }
};

// If user clicks on "All"
$("#allFilter").on('click', function () {
  setFilter('#allFilter');
});

// If user clicks on "Category"
$("#categoryFilter").on('click', function () {
  setFilter('#categoryFilter');
});

// If user clicks on "Status"
$("#statusFilter").on('click', function () {
  setFilter('#statusFilter');
});

// Function to load and put search results on the page
const loadData = function(e){
  $('#results-count').html('');
  console.log(e.which);
  if(e.which == 13 || e.type == 'click') {
  const searchValue = document.getElementById("searchBar").value;
  console.log( searchValue );

  $.get('/search?keyword=' + searchValue , function(data) {
      // console.log(JSON.stringify(data);
      $('#results-count').html(data.length + " results found");
      $('#results-grid').html();
      data.forEach(function(issue) {
        console.log(issue.imagePath);
        $('#results-grid').append(`
          <div class="col-md-3">
            <div class="thumbnail">
              <img class="card-img-top" src="${ issue.imagePath }">
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
});
