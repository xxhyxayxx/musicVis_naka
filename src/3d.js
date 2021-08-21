//display the 3D music visualization
Three = class{
    //vis name
    name = "3D";

    setup = () => {
        //decide the number of geometries to be displayed according to the screen width
        //and push them to geometry_arry.
        for(let i = 0; i < width/80; i++){
            const step = 100;
            //set a condition so that geometries of equal volume are placed on the left and right sides of the screen.
            if(i % 2 === 0){
                geometry_arry.push(new Geometry((random(-(width/2), 0) / step) * step, (random(-400,400) / step) * step, (random(-350,-800) / step) * step, random(-85, 85), random(0.5, 2)));
            }else{
                geometry_arry.push(new Geometry((random(width/2, 0) / step) * step, (random(-400,400) / step) * step, (random(-350,-800) / step) * step, random(-85, 85), random(0.5, 2)));
            }
        }
    }

    draw = () => {
        push();
        background(bgColor);
        noStroke();
        let level_map = map(level, 0, 1, 0, 50);
        translate(width/2,height/2,0);

        //add blue right from right side and red light from left side
        //then the lighting becomes pink!!
        ambientLight(25);
        switch(color_all) {
            case 'Purple':
                pointLight(100, 0, 0, -200, 0, 0); //red
                pointLight(0, 0, 255, 200, 0, 0); //blue
                break;

            case 'Blue':
                pointLight(0, 122, 100, -200, 0, 0); //green
                pointLight(0, 0, 255, 200, 0, 0); //blue
                break;

            case 'Yellow':
                pointLight(200, 0, 0, -200, 0, 0); //red
                pointLight(100, 255, 0, 200, 0, 0); //yellow
                break;

            case 'Green':
                pointLight(0, 255, 0, -200, 0, 0); //green
                pointLight(100, 255, 0, 200, 0, 0); //yellow
                break;

            case 'Pink':
                pointLight(255, 0, 0, -200, 0, 0); //red
                pointLight(200, 50, 255, 200, 0, 0); //yellow
                break;

        }

        //add the obj model
        //the size of the model scales with the level of the song.
        push();
        translate(0,0,-200);
        rotateX(frameCount * 1);
        rotateY(frameCount * 1);
        ambientMaterial(250);
        scale(1.5+(level_map*0.1));
        model(heart);
        pop();

        //call show_geometry function in geometry class to draw geometries in geometry_arry
        for(let i = 0; i < geometry_arry.length; i++){
            geometry_arry[i].show_geometry();
        }

        pop();
    }
}