//displays and handles clicks on the playback button.
PlaybackButton = class{

	//the size of each button and the position
	playButton= {
		x:65,
		y:35,
		w:28,
		h:28
	}

	backButton= {
		x:20,
		y:40,
		w:20,
		h:20
	}

	nextButton = {
		x:115,
		y:40,
		w:20,
		h:20
	}

	//the index number of song's array
	num = 0;

	//flag to determine whether to buttons click and
	//to determine which icon to draw
	draw = () => {
		const play = this.playButton;
		const back = this.backButton;
		const next = this.nextButton;

		//draw back button
		push();
		rect(back.x, back.y, back.w-15, back.h);
		triangle(back.x+20, next.y+back.h, back.x -15 + back.w, back.y + back.h/2, back.x+20, back.y);
		pop();

		//draw play or pause button
		if(playing){
			rect(play.x, play.y, play.w/2 - 2, play.h);
			rect(play.x + (play.w/2 + 2), play.y, play.w/2 - 2, play.h);
		}
		else{	
			triangle(play.x, play.y, play.x + play.w, play.y + play.h/2, play.x, play.y+play.h);
		}

		//draw next button
		push();
		rect(next.x+15, next.y, next.w-15, next.h);
		triangle(next.x, next.y+back.h, next.x - 5 + next.w, next.y + next.h/2, next.x, next.y);
		pop();

		//draw song title and name
		push();
		textSize(20);
		const songTitle = songs_obj.title[this.num];
		const singerName = songs_obj.name[this.num];
		text(songTitle, 180, 56);
		textSize(15);
		text(singerName, 180, 86);
		pop();
	};

	//checks for clicks on the button, starts or pauses playback.
	//@returns true if clicked false otherwise.
	hitCheck = () => {
		const play = this.playButton;
		const currentSong = songs_obj.sound;

		if(mouseX > play.x && mouseX < play.x + play.w && mouseY > play.y && mouseY < play.y + play.h){
			if (currentSong[this.num].isPlaying()) {
				currentSong[this.num].pause();
  			} else {
				currentSong[this.num].loop();
  			}
  			playing = !playing;
  			return true;
		}
			return false;
	};

	//checks for clicks on the back button
	//if it's true, the index of the song's array is subtracted by one, and the previous song will play.
	backHitCheck = () => {
		const back = this.backButton;
		const currentSong = songs_obj.sound;

		if(mouseX > back.x && mouseX < back.x + back.w && mouseY > back.y && mouseY < back.y + back.h){
			if(this.num > 0 && playing){
				currentSong[this.num].stop();
				this.num --;
				currentSong[this.num].loop();
			}else if(this.num > 0 && !playing){
				currentSong[this.num].stop();
				playing = true;
				this.num --;
				currentSong[this.num].loop();
			}
		}
	};

	//checks for clicks on the next button
	//if it's true, the index of the song's array is added by one, and the next song will play.
	nextHitCheck = () => {
		const next = this.nextButton;
		const currentSong = songs_obj.sound;
		const song_num = currentSong.length-1;

		if(mouseX > next.x && mouseX < next.x + next.w && mouseY > next.y && mouseY < next.y + next.h){
			if(this.num < song_num && playing){
				currentSong[this.num].stop();
				this.num ++;
				currentSong[this.num].loop();
			}else if(this.num < song_num && !playing){
				currentSong[this.num].stop();
				playing = true;
				this.num ++;
				currentSong[this.num].loop();
			}
		}
	}

}