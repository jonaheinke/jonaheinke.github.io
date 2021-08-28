document.addEventListener("DOMContentLoaded", function(event) {
	var abc = document.getElementById("abc");
	//console.log(abc);
	
	function change(el) {
		if(el.checked) return play_(el);
		return pause_(el);
	}
	var audio = document.getElementById("audio");
	audio.volume = 0.3; //optional
	function play_() {
		//console.log("PLAY");
		var temp = abc.innerHTML;
		abc.innerHTML = audio.innerHTML;
		audio.innerHTML = temp;
		audio.load();
		
		audio.play();
	}
	function pause_() {
		//console.log("PAUSE");
		audio.pause();
		var temp = abc.innerHTML;
		abc.innerHTML = audio.innerHTML;
		audio.innerHTML = temp;
		setTimeout(function() {
			audio.load();
		}, 1);
	}
	/*
	function play_(el) {
		console.log("PLAY");
		if (!el.getAttribute("src")) {
			var temp = abc.innerHTML;
			abc.innerHTML = el.innerHTML;
			el.innerHTML = temp;
			//el.setAttribute("src", "http://stream.radio-unicc.de:8000/unicc_xq.mp3");
			el.load();
		}
		el.play();
	}
	function pause_(el) {
		console.log("PAUSE");
		var temp = abc.innerHTML;
		abc.innerHTML = el.innerHTML;
		el.innerHTML = temp;
		//el.setAttribute("src", "");
		el.pause();
		setTimeout(function() {
			el.load();
		});
	}*/
});