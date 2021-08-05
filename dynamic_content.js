function attach_onclick_events() {
	for(var i = 0; i < document.links.length; i++) {
		document.links[i].onclick = linkclick;
	}
}

function linkclick(e) {
	var a = e.target;
	while(a.nodeName != "A") a = a.parentElement;
	var href = a.getAttribute("href");
	//console.log("Link clicked! " + href);

	if(href == "index.html" || href == "/") return true;

	var r = new RegExp("^(?:[a-z]+:)?//", "i");
	if(r.test(href)) return true;

	var css = document.getElementById("css_current_page");
	var main = document.getElementsByTagName("main")[0];
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(e) {
		if(xhr.readyState == 4 && xhr.status == 200) {
			//console.log("Website content recieved!");
			if(document.getElementById("heading")) document.getElementById("heading").outerHTML = "";
			css.href = href.replace(".html", ".css"); //Korrespondierende CSS Datei laden
			main.innerHTML = xhr.responseText; //empfangenen HTML Tags einfügen
			//history.pushState({}, null, href); //setzt die URL in der Adresszeile um
			attach_onclick_events();
		}
	}
	xhr.open("GET", href, true);
	xhr.setRequestHeader("Content-type", "text/html");
	xhr.send();
	//console.log("Sent!");
	return false;
}

document.addEventListener("DOMContentLoaded", attach_onclick_events);