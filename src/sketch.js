//global for the controls and input
let controls = null;
//store visualisations in a container
let vis = null;
//variable for the p5 sound object
let sound = null;
let sound2 = null;
let sound3 = null;

let fourier;
let amplitude;
let t;
let heart;

let sampleBuffer = [];

let spectrum, wave, level, bass, lowMid, mid, highMid;

let playing = false;

let boxes=[];

let gui;

let songs = [];

let geometry_arry = [];

let sel;


function preload(){
	sound = loadSound('assets/sound/bensound-slowmotion.mp3');
	sound2 = loadSound('assets/sound/bensound-dreams.mp3');
	sound3 = loadSound('assets/sound/bensound-dubstep.mp3');
	font = loadFont('assets/fonts/Roboto-Regular.ttf');
	heart = loadModel('assets/models/heart.obj',true);
	songs.push(sound,sound2,sound3);
}

function setup(){
	background(0);
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(font);
	//for circle.js
	t = createGraphics(windowWidth, windowHeight);

	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();

	const physics = new Physics();
	physics.setup();

	const geometry = new Three();
	geometry.setup();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Circle());
	vis.add(new Three());
	vis.add(new Physics());

	angleMode(DEGREES);

	// sliderRange(0, 12, 1);
	// gui = createGui('p5.gui');
	// gui.addGlobals('point_curve', 'vertex_curve');

	sel = createSelect();
	sel.position(width-330, 40);
	for(let i = 0; i < vis.visuals.length; i++){
		sel.option(i+" : "+vis.visuals[i].name,[i]);
	}
	sel.changed(controls.menu);


}

function draw(){
	background(0);
	translate(-width/2,-height/2,0);

	spectrum = fourier.analyze();
	wave = fourier.waveform();
	level = amplitude.getLevel();
	bass = fourier.getEnergy( "bass",0.9);
	lowMid = fourier.getEnergy( "lowMid",0.9 );
	mid = fourier.getEnergy( "mid",0.9 );
	highMid = fourier.getEnergy( "highMid",0.9 );

	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();

}

function mouseClicked(){
	controls.mousePressed();
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
