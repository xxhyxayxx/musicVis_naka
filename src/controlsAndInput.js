//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
ControlsAndInput = class{
	sel;
	
	menuDisplayed = false;

	text = 'Full Screen Mode'
	
	//playback button displayed in the top left of the screen
	playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	mousePressed = () => {
		//???
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
		this.playbackButton.hitCheck();

		this.playbackButton.backHitCheck();

		this.playbackButton.nextHitCheck()

		this.fullScreenHitcheck();


	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	keyPressed = (keycode) => {
		console.log(keycode);
		if(keycode === 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			const visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
	};

	//draws the playback button and potentially the menu
	draw = () => {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		this.playbackButton.draw();

		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			//text("Select a visualisation:", 100, 30);
			this.menu();
		}

		push();
		textSize(15);
		text(this.text, width-160, 53);
		noFill();
		stroke(255);
		strokeWeight(1);
		rect(width-175, 30, 145, 38, 50);
		pop();


		pop();

	};

	menu = () => {
		//draw out menu items for each visualisation
		//???

		let value = sel.value();
		vis.selectVisual(vis.visuals[value].name);

		// for(let i = 0; i < vis.visuals.length; i++){
		// 	// let button;
		// 	// button = createButton(vis.visuals[i].name, vis.visuals[i].name);
		// 	// button.position(20, 100 + i*50);
		//     // button.mousePressed(()  => this.test(i));
		// 	text((i + 1) + ":" + vis.visuals[i].name, 100, 70 + i * 50);
		// }
	};

	fullScreenHitcheck = () => {
		if(mouseX > width-175 && mouseX < width-175 + 145 && mouseY > 30 && mouseY < 30 + 38) {
			const fs = fullscreen();
			fullscreen(!fs);
			if(!fs){
				this.text = 'Exit Full Screen'
			}else{
				this.text = 'Full Screen Mode'
			}
		}
	}
}


