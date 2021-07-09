//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {
		for(let i = 0; i < box_arry.length; i++){
			let level = amplitude.getLevel();
			let level2 = level * -0.01;
			box_arry[i].show();
			box_arry[i].mova(level2);
		}

	};
}
