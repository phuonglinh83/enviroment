
// document.getElementById("searchButton").addEventListener("click", function(){
//     // var initialResults = document.getElementsByClassName("issueContainer");
//     var cities = document.getElementsByClassName("city");
//     var cityList = [];
//     // cityList.push(cities[0].innerHTML);
//     console.log("Hello this is where the text should print:");
//     // var myCity = document.getElementsByClassName("city")[0].innerHTML;
//     for(var i =0; i<cities.length; i++){
//         console.log(cities[i]);
//     }
//     // var citiesCondenced = cityList.filter(onlyUnique);
//     // console.log(cityList);
// });


document.addEventListener('DOMContentLoaded', function() {
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    function readResults(){
    }
    function getCityCount(){
        var cityList = initialResults.getElementsByClassName("city");
        var citiesCondenced = cityList.filter(onlyUnique);
    }
});

    // category Filters
    // Pending = 0
    // In-Progress = 1
    // Complete = 2
var results;
var filterCriteria = [];
function createFilterMatrix(){
    issuesDisplayed = document.getElementsByClassName("issueContainer");
    results = issuesDisplayed;
    // results = issuesDisplayed;
    for(var i =0; i<issuesDisplayed.length; i++){
        //Check for Status
        var status = document.getElementsByClassName("status")[i].innerHTML;
        if("Status: Pending" == status){
            //Status is Pending
            filterCriteria.push(0);
        }else if("Status: In Progress" == status){
            //Status is In Progress
            filterCriteria.push(1);
        }else{
            //Status is Complete
            filterCriteria.push(2);
        }
    }
}

function filterByCategory(){
    var status = [0, 0, 0];
    if(document.getElementById("pendingCheckBox").checked){
        status[0] = 1
    }
    if(document.getElementById("inProgressCheckBox").checked){
        status[1] = 1
    }
    if(document.getElementById("resolvedCheckBox").checked){
        status[2] = 1
    }


    console.log(filterCriteria);
    // console.log(results);
    // console.log(results[0]);
    
    // var resultesContainer = document.getElementById("resultsRow");
    // resultesContainer.innerHTML = '';
    for(var i = 0; i<results.length; i++){
        //removing unwanted statuses
        console.log(filterCriteria[i]);
        if(status[filterCriteria[i]]!=1){
            results[i].style.display = "none";
        }else{
            results[i].style.display = "flex";
        }
        // resultesContainer.appendChild(results[i].innerHTML);
    }
    // console.log(results[0]);
    // resultesContainer.appendChild(results[0].innerHTML);
}
function filterButton(){
    console.log("Filter Me")
    createFilterMatrix();
    filterByCategory();
}

function resetButton(){
    document.getElementById("pendingCheckBox").checked = false;
    document.getElementById("inProgressCheckBox").checked = false;
    document.getElementById("resolvedCheckBox").checked = false;

    for(var i = 0; i<results.length; i++){
        results[i].style.display = "flex";
        // resultesContainer.appendChild(results[i].innerHTML);
    }
}

