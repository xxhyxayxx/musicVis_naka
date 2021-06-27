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
        let level = amplitude.getLevel();
        push();
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        ambientMaterial(250);
        scale(1.5+(level/0.1));
        model(heart);
        pop();
        pop();
    }
}