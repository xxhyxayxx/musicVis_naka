//display the circle music visualization
Circle = class {
    //vis name
    name = "circle";

    draw = () => {
        t.background(bgColor);

        t.push();
        t.translate(width/2, height/2);

        //curve function
        let arg =[
                {
                    energy: bass,
                    type: point,
                    curve_num: 5,
                    c_size: 130
                },
                {
                    energy: highMid,
                    type: vertex,
                    curve_num: 10,
                    c_size: 130
                }
            ];
        this.curve(arg[0]);
        this.curve(arg[1]);

        //bar function
        this.bar(spectrum, bass);

        //arc function
        const arc_data = [bass,lowMid,mid,highMid];
        this.arc(arc_data);

        t.pop();
        image(t, 0, 0);
    }

    curve = (arg) => {
        t.beginShape();
        t.stroke(color_stroke);
        t.strokeWeight(4)
        t.noFill();
        // Making a shape using vertex or point.
        // This code was created with reference to this video https://www.youtube.com/watch?v=MzhBizCmpi8
        for(let i = 0; i < 360; i++) {
            const num_v = 0;
            const num_v2 = arg.curve_num;
            const num_v3 = 180 - arg.c_size;

            const rMin = map(sin(arg.energy),-1,1,num_v3,220);
            const rMax = map(sin(arg.energy),-1,1,220,num_v3);

            const r2Min = map(sin(arg.energy),-1,1,220,num_v3);
            const r2Max = map(sin(arg.energy),-1,1,num_v3,220);

            const r1 = map(sin(i*num_v),-1,1,rMin,rMax);
            const r2 = map(sin(i*num_v2+90),-1,1,r2Min,r2Max);

            const r = r1+r2;
            const x = r * cos(i);
            const y = r * sin(i);

            switch(arg.type){
                case point :
                    t.point(x,y)
                    break;
                default :
                    t.vertex(x,y)
            }
        }
        t.endShape(CLOSE);
    }

    bar = (spectrum, energy) => {
        const r = 200;
        const angle = 0;
        const bar_num = 128;
        const step = 2 * PI / bar_num;
        //draw the bars in a line along the circle.
        t.noStroke();
        for(let i = 0; i < bar_num; i++){
            const amp = spectrum[i];
            //for each element of the amp map it to screen
            const y = map(amp, 0, 255, 0, 80);
            const c = map(energy, 0, 255, 255, 0);
            const c2 = map(spectrum[i], 0, 255, 255, 50);
            const height = y;
            //calculate the position of each bar
            const pi_x = r * sin(angle);
            const pi_y = r * cos(angle);
            t.rotate(step);
            switch(color_all) {
                case 'Purple':
                    t.fill(c2,c,255);
                    break;

                case 'Blue':
                    t.fill(c,c2,255);
                    break;

                case 'Yellow':
                    t.fill(255,c2,c);
                    break;

                case 'Green':
                    t.fill(c,255,c2);
                    break;

                case 'Pink':
                    t.fill(255,c,c2);
                    break;

                default:
                    t.fill(c2,c,255);
            }
            t.rect(pi_x, pi_y, 5, height, 2.5);
        }
    }

    // Making arc bars that each bar using different energy.
    arc = (arc_data) => {
        t.noFill();
        t.stroke(color_stroke);
        t.strokeWeight(5);
        for(let i = 0; i < arc_data.length; i++){
            const arc_value = map(arc_data[i], 0, 255, 0, 2);
            t.arc(0, 0, 320+i*20, 320+i*20, i*45, PI*arc_value+i*45);
        }
    }
}