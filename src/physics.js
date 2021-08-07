//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {
		if(beatDetect.detectBeat(spectrum)){
			detect = true;
		}
		for(let i = 0; i < boxes.length; i++){
			let size = map(wave[i], -1, 1, 0.8, 1.2);
			let value = 1;
			let color = map(bass, 0, 255, 0, 255);
			let color2 = map(highMid, 0, 255, 0, 255);
			if (sound.isPlaying()) {
				value = size
			}
			boxes[i].show(color, color2);
			boxes[i].scale(value);
		}
		noStroke();
		fill(0);
		rectMode(CENTER);
		rect(ground.position.x, ground.position.y, width*2, 10);

	};
}
