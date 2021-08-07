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
let heart;

let x, y, z, pos;
let r, g, b, c;

var sampleBuffer = [];
var beatDetect;
let test_beat

const Engine = Matter.Engine,
	//Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;

let engine,composite,ground,a,top_wall,left,right;

let num_box;

let spectrum, wave, level, bass, lowMid, mid, highMid, peakDetect;

let geometry_arry;

let playing = false;

let boxes=[], detect;

let roundSize = 15;

var point_curve = 5;
var vertex_curve = 10;

let gui;

let rere;

let songs = []

let sound2, sound3;


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
	 peakDetect = new p5.PeakDetect();

	 physics();

	 geometry();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new Circle());
	 vis.add(new Three());
	 vis.add(new Physics());

	 beatDetect = new BeatDetect();

	 angleMode(DEGREES);

	// sliderRange(0, 12, 1);
	// gui = createGui('p5.gui');
	// gui.addGlobals('point_curve', 'vertex_curve');


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
	beatDetect = new BeatDetect();
}

function physics(){
	//for physics.js
	engine = Engine.create();
	world = engine.world;
	runner = Runner.create();
	Runner.run(runner, engine);
	var options = {
		isStatic: true
	}
	ground = Bodies.rectangle(200, height, width*2, 120, options);
	top_wall = Bodies.rectangle(0, 0, width*2, 20, options);
	left = Bodies.rectangle(0, height,20, height*2,options);
	right = Bodies.rectangle(width,height,20,height*2,options)
	Composite.add(world, [ground, top_wall, left, right]);
	num_box = width / 10;
	for(let i = 0; i < num_box; i++){
		boxes.push(new Physics_box(random(0,width), random(0,height), roundSize));
	}
}

function geometry(){
	geometry_arry = [];
	for(let i = 0; i < width/80; i++){
		const step = 100;
		if(i % 2 === 0){
			geometry_arry.push(new Geometry((random(-(width/2), 0) / step) * step, (random(-400,400) / step) * step, (random(-350,-800) / step) * step, random(-85, 85), random(0.5, 2)));
		}else{
			geometry_arry.push(new Geometry((random(width/2, 0) / step) * step, (random(-400,400) / step) * step, (random(-350,-800) / step) * step, random(-85, 85), random(0.5, 2)));
		}
	}
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
