Particle = class{
    constructor() {
        this.pos = createVector(0,0,0);
        this.vel = p5.Vector.random3D().normalize().mult(random(4, 6));
        //this.c = c;
        //this.w = random(4, 10);
    }

    update_particle = () => {
        this.pos.add(this.vel)
    }

    show_particle = () => {
        // noStroke();
        // fill("rgba(255, 255, 255, 0.08)");
        //
        // ellipse(this.pos.x, this.pos.y, 20);

        noStroke();
        fill(255);
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(10);

        pop();
    }
}
