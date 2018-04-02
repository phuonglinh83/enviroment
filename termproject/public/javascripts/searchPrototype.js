$("document").ready(function () {
  const SEARCH_CONTENT = document.getElementById("searchRowProto");
  const SEARCH_COLUMN = document.getElementById("searchColumnProto");

  $("#searchButtonProto").on('click', function () {
    console.log(document.getElementById('filterMenu').innerText.toLowerCase());
    const filterValue = document.getElementById('filterMenu').innerText.toLowerCase();
    const searchValue = document.getElementById("searchBarProto").value;
    console.log(searchValue);

    const dataObject = {
      keyword: searchValue
    };

    $.ajax({
      type: 'POST',
      url: '/search',
      data: dataObject,
      success: function (results) {
        const SEARCH_RESULT_MESSAGE = `<h4 class="my-2"> ${results.length} results returned for "${searchValue}"</h4>`;

        if (results.length > 0) {
          SEARCH_COLUMN.innerHTML += SEARCH_RESULT_MESSAGE;

          for (let index = 0; index < results.length; index++) {
            const CARD_ATTRIBUTES = {
              imagePath: results[index].imagePath,
              title: results[index].title,
              description: results[index].description,
              issue_status: results[index].issue_status,
              type: results[index].type,
              streetAddress: results[index].streetAddress,
              city: results[index].city,
              state: results[index].state,
              zipcode: results[index].zipcode,
              username: results[index].username,
              month: results[index].month,
              day: results[index].day,
              year: results[index].year,
              updatedAt: results[index].updatedAt
            };

            cardGenerator(CARD_ATTRIBUTES);
          };
        } else {
          SEARCH_COLUMN.innerHTML += SEARCH_RESULT_MESSAGE;
          $.ajax({
            type: 'POST',
            url: '/searchDefault',
            //data: dataObject,
            success: function (resultsDefault) {
              for (let index = 0; index < resultsDefault.length; index++) {
                const DEFAULT_CARD_ATTRIBUTES = {
                  imagePath: resultsDefault[index].imagePath,
                  title: resultsDefault[index].title,
                  description: resultsDefault[index].description,
                  issue_status: resultsDefault[index].issue_status,
                  type: resultsDefault[index].type,
                  streetAddress: resultsDefault[index].streetAddress,
                  city: resultsDefault[index].city,
                  state: resultsDefault[index].state,
                  zipcode: resultsDefault[index].zipcode,
                  username: resultsDefault[index].username,
                  month: resultsDefault[index].month,
                  day: resultsDefault[index].day,
                  year: resultsDefault[index].year,
                  updatedAt: resultsDefault[index].updatedAt
                };

                cardGenerator(DEFAULT_CARD_ATTRIBUTES);
              };
            }, error: function () {
              console.log("error posting the default search");
            }
          });
        }
      },
      error: function () {
        console.log("error posting to the server!");
      }
    }); //end of /search ajax call 
  }); //end .click for search button

  $("#categoryFilter").on('click', function () {
    let categoryDropdown = document.getElementById('categoryFilter');
    let dropdownMenu = document.getElementById('filterMenu');
    dropdownMenu.innerText = categoryDropdown.text;
    console.log(dropdownMenu.innerText);
    $("#searchBarProto").attr("placeholder", "Search By Category...");
  });

  $("#statusFilter").on('click', function () {
    let statusDropdown = document.getElementById('statusFilter');
    let dropdownMenu = document.getElementById('filterMenu');
    dropdownMenu.innerText = statusDropdown.text;
    console.log(dropdownMenu.innerText);
    $("#searchBarProto").attr("placeholder", "Search By Status...");

  });

  function cardGenerator(cardAttributes) {
    // console.log(cardAttributes.title);
    const CARDS_TO_APPEND = `<div class="card">
    <img class="card-img-top" src="${ cardAttributes.imagePath}">
    <div class="card-body">
      <h5 class="card-title">${ cardAttributes.title}</h5>
      <p class="card-text">Description: ${ cardAttributes.description}</p>
      <p class="card-text">Status: ${ cardAttributes.issue_status}</p>
      <p class="card-text">Category: ${ cardAttributes.type}</p>
      <p class="card-text">Street Address: ${ cardAttributes.streetAddress}</p>
      <p class="card-text">City: ${ cardAttributes.city}</p>
      <p class="card-text">State: ${ cardAttributes.state}</p>
      <p class="card-text">Zip Code: ${ cardAttributes.zipcode}</p>
      <p class="card-text">Submitted By: ${ cardAttributes.username}</p>
      <p class="card-text"><small class="text-muted">Created: ${ cardAttributes.month}/${cardAttributes.day}/${cardAttributes.year}</small></p>
      <p class="card-text"><small class="text-muted">Last Updated: ${ cardAttributes.updatedAt}</small></p>            
    </div>
    </div>`;
    SEARCH_CONTENT.innerHTML += CARDS_TO_APPEND;
  };
});