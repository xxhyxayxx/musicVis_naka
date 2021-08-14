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
		let value = sel.value();
		vis.selectVisual(vis.visuals[value].name);
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


