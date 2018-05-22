/**
 * ================================= newIssue.js ===================================
 * Responsible for querying server to get the issue location to display on the map;
 * loading, displaying comments, and processing new comment post.
 *
 * CONTRIBUTORS: Lily Linh Lan
 */

// Setting Google map for the detailed view
const loadMap = function(){
  issue_id = $('#issue_id').val();
  // Call server to get the location of the issue
  $.get('/issue/' + issue_id + '/location', function(location) {
    // Set the center of the map at the issue location

    const myCenter = new google.maps.LatLng(37.720460, -122.478124);
    const mapProp = {
      center: location,
      zoom: 14,
      scrollwheel: false,
    };
    const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    // Create a marker for the issue
    const marker = new google.maps.Marker({
      position: location
    });
    // show the marker
    marker.setMap(map);
  });
};

// Append a comment into the comment div area
const appendComment = function(comment) {
  const time = comment.createdAt.toLocaleString('en-US', {month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12:true})
  $('#comments').append(`
    <div class = "commentContainer">
      <div class="row">
        <div class="col-sm-3">
          <div class="col-md-12">
            <b>${comment.username} at ${time}</b>
          </div>
        </div>
        <div class="col-sm-8">
            ${comment.content}
        </div>
      </div>
    </div>
    `
  );
};

// Load all comments for the detailed view
const loadComments = function(){
  issue_id = $('#issue_id').val();
  $('#comments').html("");
  // Call server to get all comments on the issue
  $.get('/issue/' + issue_id + '/comments', function(comments) {
    // console.log(comments);
    comments.forEach(function(comment) {
      appendComment(comment);
    });
  });
};

const postComment = function(){
  issue_id = $('#issue_id').val();
  content = $('#content').val();
  // Validate the input. Comment need to have more than 10 characters
  if (content.length < 10) {
    $("#error").html("Comment must have at least 10 characters!");
  } else {
    // console.log("post a comment on issue " + issue_id);
    $("#error").empty();
    // Post the comment to the server
    $.post("/issue/postComment",
    {
        issue_id: issue_id,
        content: content
    },
    function(data, status){
      // console.log(status);
      if (status === 'success') {
        // On success, display the newly added comment into the comment div area
        $('#content').val("");
        // console.log(data);
        appendComment(data);
      }
    });
  }
}

$( "document" ).ready( function() {
  loadMap();
  loadComments();
  $("#postComment").on('click', postComment);
});
