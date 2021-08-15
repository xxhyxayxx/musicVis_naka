//Class to handle the onscreen menu, keyboard and mouse
//controls
ControlsAndInput = class{
	sel;
	
	menuDisplayed = false;

	text = 'Full Screen Mode'
	
	//playback button displayed in the top left of the screen
	playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	mousePressed = () => {
		//check if the play button, next button, back button, and full-screen button have been clicked
		this.playbackButton.hitCheck();

		this.playbackButton.backHitCheck();

		this.playbackButton.nextHitCheck()

		this.fullScreenHitcheck();
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
			this.menu();
		}

		//draw the full-screen button
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

	//the music visualizer screen will switch depending on the value selected in the select box.
	menu = () => {
		let value = sel.value();
		vis.selectVisual(vis.visuals[value].name);
	};

	//when the full-screen button is clicked, the screen will go into full-screen mode,
	//and the text on the button will also change.
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


