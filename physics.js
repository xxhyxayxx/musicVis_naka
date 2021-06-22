//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {
		for(let i = 0; i < box_arry.length; i++){
			const bass = fourier.getEnergy( "bass" );
			const c = map(bass, 0, 255, 255, 0);
			let level = amplitude.getLevel();
			let level2 = level * -0.01;
			let test = i * c;
			box_arry[i].show(test);
			box_arry[i].mova(level2);
		}

	};
}
