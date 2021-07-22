//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {

		for(let i = 0; i < box_arry.length; i++){
			let test = -0.01;
			box_arry[i].show();
			var spectrum = fourier.analyze();
			if(beatDetect.detectBeat(spectrum)){
				box_arry[i].move(test);
			}
		}

	};
}
