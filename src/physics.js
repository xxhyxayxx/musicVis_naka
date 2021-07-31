//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {
		detect = !!beatDetect.detectBeat(spectrum);
		for(let i = 0; i < boxes.length; i++){
			let size = map(wave[i], -1, 1, 0.8, 1.2);
			let test;
			let color = map(bass, 0, 255, 0, 255);
			let color2 = map(highMid, 0, 255, 0, 255);
			if (sound.isPlaying()) {
				test = size
			} else {
				test = 1
			}
			boxes[i].show(color, color2);
			boxes[i].scale(test);
		}
		noStroke();
		fill(0);
		rectMode(CENTER);
		rect(ground.position.x, ground.position.y, width*2, 10);

	};
}
