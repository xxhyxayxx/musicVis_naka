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

let particles = [];
let x, y, z, pos;
let r, g, b, c;

var sampleBuffer = [];
var beatDetect;
let test_beat

const Engine = Matter.Engine,
	  Bodies = Matter.Bodies,
	  Body = Matter.Body,
	  Composite = Matter.Composite;

let engine,composite,ground,a,top_wall,left,right;

let box_arry, num_box;

function preload(){
	sound = loadSound('assets/sound/bensound-slowmotion.mp3');
	font = loadFont('assets/fonts/Roboto-Regular.ttf');
	heart = loadModel('assets/models/heart.obj',true);
}

function setup(){
	 background(0);
	 createCanvas(windowWidth, windowHeight, WEBGL);
	 textFont(font);
	 frameRate(60);
	 //for circle.js
	 t = createGraphics(windowWidth, windowHeight);

	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();
	 amplitude = new p5.Amplitude();

	 //for physics.js
	 engine = Engine.create();
	 composite = engine.world;
	 Engine.run(engine);
	 ground = Bodies.rectangle(0, height, width*2, 1, { isStatic: true });
	 top_wall = Bodies.rectangle(0, 0, width*2, 20, { isStatic: true });
	 left = Bodies.rectangle(0, height,20, height*2,{ isStatic: true });
	 right = Bodies.rectangle(width,height,20,height*2,{ isStatic: true })
	 Composite.add(composite, [ground,top_wall,left,right]);
	 box_arry = []
	 num_box = width / 4;
	 for(let i = 0; i < num_box; i++){
		box_arry.push(new Physics_box(random(0,width), random(0,height), 20, 20));
	 }

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new Circle());
	 vis.add(new Three());
	 vis.add(new Physics());

	 beatDetect = new BeatDetect();

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
