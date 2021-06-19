Three = class{
    //vis name
    name = "3D";

    draw = () => {
        push();
        noStroke();
        translate(width/2,height/2,0);
        pointLight(255, 0, 106, -200, 0, 0);
        pointLight(0, 0, 255, 200, 0, 0);
        ambientLight(30);
        fourier.analyze();
        //let bass = fourier.getEnergy("bass");
        let level = amplitude.getLevel();
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        //ambientMaterial(88, 170, 252);
        //fill(249, 129, 201);
        //box(25 * (bass / 100));
        normalMaterial();
        //ambientMaterial(250);
        torus(100 + (level * 200), 50 + (level * 100));
        pop();
    }
}