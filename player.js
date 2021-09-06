//const stream_url = "https://streams.ilovemusic.de/iloveradio1.mp3";
const stream_url = "http://stream.radio-unicc.de:8000/unicc_xq.mp3";
const stream_type = "audio/mpeg";

var audio = null;
//var sourcelist = [];
/*
function _switch_sources() {
	var temp = sourcelist.innerHTML;
	sourcelist.innerHTML = audio.innerHTML;
	audio.innerHTML = temp;
}

function play() {
	console.log("PLAY");
	_switch_sources();
	audio.load();
	audio.play();
}

function pause() {
	console.log("PAUSE");
	audio.pause();
	_switch_sources();
	setTimeout(function() {
		audio.load();
	}, 1);
}
*/
function play() {
	audio.src = stream_url;
	//audio.volume = 0.4;
	//audio.type = stream_type;
	//audio.load(); //Warum ist das notwendig, damit der Stream nicht wieder in der Vergangenheit startet zu spielen? Der alte Player kommt ohne die Zeile aus.
	audio.play();
}

function pause() {
	//audio.pause();
	audio.src = "";
	audio.type = "";
}
/*
function play() {
	audio.innerHTML = "<source src=\"" + stream_url + "\" type=\"audio/mpeg\">";
	audio.load();
	setTimeout(function() {
		audio.play();
	}, 1);
}

function pause() {
	audio.innerHTML = "";
	//audio.type = "";
	audio.pause();
	setTimeout(function() {
		audio.load();
	});
}
*/
function startstop(cb) {
	if(cb.checked) return play(cb);
	return pause(cb);
}

function change_volume(value) {
	audio.volume = value / 100;
}



/* ------------------------------------------------------------------------------------------------------------------ */
/*                                               Songinfos aktualisieren                                              */
/* ------------------------------------------------------------------------------------------------------------------ */
const interval = 3000;

function get_song_info() {
	fetch("http://www.radio-unicc.de/soundstatus/info.php")
	.then(function (response) {
		return response.json();
	}).then(function (data) {
		document.querySelectorAll(".song-cover").forEach((el) => {
			if(data["cover"] != "") {
				el.src = "http://www.radio-unicc.de" + data["cover"];
				//el.style.display = "block";
				el.classList.remove("hide");
			}
			else if(data["image"] != "") {
				el.src = "http://www.radio-unicc.de" + data["image"];
				//el.style.display = "block";
				el.classList.remove("hide");
			}
			else {
				//el.style.display = "none";
				el.classList.add("hide");
				el.src = "";
			}
		});
		document.querySelectorAll(".song-title").forEach((el) => {
			el.innerHTML = data["title"];
		});
		document.querySelectorAll(".song-artist").forEach((el) => {
			el.innerHTML = data["artist"];
		});
	});
}

const a = setInterval(get_song_info, interval);

document.addEventListener("newDOMContentLoaded", get_song_info)

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                  DOMContentLoaded                                                  */
/* ------------------------------------------------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", function() {
	sourcelist = document.getElementById("sourcelist");
	
	audio = document.getElementById("audio");
	audio.volume = 0.69;

	get_song_info();
});