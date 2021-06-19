//draw the waveform to the screen
WavePattern = class{
	//vis name
	name = "wavepattern";

	//draw the wave form to the screen
	draw = () => {
		push();
		noFill();
		stroke(255, 0, 0);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		const wave = fourier.waveform();
		for (let i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			let x = map(i, 0, wave.length, 0, width);
			let y = map(wave[i], -1, 1, 0, height);

			vertex(x, y);
		}

		endShape();
		pop();
	};
}
