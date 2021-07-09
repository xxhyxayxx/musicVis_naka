Circle = class {
    //vis name
    name = "circle";


    draw = () => {
        t.background(0);
        const spectrum = fourier.analyze();
        const bass = fourier.getEnergy( "bass",0.9);
        const lowMid = fourier.getEnergy( "lowMid",0.9 );
        const mid = fourier.getEnergy( "mid",0.9 );
        const highMid = fourier.getEnergy( "highMid",0.9 );
        const r = 200;
        const angle = 0;
        const bar_num = 64;
        const step = 2 * PI / bar_num;
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
            t.fill(amp,c,255);
            t.rect(pi_x, pi_y, 10, height, 5);
        }
        const y = map(bass, 0, 255, 0, 2);
        const m = map(lowMid, 0, 255, 0, 2);
        const mi = map(mid, 0, 255, 0, 2);
        const high = map(highMid, 0, 255, 0, 2);
        const c = map(bass, 0, 255, 255, 0);
        t.noFill();
        t.stroke(255, c, 255);
        t.strokeWeight(8);
        t.arc(0, 0, 380, 380, 0, PI*y);
        t.arc(0, 0, 360, 360, 0, PI*m);
        t.arc(0, 0, 340, 340, 0, PI*mi);
        t.arc(0, 0, 320, 320, 0, PI*high);
        t.pop();
        image(t, 0, 0);
    }
}