Physics_circle = class{
	constructor(x,y,r,world) {
		this.body = Matter.Bodies.circle(x, y, r);
		this.body.friction = 0;
		this.body.restitution = 0.7;
		this.r = r;
		this.world = world
		Matter.Composite.add(world, this.body);

	}

	show = (color, color2) => {
		push();
		stroke(255, color2, color);
		noFill();
		this.draw_body(this.body);
		pop();
	}

	scale = (level) => {
		if(this.body.circleRadius > 10 && this.body.circleRadius < 50){
			Matter.Body.scale(this.body, level, level);
		}else if(this.body.circleRadius > 50){
			Matter.Body.scale(this.body, 0.8, 0.8);
		}else if(this.body.circleRadius < 10){
			Matter.Body.scale(this.body, 1.2, 1.2);
		}
	}

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

