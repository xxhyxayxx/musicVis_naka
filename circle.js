Circle = class {
    //vis name
    name = "circle";


    draw = () => {
        t.background(0);
        const spectrum = fourier.analyze();
        const bass = fourier.getEnergy( "bass" );
        const r = 200;
        const angle = 0;
        const bar_num = 64;
        const step = 2 * PI / bar_num;
        //const theta = 0;
        t.noStroke();
        t.push();
        t.translate(width/2, height/2);
        //draw the bars in a line along the circle.
        for(let i = 0; i < bar_num; i++){
            const amp = spectrum[i];
            //for each element of the amp map it to screen
            const y = map(amp, 0, 255, 0, 80);
            const c = map(bass, 0, 255, 255, 0);
            const height = 10 + y;
            //calculate the position of each bar
            const pi_x = r * sin(angle);
            const pi_y = r * cos(angle);
            t.rotate(step);
            t.push();
            t.fill(amp,c,255);
            //translate(r * sin(theta), r * cos(theta));
            //rotate(2*PI);
            t.rect(pi_x, pi_y, 10, height, 5);
            t.pop();
        }
        t.pop();
        image(t, 0, 0);
    }
}