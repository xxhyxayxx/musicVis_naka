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
let heart;
let spectrum;
let wave;
let level;
let bass;
let lowMid;
let mid;
let highMid;

let t;

let playing = false;

let physics_circles=[];

let gui;

let songs_obj = {};

let geometry_arry = [];

let sel;

var bgColor = [0,0,0];

var color_all = ['Purple','Blue', 'Green', 'Yellow','Pink'];

let color_stroke;

let right_light;

let left_light;


function preload(){
	sound = loadSound('assets/sound/aspire-pryces-main-version-02-12-3077.mp3');
	sound2 = loadSound('assets/sound/poem-soundroll-main-version-02-33-17721.mp3');
	sound3 = loadSound('assets/sound/bensound-dubstep.mp3');
	font = loadFont('assets/fonts/Roboto-Regular.ttf');
	heart = loadModel('assets/models/heart.obj',true);
}

function setup(){
	background(bgColor);
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(font);

	//make music playlist
	const songs = [];
	songs.push(sound,sound2,sound3);

	const title = ['Aspire','Poem','Dubstep'];

	const name = ['Pryces','Soundroll','Bensound'];

	songs_obj.sound = songs;
	songs_obj.title = title;
	songs_obj.name = name;


	//for circle.js
	t = createGraphics(windowWidth, windowHeight);

	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();

	//place the circles in the setup phase.
	const physics = new Physics();
	physics.setup();

	//place the geometries in the setup phase.
	const geometry = new Three();
	geometry.setup();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Circle());
	vis.add(new Three());
	vis.add(new Physics());

	angleMode(DEGREES);

	sliderRange(0, 12, 1);
	gui = createGui('p5.gui');
	gui.setPosition(50, height-300);
	gui.addGlobals('bgColor','color_all');

	//create select box and display a menu
	sel = createSelect();
	sel.position(width-330, 40);
	for(let i = 0; i < vis.visuals.length; i++){
		sel.option(i+1+" : "+vis.visuals[i].name,[i]);
	}
	sel.changed(controls.menu);
}

function draw(){
	background(bgColor);
	translate(-width/2,-height/2,0);

	//each extension will always use one of these,
	//so you can call them from anywhere by preparing them in advance in sketch.js draw.
	spectrum = fourier.analyze();
	wave = fourier.waveform();
	level = amplitude.getLevel();
	bass = fourier.getEnergy( "bass",0.9);
	lowMid = fourier.getEnergy( "lowMid",0.9 );
	mid = fourier.getEnergy( "mid",0.9 );
	highMid = fourier.getEnergy( "highMid",0.9 );

	const color_energy = map(bass, 0, 255, 0, 150);

	//color change by gui select box
	switch(color_all) {
		case 'Purple':
			color_stroke = color(150, color_energy, 255);
			left_light = color(100, 0, 0); //red
			right_light = color(0, 0, 255); //blue
			break;

		case 'Blue':
			color_stroke = color(color_energy, 150, 255);
			left_light = color(0, 122, 100); //green
			right_light = color(0, 0, 255); //blue
			break;

		case 'Yellow':
			color_stroke = color(255, 255, color_energy);
			left_light = color(200, 0, 0); //red
			right_light = color(100, 255, 0); //yellow
			break;

		case 'Green':
			color_stroke = color(150, 255, color_energy);
			left_light = color(0, 255, 0); //green
			right_light = color(100, 255, 0); //yellow
			break;

		case 'Pink':
			color_stroke = color(255, color_energy, 255);
			left_light = color(200, 0, 0); //red
			right_light = color(200, 50, 255); //yellow
			break;

		default:
			color_stroke = color(150, color_energy, 255);
			left_light = color(100, 0, 0); //red
			right_light = color(0, 0, 255); //blue

	}

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
