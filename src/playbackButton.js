//displays and handles clicks on the playback button.
PlaybackButton = class{
	
	x = width/2;
	y = height-40;
	width = 20;
	height = 20;

	backX = width/2-60;
	backY = height-40;
	backWidth = 20;
	backHeight = 20;

	nextX = width/2+70;
	nextY = height - 40;
	nextWidth = 20;
	nextHeight = 20;

	num = 2;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw

	draw = () => {
		push();

		rect(this.backX, this.backY, this.backWidth-15, this.backHeight);
		triangle(this.backX+20, this.backY+this.backHeight, this.backX -15 + this.backWidth, this.backY + this.backHeight/2, this.backX+20, this.backY);
		pop();

		if(playing){
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}

		push();
		rect(this.nextX, this.nextY, this.nextWidth-15, this.nextHeight);
		triangle(this.nextX-15, this.nextY+this.backHeight, this.nextX - 19 + this.nextWidth, this.nextY + this.nextHeight/2, this.nextX-15, this.nextY);
		pop();
	};

	//checks for clicks on the button, starts or pauses playback.
	//@returns true if clicked false otherwise.
	hitCheck = () => {
		//console.log(songs[this.num].test);
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (songs[this.num].isPlaying()) {
    			songs[this.num].pause();

  			} else {
    			songs[this.num].loop();
  			}
  			playing = !playing;
  			return true;
		}
			return false;
	};

	backHitCheck = () => {
		if(mouseX > this.backX && mouseX < this.backX + this.backWidth && mouseY > this.backY && mouseY < this.backY + this.backHeight){
			console.log(songs[this.num]);
			console.log(this.num);
			if(this.num > 0 && playing){
				songs[this.num].stop();
				this.num --;
				songs[this.num].loop();
			}else if(this.num > 0 && !playing){
				songs[this.num].stop();
				playing = true;
				this.num --;
				songs[this.num].loop();
			}
			// else if(this.num === 0){
			// 	songs[this.num].stop();
			// 	this.num = 2;
			// 	songs[this.num].loop();
			// }
			return true;
		}
		return false;
	};

	nextHitCheck = () => {
		if(mouseX > this.nextX && mouseX < this.nextX + this.nextWidth && mouseY > this.nextY && mouseY < this.nextY + this.nextHeight){
			if(this.num < 2 && playing){
				songs[this.num].stop();
				this.num ++;
				songs[this.num].loop();
			}else if(this.num < 2 && !playing){
				songs[this.num].stop();
				playing = true;
				this.num ++;
				songs[this.num].loop();
			}
			// else if(this.num === 2){
			// 	songs[this.num].stop();
			// 	this.num = 0;
			// 	songs[this.num].loop();
			// }
			console.log(this.num);
			return true;
		}
		return false;
	}

}