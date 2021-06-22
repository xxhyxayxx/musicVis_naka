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

var Engine = Matter.Engine,
	//Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Composite = Matter.Composite;

let engine,boxy,composite,ground,a,top_wall,left,right;
let boxes = [];

let ball;
let level,value_s;

let box_arry, num_box;


function preload(){
	sound = loadSound('assets/sound/stomper_reggae_bit.mp3');
	font = loadFont('assets/fonts/Roboto-Regular.ttf');
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

	 engine = Engine.create();
	 composite = engine.world;
	 Engine.run(engine);
	 boxy = new Physics_box(200,100,50,50);
	 ground = Bodies.rectangle(0, height, width*2, 100, { isStatic: true });
	 top_wall = Bodies.rectangle(0, 0, width*2, 20, { isStatic: true });
	 left = Bodies.rectangle(0,0,20,30,{ isStatic: true });
	 right = Bodies.rectangle(750,210,20,300,{ isStatic: true })
	 //ball = Bodies.circle(200,200,20);
	 //Composite.add(composite, [ground,ball,left,right,top]);
	 Composite.add(composite, [ground,top_wall,left,right]);

	box_arry = []
	num_box = 250;

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

}

function draw(){
	background(0);
	translate(-width/2,-height/2,0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
	// for(i = 0; i < boxes.length; i++){
	// 	boxes[i].show();
	// }
	//ellipse(ball.position.x,ball.position.y,20);
	//boxy.show;
	//fourier.analyze();
	//level = amplitude.getLevel();
	//value_s = level*-0.1
	//console.log(boxes);
	//boxy.show();
}

function mouseClicked(){
	controls.mousePressed();
}

function mouseDragged(){
	//boxes.push(new Physics_box(mouseX, mouseY, 20, 20));
}

function keyPressed(){
	controls.keyPressed(keyCode);
	//console.log(level * -0.1);
	// for(i = 0; i < boxes.length; i++){
	// 	boxes[i].mova();
	// 	console.log(boxes[i]);
	// }

	//Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0, y: -0.05});

}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
