Circle = class {
    //vis name
    name = "circle";

    draw = () => {

        t.background(0);

        t.push();
        t.translate(width/2, height/2);

        let point_curve = 5;
        let vertex_curve = 10;

        //curve function
        this.curve(bass, point, point_curve, 130);
        this.curve(highMid, vertex, vertex_curve, 130);

        //bar function
        this.bar(spectrum, bass);

        //arc function
        const arc_data = [bass,lowMid,mid,highMid];
        this.arc(arc_data);

        t.pop();
        image(t, 0, 0);
    }

    curve = (energy, type, number, number2) => {
        t.beginShape();
        // Making stroke color from energy of fourier.
        const color_curve = map(energy, 0, 255, 0, 150);
        t.stroke(150, color_curve, 255);
        t.strokeWeight(4)
        t.noFill();
        // Making a shape using vertex or point.
        // This code was created with reference to this video https://www.youtube.com/watch?v=MzhBizCmpi8
        for(let i = 0; i < 360; i++) {
            const num_v = 0;
            const num_v2 = number;
            const num_v3 = 180 - number2;

            const rMin = map(sin(energy),-1,1,num_v3,220);
            const rMax = map(sin(energy),-1,1,220,num_v3);

            const r2Min = map(sin(energy),-1,1,220,num_v3);
            const r2Max = map(sin(energy),-1,1,num_v3,220);

            const r1 = map(sin(i*num_v),-1,1,rMin,rMax);
            const r2 = map(sin(i*num_v2+90),-1,1,r2Min,r2Max);

            const r = r1+r2;
            const x = r * cos(i);
            const y = r * sin(i);

            if(type === point){
                t.point(x,y);
            }else{
                t.vertex(x,y);
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
            t.fill(c2,c,255);
            t.rect(pi_x, pi_y, 5, height, 2.5);
        }
    }

    // Making arc bars that each bar using different energy.
    arc = (arc_data) => {
        const y = map(arc_data[0], 0, 255, 0, 2);
        const m = map(arc_data[1], 0, 255, 0, 2);
        const mi = map(arc_data[2], 0, 255, 0, 2);
        const high = map(arc_data[3], 0, 255, 0, 2);
        const c = map(arc_data[0], 0, 255, 0, 150);
        t.noFill();
        t.stroke(150, c, 255);
        t.strokeWeight(5);
        t.arc(0, 0, 380, 380, 60, PI*y+60);
        t.arc(0, 0, 360, 360, 45, PI*m+45);
        t.arc(0, 0, 340, 340, 90, PI*mi+90);
        t.arc(0, 0, 320, 320, 0, PI*high);
    }
}