Three = class{
    //vis name
    name = "3D";

    draw = () => {
        push();
        background(0);
        noStroke();
        let level = amplitude.getLevel();
        let level_map = map(level, 0, 1, 0, 255);
        //change the position of light
        let locX = mouseX - width / 2;
        let locY = mouseY - height / 2;
        translate(width/2,height/2,0);
        //add lighting
        ambientLight(25);
        pointLight(255, 0, 0, -250, 0, 0);
        pointLight(0, 0, 255, 250, 0, 0);
        pointLight(0, 0, 255, 0, -200, 0);
        pointLight(255, 0, 0, locX, locY, 0);
        push();
        translate(0,0,-400);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        ambientMaterial(250);
        scale(1.5+(level/0.1));
        model(heart);
        pop();

        //rotateX(sin(frameCount / 6) * 360);
        //rotateY(cos(frameCount / 6) * 360);
        //translate(0, 0, sin(frameCount) * 100);

        //directionalLight([255], createVector(0, 0, -1));
        translate(0,0,-600);
        //rotateZ(frameCount * 0.01);
        if (random(1) > 0.97) {
            for (let i = 0; i < 50*level; i++) {
                let p = new Particle();
                particles.push(p);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (dist(particles[i].pos.x, particles[i].pos.y, particles[i].pos.z, 0, 0, 0) < 800) {
                particles[i].update_particle();
                particles[i].show_particle(level);
            } else {
                particles.splice(i, 1);
            }

        }
        pop();


    }
}