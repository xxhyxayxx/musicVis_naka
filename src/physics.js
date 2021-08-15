//draw the waveform to the screen
Physics = class{
	//vis name
	name = "physics";

	setup = () => {
		//in the setup function, the physics engine of matter.js is used to create the world.
		const Engine = Matter.Engine,
			Runner = Matter.Runner,
			Bodies = Matter.Bodies,
			Composite = Matter.Composite;

		let roundSize = 15;

		const engine = Engine.create();
		const runner = Runner.create();
		Runner.run(runner, engine);
		let options = {
			isStatic: true
		}

		//create rectangles on the top, bottom, left, and right sides,
		//and use them as walls within which the circles move.
		const ground = Bodies.rectangle(200, height, width*2, 10, options);
		const top_wall = Bodies.rectangle(0, 0, width*2, 20, options);
		const left = Bodies.rectangle(0, height,20, height*2,options);
		const right = Bodies.rectangle(width,height,20,height*2,options)
		Composite.add(engine.world, [ground, top_wall, left, right]);


		//decide the number of circles to be drawn depending on the screen width,
		//and push them into the physics_circles array.
		const num_circle = width / 10;
		for(let i = 0; i < num_circle; i++){
			physics_circles.push(new Physics_circle(random(0,width), random(0,height), roundSize, engine.world));
		}
	}

	draw = () => {
		//Call show and scale function in the physics_circle class to draw the circles in the array.
		for(let i = 0; i < physics_circles.length; i++){
			let size = map(wave[i], -1, 1, 0.8, 1.2);
			let value = 1;
			const color = map(bass, 0, 255, 0, 255);
			const color2 = map(highMid, 0, 255, 0, 255);
			if (songs[0].isPlaying() || songs[1].isPlaying() || songs[2].isPlaying()) {
				value = size
			}
			physics_circles[i].show(color, color2);
			physics_circles[i].scale(value);
		}

	};
}
