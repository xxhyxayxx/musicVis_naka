//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {
		// var spectrum = fourier.analyze();
		// if(beatDetect.detectBeat(spectrum)){
		// 	fill(255, 0, 0);
		// 	ellipse(width/2, height/2, 300, 300);
		// }

		for(let i = 0; i < box_arry.length; i++){
			const bass = fourier.getEnergy( "bass",0.9 );
			const mid_high = fourier.getEnergy( "highMid",0.9 );
			let level = amplitude.getLevel();
			let level2 = level * -0.0001;
			//let bass_spectrum = map(bass, 0, 255, 0, -0.02);
			let level3 = map(level, 0, 1, 0, -0.003);
			let test = -0.01;
			let level4 = map(level, 0, 1, 299, 0);
			let level5 = Math.ceil(level4);
			let bass_level = Math.ceil(bass);
			let mid_high_level = Math.ceil(mid_high);
			box_arry[i].show();
			if(i === level5){
				box_arry[i].show(155);
				box_arry[i].move(test);
			}else if(i === bass_level){
				box_arry[i].show(30);
				box_arry[i].move(test);
			}else if(i === mid_high_level){
				box_arry[i].show(200);
				box_arry[i].move(test);
			}
			//console.log(bass_level);
		}

	};
}
