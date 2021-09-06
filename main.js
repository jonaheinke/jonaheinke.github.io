const newDOMContentLoaded = new CustomEvent("newDOMContentLoaded");

document.addEventListener("DOMContentLoaded", function() {
	//TODO: Funktioniert noch nicht für dynamisch geladenen Content
	//https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom (jquery.initialize sieht echt gut aus)
	document.querySelectorAll(".noselect").forEach(function(element) {
		element.setAttribute("draggable", "false");
		element.setAttribute("ondragstart", "return false");
	});
});