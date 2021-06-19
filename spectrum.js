Spectrum = class{
	name = "spectrum";

	draw = () => {
		push();
		const spectrum = fourier.analyze();
		noStroke();
		
		fill(0,255,0)
		for (let i = 0; i< spectrum.length; i++){
			const y = map(i, 0, spectrum.length, 0, height);
			const w = map(spectrum[i], 0, 255, 0, width);
			const c = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], c, 0);
			rect(0, y, w, height / spectrum.length);
		}
		pop();
	};
}
