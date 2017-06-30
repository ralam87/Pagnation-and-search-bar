/*
1. Pagnation Code
2. Search Code
Created by Ruhull Alam Dec 2016
*/
  var pageNum = 0
  var item = document.getElementsByClassName("student-item cf")
  var itemsPerPage = 10
  var pagesRequired = Math.floor(item.length/itemsPerPage)

  var MainDivPag = document.createElement("div")
  MainDivPag.setAttribute("class", "pagination")
  document.body.append(MainDivPag)

  var MainUlPag = document.createElement("ul")
  MainUlPag.setAttribute("id", "idPag")
  MainUlPag.setAttribute("class", "pagination")
  document.getElementsByClassName("page")[0].append(MainUlPag)

  var createPage = function (pageNum) {
  	var divPag = document.getElementById("idPag")
  	var liPag = document.createElement("li")
  	divPag.append(liPag)
  	liPag.append(pageNum)

  	liPag.setAttribute("id", "page" + pageNum)
  	liPag.setAttribute("class", "pagination")
  	document.getElementById("page"+pageNum).addEventListener("click", function ()	{
  		var x = "page"+pageNum
  		var pageCount = document.getElementsByTagName("ul")[1].childElementCount

  	  if (x) {
  	    hideAll()
  			for (j = 0;  j < pageCount; j++) {
  			  if (x === "page"+[j]) {
  				  showResults(([j]-1) * itemsPerPage, ([j] * itemsPerPage))
  				}
  			}
  		}
    })
  }

  function hideAll() {
    for (i = 0; i < item.length; i++) {
      item[i].style.display = "none";
    }
  }

  var showing = document.createElement("p")
  showing.setAttribute("id", "showing")
  document.getElementsByTagName("h2")[0].appendChild(showing)

  function showResults(startRange, endRange) {
    for (j = startRange; j < endRange && j < item.length; j++) {
      item[j].style.display = "block"
      document.getElementById("showing").innerHTML = "Showing results: "
      document.getElementById("showing").append(startRange + "-" + (checkResultsNum(startRange, itemsPerPage)) + " of " + item.length)
    }
  }

  var checkResultsNum = function (startRange, itemsPerPage) {
    if (startRange+itemsPerPage > item.length) {
      return item.length
    } else {
      return startRange+itemsPerPage
    }
  }

  if (item.length > itemsPerPage) {
    for (i = itemsPerPage; i < item.length; i++) {
      item[i].style.display = "none"
    }
    addPage(pagesRequired + 2)
    document.getElementsByTagName("ul")[1].lastChild.style.display = "none"
  }

  function addPage(pagesRequired) {
    while (pagesRequired > pageNum) {
      pageNum +=1
      window["createPage"](pageNum)
    }
  }

  var divPagnation = document.createElement("div")
  divPagnation.setAttribute("id", "mySearch")
  document.getElementsByClassName("page-header cf")[0].append(divPagnation)

  var forms = document.createElement("form")
  document.getElementById("mySearch").append(forms)
  forms.setAttribute("onsubmit", "return false")

  var inputType = document.createElement("input")
  inputType.type = "text submit"
  inputType.setAttribute("id", "inputBox")
  inputType.setAttribute("class", "search")
  inputType.setAttribute("placeholder", "Search for a student here...")
  forms.appendChild(inputType)

  var button = document.createElement("button")
  button.setAttribute("id", "searchForm")
  button.setAttribute("class", "search")
  button.setAttribute("type", "button")
  button.innerHTML = "Search"
  forms.appendChild(button)

  document.getElementById("mySearch").style.display ="inline-block"
  document.getElementById("mySearch").style.float ="right"

  var h3Names = document.getElementsByTagName("h3")
  var counter = 0
  var searchButton = document.getElementById("searchForm").addEventListener("click", function() {
    var request = document.getElementById("inputBox").value
    if (request) {
      for (y = 0; y < item.length; y++) {
        if (h3Names[y].innerHTML.indexOf(request.toLowerCase()) > -1) {
          item[y].style.display = "block"
          document.getElementById("showing").textContent = "Showing result(s)"
        } else {
          item[y].style.display = "none"
          counter++
          if (counter === item.length + 1) {
            document.getElementById("showing").textContent = "No search results"
            counter=0
          }
        }
      }
    } else {
      showResults(0, 10)
    }
  }
)
