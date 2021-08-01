//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
ControlsAndInput = class{
	
	menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	mousePressed = () => {
		//???
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
		if(!this.playbackButton.hitCheck()){
			//const fs = fullscreen();
			//fullscreen(!fs);
		}

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

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation:", 100, 30);
			this.menu();
		}	
		pop();

	};

	menu = () => {
		//draw out menu items for each visualisation
		//???
		for(let i = 0; i < vis.visuals.length; i++){
			text((i + 1) + ":" + vis.visuals[i].name, 100, 70 + i * 50);
		}
	};
}


