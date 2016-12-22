/*
1. Pagnation Code
2. Search Code
Created by Ruhull Alam Dec 2016
*/


////////////////////////////////////pagnation code/////////////////////////////////// 

var pageNum = 0; // a changing variable that decides what number should be placed in the var textNode
var liItem = document.getElementsByClassName("student-item cf"); //consolidates all students by the class tag
var limitPerPage = 10; //set how many items to show per page
var pagesRequired = Math.floor(liItem.length/limitPerPage); //figures out how many pages are required for every set of 10 students (or whatever limit is set in var limitPerPage);

  
//This function adds the pagination li after taking variable from pageNum and applying it to textNode
var createPage = function (pageNum) 
{
        
var divPag = document.getElementById("idPag");
var liPag = document.createElement("li");
divPag.append(liPag); //Hey create a li element and attach it to the ul element.
liPag.append(pageNum); //for each li page item added, put the page number on it...please.

    
liPag.setAttribute("id", "page" + pageNum); //this adds an id to the relevent pageNum
liPag.setAttribute("class", "pagination")//this adds the pagination class;
    document.getElementById("page"+pageNum).addEventListener("click", function() 
        {
        var x = "page"+pageNum;
        var pageCount = document.getElementsByTagName("ul")[1].childElementCount;


//Below sets each page number instructions to say which results are meant to be shown which page        
    if (x) {
           hideAll();
           //this allows the range (results to be shown) to be set dependent on how many pages there are. 
             for (j = 0;  j < pageCount; j++) 
             {
             if (x === "page"+[j]) 
               {
               showResults(([j]-1) * limitPerPage, ([j] * limitPerPage)); 
             //e.g page 7 would be 7-1 (6) * 10 (total 60), 7 * 10 (total 70), so the range would be set between 60 and 70 etc..
                } 
              }
           }
                
         });    
}


  
//this clears the previous results and ensures results are not stacked up on one another. 
function hideAll() 
{    
  for (i = 0; i < liItem.length; i++) 
  {
  liItem[i].style.display = "none";   
  } 
}
    
    //this function displays the results after receiving a range linked to each pageNum li
      function showResults(startRange, endRange) {
                 for (j = startRange; j < endRange && j < liItem.length; j++) 
               liItem[j].style.display = "block";
          document.getElementById("showing").innerHTML = "Showing results: ";
          document.getElementById("showing").append(startRange + "-" + (checkResultsNum(startRange, limitPerPage)) + " of " + liItem.length);
      } 

//this variable function just checks for the showing results of  to show 50-54 rather than 50-60 if there are only 54 items etc...
var checkResultsNum = function (startRange, limitPerPage) {
   if (startRange+limitPerPage > liItem.length) {
  return liItem.length;   
     } else {
return startRange+limitPerPage;   
     
 }
}
    
    //this checks to see if the items in the li are more than 10, if so after then first 10 it hides them (value 10 can be changed on limitPerPage var;
    if (liItem.length > limitPerPage) {
     for (i = limitPerPage; i < liItem.length; i++) 
     {
      liItem[i].style.display = "none";   
      } 
        addPage(pagesRequired + 2);
        document.getElementsByTagName("ul")[1].lastChild.style.display = "none";
        //added this last line as for some reason the last 4 results were not showing unless I had an extra page showing, so added a page and then removed it from display. 
    }

    //this loops the createPage function required number of times dependent on what the pageRequired is.
    function addPage(pagesRequired) {
        while (pagesRequired > pageNum) {
        pageNum +=1 ; 
        window["createPage"](pageNum);
         }
    }
///////////////////////////////////end of pagnation code///////////////////////////////////////////


//////////////////////////////////////search tool code///////////////////////////////////////////////
var h3Names = document.getElementsByTagName("h3");
var counter=0;
var searchButton = document.getElementById("searchForm").addEventListener("click", function() {
    // the request (made in #searchForm) is compared to the value in the h3 content of each item in the student-item cf

var request = document.getElementById("inputBox").value;
    if (request) {
        for (y = 0; y < liItem.length; y++) {
        if (h3Names[y].innerHTML.indexOf(request.toLowerCase()) > -1) {
            liItem[y].style.display = "block";
            document.getElementById("showing").textContent = "Showing result(s)";
            
            } else {
            liItem[y].style.display = "none";
            counter++;
                if (counter === liItem.length) {
                document.getElementById("showing").textContent = "No search results";
                    counter=0;
                    
                  }
                
             }
    } 
} else {
  showResults(0, 10)  
};
}
);


////////////////////////////////end of search tool code//////////////////////////////////////////////