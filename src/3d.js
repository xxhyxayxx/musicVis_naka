Three = class{
    //vis name
    name = "3D";

    setup = () => {
        for(let i = 0; i < width/80; i++){
            const step = 100;
            if(i % 2 === 0){
                geometry_arry.push(new Geometry((random(-(width/2), 0) / step) * step, (random(-400,400) / step) * step, (random(-350,-800) / step) * step, random(-85, 85), random(0.5, 2)));
            }else{
                geometry_arry.push(new Geometry((random(width/2, 0) / step) * step, (random(-400,400) / step) * step, (random(-350,-800) / step) * step, random(-85, 85), random(0.5, 2)));
            }
        }
    }

    draw = () => {
        push();
        background(0);
        noStroke();
        let level_map = map(level, 0, 1, 0, 50);
        translate(width/2,height/2,0);
        //add lighting
        ambientLight(25);
        pointLight(255, 0, 0, -200, 0, 0);
        pointLight(0, 0, 255, 200, 0, 0);
        push();
        translate(0,0,-200);
        rotateX(frameCount * 1);
        rotateY(frameCount * 1);
        ambientMaterial(250);
        scale(1.5+(level_map*0.1));
        model(heart);
        pop();

        for(let i = 0; i < geometry_arry.length; i++){
            geometry_arry[i].show_geometry();
        }

        pop();
    }
}