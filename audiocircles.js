document.addEventListener("DOMContentLoaded", function(event) {
	const context = document.getElementById("audiocircles").getContext("2d");
	const circles = [3, 2, 6, 3, 2, 2, 2, 3, 2, 2, 2, 3, 8, 5, 3, 2, 4, 5, 3, 1, 2];
	const spacing = 25;
	const radius = 7.5;
	const height = 200;
	for(let i = 0; i < 2560 / spacing; i++) {
		let pos = i % circles.length;
		for(let j = 0; j < circles[pos]; j++) {
			context.beginPath();
			context.arc(spacing / 2 + i * spacing, height - radius - j * spacing, radius, 0, 2 * Math.PI, false);
			context.fillStyle = "black";
			context.fill();
		}
	}
});