/*https://stackoverflow.com/a/4819886*/
/*TODO: Link darf auf Mobilgeräten noch nicht beim ersten Klick triggern.*/
function isTouchDevice() {
	return (('ontouchstart' in window) ||
		(navigator.maxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0));
}

function link_click(e) {
	var a = e.target;
	while(a.nodeName != "A") a = a.parentElement;
	var href = a.getAttribute("href");
	//console.log("Link clicked! " + href);

	//TODO: Müsste eigentlich return false sein, damit die Seite nicht neulädt und der Player stoppt. Aber ohne return true ist der Link wirkungslos.
	if(href == "index/index.html" || href == "/" || href == "") {
		load_page("index/index.html");
		return false;
	}

	var r = new RegExp("^(?:[a-z]+:)?//", "i");
	if(r.test(href)) return true;

	load_page(href);
	return false;
}

function attach_onclick_events() {
	for(var i = 0; i < document.links.length; i++) {
		document.links[i].onclick = link_click;
	}
}

function load_page(url) {
	var css = document.getElementById("css_current_page");
	var main = document.getElementsByTagName("main")[0];
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(e) {
		if(xhr.readyState == 4 && xhr.status == 200) {
			//console.log("Website content recieved!");
			if(document.getElementById("heading")) document.getElementById("heading").outerHTML = "";
			css.href = url.replace(".html", ".css"); //Korrespondierende CSS Datei laden
			main.innerHTML = xhr.responseText; //empfangenen HTML Tags einfügen
			//history.pushState({}, null, url); //setzt die URL in der Adresszeile um
			attach_onclick_events();
			document.dispatchEvent(newDOMContentLoaded);
			document.body.scrollTop = 0; //für Safari
			document.documentElement.scrollTop = 0; //für Chrome, Firefox, IE und Opera
		}
	}
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "text/html");
	xhr.send();
}

document.addEventListener("DOMContentLoaded", () => load_page("index/index.html"));