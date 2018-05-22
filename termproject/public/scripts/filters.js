
// Created By: Gary Straub
// TL;DR: This is where the filter f unctionality has been built. 
// we use a matrix to represent issues, and then use user input to hide
// values the user is not interested to see 
// Algorith is O(n) : Must iterate through all n items once per filter.

// Detailed Descrition: This is a very simple filter/refine by algorith
// that creates a matrix of integers
// Each Colum is is representative of the Filter criteria, where each row is an issue
// When a user wants to refine their search we create another matrix representing
// their desired croteria, and match those to the matrix we created when 
// the page loaded of the issues being displayed.
// ----------------------------------------------------------------------



// Global variables holding our matrixes with the filter criteria.
    // Number   Status Filters      Category
    // 0        Pending             toxicants
    // 1        In-Progress         waste
    // 2        Complete            pollution

    var filterCriteria; // think of this as a matrix representing our data

    function createFilterMatrix(){
        //fill the matrix
        issuesDisplayed = document.getElementsByClassName("issueContainer");
        filterCriteria = new Array(issuesDisplayed.length);
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
    //Where the filtering happens 
    function filterByCategory(){
        var filterMatrix = new Array(2);
        filterMatrix[0] = [0, 0, 0]; //status
        filterMatrix[1] = [0, 0, 0]; //Category
        var checkFilter = [false , false];
    // Check the user input
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
    // if the user didnt selelect a section it is becaus they still want all data from that section
        if(filterMatrix[0][0]==1 || filterMatrix[0][1]==1 || filterMatrix[0][2]==1){
            // checkFilter.push(true);
            checkFilter[0] = true;
        }
        if(filterMatrix[1][0]==1 || filterMatrix[1][1]==1 || filterMatrix[1][2]==1){
            // checkFilter.push(true);
            checkFilter[1] = true;
        }
    
    // Testing the matix for correct values and logic
        // console.log(filterCriteria);
        // console.log(checkFilter);
        // console.log("Display individual filter criteria: \n");
    
        for(var i = 0; i<filterCriteria.length; i++){
            // boolean value of whether to sdisplay the current item or not.
            var displayItem = true;
            for(var j = 0; j<2; j++){
                if(filterMatrix[j][filterCriteria[i][j]]!=1 && displayItem && checkFilter[j]){
                    displayItem = false;
                }   
            }
            // if the bool is still true then we display the item, if not we hide it
            if(displayItem){
                issuesDisplayed[i].style.display = "flex";
            } else {
                issuesDisplayed[i].style.display = "none";
            }
            
        }
    }
    // initialize the filering procedure
    function filterButton(){
        // console.log("Filter Me")
        createFilterMatrix();
        filterByCategory();
    }
    
    function resetButton(){
        // Reset the checkboxes upon the users reset command
        document.getElementById("pendingCheckBox").checked = false;
        document.getElementById("inProgressCheckBox").checked = false;
        document.getElementById("resolvedCheckBox").checked = false;
    
        document.getElementById("toxicantsCheckBox").checked = false;
        document.getElementById("wasteCheckBox").checked = false;
        document.getElementById("pollutionCheckBox").checked = false;
    
        for(var i = 0; i<issuesDisplayed.length; i++){
            issuesDisplayed[i].style.display = "flex";
        }
    }