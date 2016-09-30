//Initialization//

window.onload = init;
function init() {
	var gardenItemsArray = getGardenItems();
	var size = gardenItemsArray.length;
	if (size) {
		garden = document.getElementById("drop");
		if (garden) {
			garden.innerHTML="";	
		};
		for (var i = 0; i < size; i++) {
			var key = gardenItemsArray[i];
			var value = JSON.parse(sessionStorage[key]);
			addToDOM(key, value);
		}
	} else if (document.getElementById("vp")) {
		document.getElementById("vp").innerHTML="Your garden is empty :( Go and add items to your garden by dragging images into the 'My Garden' container.";
		document.getElementById("vp").style.fontWeight="bold";
		document.getElementById("vp").setAttribute("class", "textMG");
		document.getElementById("moInfo").setAttribute("onclick","return false");
	}	
}


//Drag and Copy//

function allowDrop(ev)
{
	ev.preventDefault();
}

function drag(ev)
{
	ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	if (ev.target.innerHTML=="Drag images of desired items to add to garden..." || getGardenItems().length == 0) {
		ev.target.innerHTML="";
	};
	
	var button = document.createElement("button");
	button.style.height="90px";
	button.style.width="95px";
	button.style.margin="2px";
	console.log(document.getElementById(data).src);
	if (/extras\/veggies\/cherrytomatos\.jpg/.test(document.getElementById(data).src)) {
		button.setAttribute("onclick", "window.location='cherrytomato.html'");
	}
	var item = document.getElementById(data).cloneNode(true);
	item.style.position="relative";
	item.style.top="2px";
	item.style.left="-15px";
	button.appendChild(item);
	if (ev.target.id == "drop") {
		ev.target.appendChild(button);
	} else	{
		ev.target.parentNode.parentNode.appendChild(button);
	}
	addToGarden(document.getElementById(data).src);
}


//Session Storage//

function getGardenItems() {
    var gardenItemsArray = sessionStorage.getItem("gardenItemsArray");
    if (!gardenItemsArray) {
        gardenItemsArray = [];
        sessionStorage.setItem("gardenItemsArray", JSON.stringify(gardenItemsArray));
    } else {
        gardenItemsArray = JSON.parse(gardenItemsArray);
    }
    return gardenItemsArray;
}

function addToGarden(src) {
	var gardenItemsArray = getGardenItems();
	var currentDate = new Date();
	var key = "item_" + currentDate.getTime();
	sessionStorage.setItem(key, JSON.stringify(src));    
    gardenItemsArray.push(key);
    sessionStorage.setItem("gardenItemsArray", JSON.stringify(gardenItemsArray));
}

function addToDOM(key, itemVal) {
	var item = document.createElement("img");
	var garden = document.getElementById("drop");
	if (!garden) {
		garden = document.getElementById("vp");
		item.setAttribute("class", "vegPicsMG");
		item.style.display="inline";
		item.style.padding="0px";
		item.style.height="135px";
		item.style.width="180px";
	};
	item.setAttribute("id", key);
	item.setAttribute("src", itemVal);
	item.setAttribute("draggable", true);
	var button = document.createElement("button");
	button.setAttribute("type", "button");
	if (/mygarden\.html/.test(window.location)) {
		button.style.height="170px";
		button.style.width="230px";
		item.style.position="relative";
		item.style.top="2px";
		if (/extras\/veggies\/cherrytomatos\.jpg/.test(itemVal)) {
			button.setAttribute("onclick", "showInfo()");
		} else	{
			button.setAttribute("onclick", "hideInfo()");
		};
	} else	{
		button.style.height="90px";
		button.style.width="95px";
		button.style.margin="2px";
		if (/extras\/veggies\/cherrytomatos\.jpg/.test(itemVal)) {
			button.setAttribute("onclick", "window.location='cherrytomato.html'");
		}
		item.style.position="relative";
		item.style.top="2px";
		item.style.left="-15px";
	};		
	button.appendChild(item);
	garden.appendChild(button);
	 //else{
		//garden.appendChild(item);
	//};
}

function removeAll() {
	var gardenItemsArray = getGardenItems();
    if (gardenItemsArray) {
        sessionStorage.clear();
        getGardenItems();
    };
    if (document.getElementById("drop")) {
    	document.getElementById("drop").innerHTML="Drag images of desired items to add to garden...";
    	document.getElementById("drop").style.fontWeight="bold";
    } else	{
    	document.getElementById("vp").innerHTML="Your garden is empty :( Go and add items to your garden by dragging images into the 'My Garden' container.";
    	document.getElementById("vp").style.fontWeight="bold";
    	hideInfo();
    };
}

function showInfo() {
	info = document.getElementById("hiddenInfo");
	reviews = document.getElementById("revContent");
	info.style.visibility="visible";
	reviews.style.visibility="visible";
	document.getElementById("moInfo").setAttribute("onclick","return true");

}

function hideInfo() {
	info = document.getElementById("hiddenInfo");
	reviews = document.getElementById("revContent");
	info.style.visibility="hidden";
	reviews.style.visibility="hidden";
	document.getElementById("moInfo").setAttribute("onclick","return false");
}