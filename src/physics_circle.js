//control the physics cirlces
Physics_circle = class {
	//based on the arguments, add the circles to the world in the physics engine.
	constructor(x,y,r,world) {
		this.body = Matter.Bodies.circle(x, y, r);
		this.body.friction = 0;
		this.body.restitution = 0.7;
		this.world = world
		Matter.Composite.add(world, this.body);
	}

	//draw the vertex shape created by draw_body function
	show = (color) => {
		push();
		switch(color_all) {
			case 'Purple':
				stroke(150, color, 255);
				break;

			case 'Blue':
				stroke(color, 150, 255);
				break;

			case 'Yellow':
				stroke(255, 200, color);
				break;

			case 'Green':
				stroke(150, 255, color);
				break;

			case 'Pink':
				stroke(255, color, 150);
				break;

		}
		noFill();
		this.draw_body(this.body);
		pop();
	}

	//each radius of the circle scales with the level of the song.
	//if each circle keeps scaling,
	//it will become too large to fit on the screen
	//so that it will become larger or smaller depending on certain conditions.
	scale = (level) => {
		if(this.body.circleRadius > 10 && this.body.circleRadius < 50){
			Matter.Body.scale(this.body, level, level);
		}else if(this.body.circleRadius > 50){
			Matter.Body.scale(this.body, 0.8, 0.8);
		}else if(this.body.circleRadius < 10){
			Matter.Body.scale(this.body, 1.2, 1.2);
		}
	}

	//draw_verticies and draw_body function were implemented by referring to this site.
	//https://github.com/b-g/p5-matter-examples
	draw_vertices = (vertices) => {
		beginShape();
		for (let i = 0; i < vertices.length; i++) {
			vertex(vertices[i].x, vertices[i].y);
		}
		endShape(CLOSE);
	}

	draw_body = (body) => {
		if (body.parts && body.parts.length > 1) {
			for (let p = 1; p < body.parts.length; p++) {
				this.draw_vertices(body.parts[p].vertices)
			}
		} else {
			this.draw_vertices(body.vertices);
		}
	}
}

