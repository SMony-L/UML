// ADD NEW ITEM TO END OF LIST
var newElement = document.getElementsByTagName('ul')[0];
var firstItem = document.createElement('li');
var listTextNode = document.createTextNode('kale');
firstItem.appendChild(listTextNode);
newElement.insertBefore(firstItem, newElement.firstChild);

// ADD NEW ITEM START OF LIST
var newItem = document.createElement('li');
var lastTextNode = document.createTextNode('cream');
newItem.appendChild(lastTextNode);
newElement.appendChild(newItem);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listItems = document.querySelectorAll('li');
var i;
for (i = 0; i < listItems.length; i++){
    listItems[i].className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var headingEle = document.querySelector("h2");
var headingText = headingEle.firstChild.nodeValue;
var totalItems = listItems.length;
var newHead = headingText + " <span> " + totalItems + " </span> ";
headingEle.innerHTML = newHead;