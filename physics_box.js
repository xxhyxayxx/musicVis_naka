//draw the waveform to the screen
Physics_box = class{
	constructor(x,y,w,h) {
		this.body = Bodies.rectangle(x,y,w,h);
		this.body.friction = 1;
		this.body.restitution = 1;
		this.w = w;
		this.h = h;
		Composite.add(composite, this.body);
	}

	//draw the wave form to the screen
	show = (c) => {
		let pos = this.body.position;
		let angle = this.body.angle;

		push();
		translate(pos.x,pos.y);
		rotate(angle);
		rectMode(CENTER);
		fill(c, 255, 0);
		rect(0,0,this.w,this.h);
		pop();
	};

	mova = (level) => {
		Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0, y: level});
	}
}

