
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

    // Number   Status Filters      Category
    // 0        Pending             toxicants
    // 1        In-Progress         waste
    // 2        Complete            pollution
var results;
var filterCriteria;

function createFilterMatrix(){
    issuesDisplayed = document.getElementsByClassName("issueContainer");
    results = issuesDisplayed;
    filterCriteria = new Array(issuesDisplayed.length);
    // results = issuesDisplayed;
    for(var i =0; i<issuesDisplayed.length; i++){
        filterCriteria[i] = new Array(2);
        //Check for Status
        var status = document.getElementsByClassName("status")[i].innerHTML;
        if("Status: Pending" == status){
            //Status is Pending
            filterCriteria[i][0] = 0;
        }else if("Status: In Progress" == status){
            //Status is In Progress
            filterCriteria[i][0] = 1;
        }else{
            //Status is Complete
            filterCriteria[i][0] = 2;
        }
        var category = document.getElementsByClassName("category")[i].innerHTML;
        if("Category: toxicants" == category){
            //Category: toxicants
            filterCriteria[i][1] = 0;
        }else if("Category: waste" == category){
            //Category: waste
            filterCriteria[i][1] = 1;
        }else if("Category: pollution" == category){
            //Category: pollution
            filterCriteria[i][1] = 2;
        }
    }
}

function filterByCategory(){
    var filterMatrix = new Array(2);
    filterMatrix[0] = [0, 0, 0]; //status
    filterMatrix[1] = [0, 0, 0]; //Category
    var checkFilter = [false , false];


    

    if(document.getElementById("pendingCheckBox").checked){
        filterMatrix[0][0] = 1;
    }
    if(document.getElementById("inProgressCheckBox").checked){
        filterMatrix[0][1] = 1;
    }
    if(document.getElementById("resolvedCheckBox").checked){
        filterMatrix[0][2] = 1;
    }

    if(document.getElementById("toxicantsCheckBox").checked){
        filterMatrix[1][0] = 1;
    }
    if(document.getElementById("wasteCheckBox").checked){
        filterMatrix[1][1] = 1;
    }
    if(document.getElementById("pollutionCheckBox").checked){
        filterMatrix[1][2] = 1;
    }

    if(filterMatrix[0][0]==1 || filterMatrix[0][1]==1 || filterMatrix[0][2]==1){
        // checkFilter.push(true);
        checkFilter[0] = true;
    }
    if(filterMatrix[1][0]==1 || filterMatrix[1][1]==1 || filterMatrix[1][2]==1){
        // checkFilter.push(true);
        checkFilter[1] = true;
    }


    console.log(filterCriteria);
    console.log(checkFilter);


    console.log("Display individual filter criteria: \n");
    for(var i = 0; i<results.length; i++){
        //removing unwanted statuses
        console.log("Matrix Value: " + filterCriteria[i][0] + " Computed Value: "+ status[filterCriteria[i][0]]);
        var displayItem = true;

        for(var j = 0; j<2; j++){
            if(filterMatrix[j][filterCriteria[i][j]]!=1 && displayItem && checkFilter[j]){
                displayItem = false;
            }   
        }
        console.log("Matrix Value: " + filterCriteria[i][0] + " Computed Value: "+ status[filterCriteria[i][0]] + " Display Item: " + displayItem);
        if(displayItem){
            results[i].style.display = "flex";
        } else {
            results[i].style.display = "none";
        }
        // if(checkStatus){
        //     if(status[filterCriteria[i][0]]!=1){
        //         results[i].style.display = "none";
        //     }else{
        //         results[i].style.display = "flex";
        //     }
        // }

        // // console.log(filterCriteria[i][1]);
        // if(checkCategory){
        //     if(category[filterCriteria[i][1]]!=1){
        //         results[i].style.display = "none";
        //     }else{
        //         results[i].style.display = "flex";
        //     }
        // }
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

    document.getElementById("toxicantsCheckBox").checked = false;
    document.getElementById("wasteCheckBox").checked = false;
    document.getElementById("pollutionCheckBox").checked = false;

    for(var i = 0; i<results.length; i++){
        results[i].style.display = "flex";
        // resultesContainer.appendChild(results[i].innerHTML);
    }
}

