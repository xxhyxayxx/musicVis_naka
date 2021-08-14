//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	setup = () => {
		const Engine = Matter.Engine,
			Runner = Matter.Runner,
			Bodies = Matter.Bodies,
			Composite = Matter.Composite;

		let engine,ground,top_wall,left,right,runner;

		let num_box;

		let roundSize = 15;

		engine = Engine.create();
		runner = Runner.create();
		Runner.run(runner, engine);
		let options = {
			isStatic: true
		}
		ground = Bodies.rectangle(200, height, width*2, 10, options);
		top_wall = Bodies.rectangle(0, 0, width*2, 20, options);
		left = Bodies.rectangle(0, height,20, height*2,options);
		right = Bodies.rectangle(width,height,20,height*2,options)
		Composite.add(engine.world, [ground, top_wall, left, right]);
		num_box = width / 10;
		for(let i = 0; i < num_box; i++){
			boxes.push(new Physics_circle(random(0,width), random(0,height), roundSize, engine.world));
		}
	}

	draw = () => {
		for(let i = 0; i < boxes.length; i++){
			let size = map(wave[i], -1, 1, 0.8, 1.2);
			let value = 1;
			let color = map(bass, 0, 255, 0, 255);
			let color2 = map(highMid, 0, 255, 0, 255);
			if (songs[0].isPlaying() || songs[1].isPlaying() || songs[2].isPlaying()) {
				value = size
			}
			boxes[i].show(color, color2);
			boxes[i].scale(value);
		}

	};
}
