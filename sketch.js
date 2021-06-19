//global for the controls and input 
let controls = null;
//store visualisations in a container
let vis = null;
//variable for the p5 sound object
let sound = null;
//variable for p5 fast fourier transform
let fourier;
let amplitude;
let t;
function preload(){
	sound = loadSound('assets/IMG_1196.mp4');
	font = loadFont('assets/Roboto-Regular.ttf');
}

function setup(){
	 background(0);
	 createCanvas(windowWidth, windowHeight, WEBGL);
	 t = createGraphics(windowWidth, windowHeight);
	 controls = new ControlsAndInput();
	 textFont(font);
	 //instantiate the fft object
	 fourier = new p5.FFT();
	 amplitude = new p5.Amplitude();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new Circle());
	 vis.add(new Three());

}

function draw(){
	background(0);
	translate(-width/2,-height/2,0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
