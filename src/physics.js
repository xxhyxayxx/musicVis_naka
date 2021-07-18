//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	draw = () => {
		// let level_bar = amplitude.getLevel();
		// let level_bar_map = map(level_bar, 0, 1, 0, 300);
		// let level_bar_position = level_bar_map;
		// this.bar = Bodies.rectangle(0,height,width*2,100, { isStatic: true });
		// //this.bar.friction = 1;
		// //this.bar.restitution = 1;
		// let pos2 = this.bar.position;
		// let angle2 = this.bar.angle;
		// Composite.add(composite, this.bar);
		//
		// push();
		// translate(pos2.x,pos2.y);
		// rotate(angle2);
		// rectMode(CENTER);
		// fill(255, 255, 0);
		// rect(0,0,width*2,100);
		// pop();
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
