Three = class{
    //vis name
    name = "3D";

    draw = () => {
        push();
        background(0);
        noStroke();
        let locX = mouseX - width / 2;
        let locY = mouseY - height / 2;
        translate(width/2,height/2,-100);
        pointLight(255, 0, 0, -250, 0, 0);
        pointLight(0, 0, 255, 250, 0, 0);
        pointLight(0, 0, 255, 0, -200, 0);
        pointLight(255, 0, 0, locX, locY, 0);
        //ambientLight(30);
        fourier.analyze();
        //let bass = fourier.getEnergy("bass");
        let level = amplitude.getLevel();
        push();
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        //ambientMaterial(88, 170, 252);
        //fill(249, 129, 201);
        //box(25 * (bass / 100));
        //normalMaterial();
        ambientMaterial(250);
        torus(100 + (level * 200), 50 + (level * 100));
        pop();
        push();
        ambientMaterial(255,0,0);
        translate(0, 200, -100);
        rotateX(-90);
        plane(width, 300);
        pop();
        pop();
    }
}