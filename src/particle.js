Particle = class{
    constructor() {
        this.pos = createVector(0,0,0);
        this.vel = p5.Vector.random3D().normalize().mult(random(4, 6));
    }

    update_particle = () => {
        this.pos.add(this.vel)
    }

    show_particle = () => {
        noStroke();
        fill(255);
        push();
        rotateZ(-90);
        rotateY(90);
        translate(this.pos.x, this.pos.y, this.pos.z);
        plane(200,3);

        pop();
    }
}
