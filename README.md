<!DOCTYPE html>

<!--

	*****************************************************
	*  													*
	*	Author:		James Marion Lynch, CEO		 		*
    *   Corp.:      JML_3D_Studios                      *
	*  	Date:		02-17-2021                          *
	* 	Version:	Alpha 1.0.0.0                      	*
	* 	Title:		Audio, Blackjack, Video            	*
	*  	Filename:	Blackjack.html             			*
	* 	Language:	HTML5                          		*
	*                                                   *
	*****************************************************

	Notes: 
	
	This program scales with the window, so it is able
	to be played on any size screen, 100 inches diagonal,
	or down to your cell phone screen size. 
    
	I tested it on both my 43 inch TV HDMI cabled an Asus Rog String (Windows 10 Home) laptop,
	and my S21 Ultra Samsung 6.8 inch sreen, running Android 11 OS, 6 GB System RAM, 256 BG SSD.
	It uses viewport height, or viewport width for a way to size things in relation to screen.
	(vh = viewport height, vw = viewport width).
	Normally, people would use pixels, em, % or something else.
    like margin: 10px; this program says margin: 1vh;
	By using vh & vw, it scales with the browser, from 25% to 500% it all looks the same.
	The only downside of this is you cannot scale the window to zoom in or out.



	Dependencies:       		(Shown in load order.)
	Filenames:					Descriptions:

	Blackjack.html				The main HTML5 document (this file.)
	
	css/normalize.css			The Cascading Style Sheet (browsers all behave the same, found on github.com).
	css/style.css				The Cascading Style Sheet (specific, when fully devoloped, many style sheets will exist,
                                    so user can choose light or dark theme or other.
                                    This one file gives the entire game info on how to look and behave.)
	
	img/Cards/*.png				52 card images, example of a card filename image: Ace_Of_Hearts.png, Two_Of_Hearts.png, ...
                                Based on 4 suits and 13 types, numbered 0-3, 0-12.
                                Any card name is built from these 2 numbers and filename extension.
                                
	img/covers/media.art1.png	Audio music files for playlist (I included 4, but it accepts 10 easy).
    
    img/Slides/slide1.jpg
	img/Slides/slide2.jpg
	img/Slides/slide3.jpg
	img/Slides/slide4.jpg
	img/Slides/slide5.jpg
	img/Slides/slide6.jpg
	img/Slides/slide7.jpg		15 total background slides user can change with one button click
	
	jquery.min.js is free to use for anyone.
	js/jquery.min.js			Helper Utility library.
	
	I, James Marion Lynch, am said author of this MIT licensed code base.
	No frameworks are used, except to say one file that uses jquery.
	It is a collection of web pages, CSS, JavaScript99.5% of this code, written over a decade.
	wrote the 3D Graphics Library myself over a 10 year period.
	I used the JavaScript's (ES6) class keyword to create Vec3, Vec4, Mat4, Quat, Camera.
	All the classes inherit from the parent super class Float32Array[].
	Using the ES6 syntax and 2 keywords, we can inherit all the class behaviors.

	
	class Vec3 extends Float32Array
	{
		constructor(x = 0, y = 0, z = 0)
		{
		  super([x, y, z]);
		}

		// Accessors.
		get x() { return this[0]; }
		get y() { return this[1]; }
		get z() { return this[2]; }

		... many more methods, all the required ones.
		the file math.min.js is compressed, I will send anyone the uncompressed version.
		The file utils.js found in the /js/ folder is the mate to math.min.js.
		All programs in my collection use the same framework I created.
		Files normalize.css, style.css, jquery.min.js, math,min.js, utils.js,
		audio-player.js, Icosa.js, ... and more.

	}

	Notice 'this' self-reference is not used.
	If used, must appear after the super, it doesn't exist until that call.
	A call is made to the parent super class, along with the parameters.	
	This is how inheritance works, by getting a pointer to .prototype of parent.
	All the methods are stored on the .prototype object, not on the instance.
	This is done to keep the memory of each instance of an object down.
	
	NOTE: Every new class extends Object() so every class object has a common ancestor.
	This is how an array can hold all data types, they are all Object classes.
	Named a .prototype chain Vec3 has Object -- Float32Array[] -- Vec3().
	This is how all classes of Objects have a toString() function returning a string.
	To override Object.prototype.toString() method, add one to your class prototype.

	js/math.min.js

	js/utils.js					Utility Helper library, geometry for Platonic solids.
	js/audio-player.js			The Audio Player jQuery program.
	js/Icosa.js	 				WebGL codes, GLSL shader programs, geo data sets it gets from above.
	js/Blackjack.js				class definitions for Player, hand, Card, Deck & Blackjack.
	
	The movie is of my pet rat named: 'Blackie' who scampers about happy, as I spoil him.
	Therefore, the movie does not violate any Copyrights or Intellectual Property laws.
	
	res/movie.mp4				Place your file here of favorite movie.mp4
	
	The music files that come with the app are in the public domain.
	
	res/music1.mp3				Place your music.mp3 file in the folder named res = resources.
	res/music2.mp3				Place your music.mp3 file in the folder named res = resources.
	res/music3.mp3				Place your music.mp3 file in the folder named res = resources.
	res/music4.mp3				Place your music.mp3 file in the folder named res = resources.

    Here is a file packing list for you, aquired with a call to dir command,
	(from a dir.bat file I created, contents shown below.)
	
	dir /a:-d /s /b /o:n > "Dir list.txt"
	
	The output for dir is shown below:
	
	
	C:\Users\James Lynch>dir /?
	
	Displays a list of files and subdirectories in a directory.

	DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]
	  [/O[[:]sortorder]] [/P] [/Q] [/R] [/S] [/T[[:]timefield]] [/W] [/X] [/4]

	  [drive:][path][filename]
				  Specifies drive, directory, and/or files to list.

	  /A          Displays files with specified attributes.
	  attributes   D  Directories                R  Read-only files
				   H  Hidden files               A  Files ready for archiving
				   S  System files               I  Not content indexed files
				   L  Reparse Points             O  Offline files
				   -  Prefix meaning not
	  /B          Uses bare format (no heading information or summary).
	  /C          Display the thousand separator in file sizes.  This is the
				  default.  Use /-C to disable display of separator.
	  /D          Same as wide but files are list sorted by column.
	  /L          Uses lowercase.
	  /N          New long list format where filenames are on the far right.
	  /O          List by files in sorted order.
	  sortorder    N  By name (alphabetic)       S  By size (smallest first)
				   E  By extension (alphabetic)  D  By date/time (oldest first)
				   G  Group directories first    -  Prefix to reverse order
	  /P          Pauses after each screenful of information.
	  /Q          Display the owner of the file.
	  /R          Display alternate data streams of the file.
	  /S          Displays files in specified directory and all subdirectories.
	  /T          Controls which time field displayed or used for sorting
	  timefield   C  Creation
				  A  Last Access
				  W  Last Written
	  /W          Uses wide list format.
	  /X          This displays the short names generated for non-8dot3 file
				  names.  The format is that of /N with the short name inserted
				  before the long name. If no short name is present, blanks are
				  displayed in its place.
	  /4          Displays four-digit years

	Switches may be preset in the DIRCMD environment variable.  Override
	preset switches by prefixing any switch with - (hyphen)--for example, /-W.
	
	Output of the dir command shown below:
	
	Blackjack.html		(This file)
	Dir list.txt
	Dir.bat
	LICENSE
	README.md
	css\normalize.css
	css\style.css
	img\blackSquare.png
	img\li-img.png
	img\li-img-redSq.jpg
	img\whiteSquare.png
	img\Cards\Ace_of_clubs.png
	img\Cards\Ace_of_diamonds.png
	img\Cards\Ace_of_hearts.png
	img\Cards\ace_of_spades.png
	img\Cards\CardBack.jpg
	img\Cards\Eight_of_clubs.png
	img\Cards\Eight_of_diamonds.png
	img\Cards\Eight_of_hearts.png
	img\Cards\Eight_of_spades.png
	img\Cards\Five_of_clubs.png
	img\Cards\Five_of_diamonds.png
	img\Cards\Five_of_hearts.png
	img\Cards\Five_of_spades.png
	img\Cards\Four_of_clubs.png
	img\Cards\Four_of_diamonds.png
	img\Cards\Four_of_hearts.png
	img\Cards\Four_of_spades.png
	img\Cards\jack_of_clubs.png
	img\Cards\jack_of_diamonds.png
	img\Cards\jack_of_hearts.png
	img\Cards\jack_of_spades.png
	img\Cards\king_of_clubs.png
	img\Cards\king_of_diamonds.png
	img\Cards\king_of_hearts.png
	img\Cards\king_of_spades.png
	img\Cards\Nine_of_clubs.png
	img\Cards\Nine_of_diamonds.png
	img\Cards\Nine_of_hearts.png
	img\Cards\Nine_of_spades.png
	img\Cards\Queen_of_clubs.png
	img\Cards\Queen_of_diamonds.png
	img\Cards\Queen_of_hearts.png
	img\Cards\queen_of_spades.png
	img\Cards\Seven_of_clubs.png
	img\Cards\Seven_of_diamonds.png
	img\Cards\Seven_of_hearts.png
	img\Cards\Seven_of_spades.png
	img\Cards\Six_of_clubs.png
	img\Cards\Six_of_diamonds.png
	img\Cards\Six_of_hearts.png
	img\Cards\Six_of_spades.png
	img\Cards\Ten_of_clubs.png
	img\Cards\Ten_of_diamonds.png
	img\Cards\Ten_of_hearts.png
	img\Cards\Ten_of_spades.png
	img\Cards\Three_of_clubs.png
	img\Cards\Three_of_diamonds.png
	img\Cards\Three_of_hearts.png
	img\Cards\Three_of_spades.png
	img\Cards\Two_of_clubs.png
	img\Cards\Two_of_diamonds.png
	img\Cards\Two_of_hearts.png
	img\Cards\Two_of_spades.png
	img\covers\media.art1.jpg
	img\covers\media.art2.jpg
	img\covers\media.art3.jpg
	img\covers\media.art4.jpg
	img\Slides\slide1.jpg
	img\Slides\slide10.jpg
	img\Slides\slide11.jpg
	img\Slides\slide12.jpg
	img\Slides\slide13.jpg
	img\Slides\slide14.jpg
	img\Slides\slide15.jpg
	img\Slides\slide2.jpg
	img\Slides\slide3.jpg
	img\Slides\slide4.jpg
	img\Slides\slide5.jpg
	img\Slides\slide6.jpg
	img\Slides\slide7.jpg
	img\Slides\slide8.jpg
	img\Slides\slide9.jpg
	js\audio-player.js
	js\Blackjack.js
	js\Icosa.js
	js\jquery.min.js
	js\math.min.js
	js\utils.js
	res\movie.mp4
	res\music1.mp3
	res\music2.mp3
	res\music3.mp3
	res\music4.mp3


	The head element has meta data, links external Cascading Style Sheets & JavaScript.
	The <title>element</title> is mandatory per w3schools.com.
	
 -->

<html lang="en-US">

    <head>

        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta name="viewport"    content="width=device-width, initial-scale=1" />
        <meta name="description" content="Blackjack Card Game, Audio & Video player." />
        <meta name="keywords"    content="HTML5, CSS3, JavaScript ES7 2017, WebGL, GLSL." />
        <meta name="author"      content="James M. Lynch." />
        <meta name="college"     content="Los Angeles Trade Tech College (LATTC)." />
		<meta name="professor"   content="Albert Saryan" />

		<!-- Link external Cascading Style Sheets to page. -->
        <link rel="stylesheet" type="text/css" href="css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />

		<!-- Load external JavaScript program text files.  -->
		<script type="text/ecmascript" src="js/jquery.min.js"></script>
        <script type="text/ecmascript" src="js/math.min.js"></script>
        <script type="text/ecmascript" src="js/utils.js"></script>

		<title>JML 3D Studios, Blackjack 2021 writen in ES7 2017</title>

    </head>

    <body onload="setupWebGL();">

		
        <div id="menu_bar" class="menus">
			<button type="button" id="cmd_edit_name"    onclick="JML_Blackjack.player.cmdEditName();"  title="Edit your name?"></button> 
			<button type="button" id="bank"             onclick="JML_Blackjack.player.cmdResetBank();" title="Click to set bank $0.00"></button>
            <button type="button" id="cmd_slider_bet" title="Slider bets $5.00 to $1,000.00">
			 <input type="range"  id="cmd_change_bet"  onchange="JML_Blackjack.player.cmdChangeBet();" class="slider" min="5" max="1000" value="1000" />
            </button>
            <button type="button" id="cmd_slider_delay" title="Slider adjusts deal speed?">

				<input type="range" id="cmd_slider_deal_speed" onchange="JML_Blackjack.cmdSliderDealSpeed();" class="slider" min="10" max="2000" value="10" />
            </button>
            <select id="cmd_select_decks" onchange="JML_Blackjack.deck.cmdSelectDecks();" title="Select from 1 to 6 decks?">
                <option value="1">1 deck </option><option value="2">2 decks</option><option value="3">3 decks</option>
				<option value="4">4 decks</option><option value="5">5 decks</option><option value="6">6 decks</option>
            </select>
			<button type="button" id="cmd_show_deck"   onclick="JML_Blackjack.deck.cmdShowDeck();" title="Display a deck of cards?">Demo?</button>
			<button type="button" id="cmd_slide_left"  onclick="plusDivs(-1)"     title="Slide show left?">&#10094;</button>  
			<button type="button" id="cmd_slide_right" onclick="plusDivs(1)"      title="Slide show right?">&#10095;</button>  
           	<button type="button" id="cmd_full_screen" onclick="cmdFullScreen();" title="Full Screen Mode?" style="float: right;" >Mode?</button>
        </div>

        <div id="log_div" style="visibility: hidden"></div>

		<div id="audio-player">
		
			<div id="clock" title="Local time"></div>
		
			<div id="audio-image">
				<img class="cover" alt="Album covers and or Media Art">
				<p id="audio_title">Scroll down for Audio Player controls!</p>
			</div>

            <div id="audio-info">
				<p>Artist/Band:</p><span class="artist"></span>		
            </div>
			
			<div class="clearboth"></div>
			<br>&nbsp;	
			
			<p style="margin-left: 3vh; font-weight: bold;">Volume:
			
				<!-- Volume Control, your cursor keys control volume. -->
				<input id="audio_volume" class="slider" type="range" min="0" max="20" 
					   title="Slide right to increase volume, left decreases!" value="3" />
			</p>
				   
			<br>&nbsp;

			<div id="audio_bar" class="menus">
				<span>
					<button id="prev"  type="button" title="Previous song?">&#10094;</button>
					<button id="play"  type="button" title="Play song?">Play</button>
					<button id="pause" type="button" title="Pause song?">Pause</button>
					<button id="stop"  type="button" title="Stop song?">Stop</button>
					<button id="next"  type="button" title="Next song?">&#10095;</button>
				</span>
			</div>

            <div id="tracker">
				<span id="duration"></span>
			</div>

			<ul id="playlist" class="hidden" title="Click left mouse to select song?">
				<li song="music1.mp3" cover="media.art1.jpg" artist="Artist 1">Song-1</li>
				<li song="music2.mp3" cover="media.art2.jpg" artist="Artist 2">Song-2</li>
				<li song="music3.mp3" cover="media.art3.jpg" artist="Artist 3">Song-3</li>
				<li song="music4.mp3" cover="media.art4.jpg" artist="Artist 4">Song-4</li>
			</ul>
			
		</div>

        <canvas id="JML_canvas" title="Scroll wheel me to zoom!"></canvas>

		<div id="video_container" class="resizable" style="visibility:hidden;">
		
			<video id="video_element" style="visibility:hidden;" mute controls loop>
				<source src="res/movie.mp4" type="video/mp4" /> Your browser does not support HTML5 video.
			</video>
		</div>

        <div id="title_bar"></div>

        <div class="card_table" id="card_table_player"></div>
        <div class="card_table" id="card_table_player_split_hand"></div>
        <div class="card_table" id="card_table_dealer"></div>
        <div class="card_table" id="card_table_fullscreen"></div>

		<div id="displayProgress"></div>

		<div id="myProgress" style="visibility: hidden">

			<div id="myBar"></div>
		</div>

        <div id="task_bar" class="menus">
            <button type="button" id="cmd_deal"        onclick="JML_Blackjack.cmdDeal();" 		title="Deal the cards?">      Deal?</button>	
            <button type="button" id="cmd_stay"        onclick="JML_Blackjack.cmdStay();"	 	title="Stay?"        disabled>Stay?</button>	
            <button type="button" id="cmd_hit"         onclick="JML_Blackjack.cmdHit();" 		title="Hit?"         disabled>Hit?</button>
            <button type="button" id="cmd_double_down" onclick="JML_Blackjack.cmdDoubleDown();" title="Double down?" disabled>Double?</button>
            <button type="button" id="cmd_split_hand"  onclick="JML_Blackjack.cmdSplitHand();"  title="Split hand?"  disabled>Split?</button>
            <button type="button" id="cmd_cardtype"    onclick="cmdCardType();"                 title="Switch card type?">    Unicode?</button>
            
            
			<button type="button" id="cmd_opacity_btn" title="Slider changes opacity of video?">
			 <input type="range"  id="cmd_opacity"  onchange="cmdOpacity()" class="slider" min="1"  max="20" value="10"/>
			</button>
            <button type="button" id="cmd_toggle_vid" onclick="cmdToggleVid();" title="Play Pause Video">Video?</button>
<!--  
      
      <button type="button" id="cmd_progress_bar" onclick="cmdProgressBar();" title="Progress Bar">Test</button>  
      <button type="button" id="cmd_get_gps"      onclick="cmdGetGPS();"      title="Get GPS location?">GPS?</button>
      
-->
      
            <button type="button" id="cmd_toggle_log" onclick="cmdToggleLog();" title="Show log history?">View?</button>
            
        </div>

		<div id="mySlideShow" class="w3-content w3-display-container">
			<img class="mySlides" src="img/Slides/slide1.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide2.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide3.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide4.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide5.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide6.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide7.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide8.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide9.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide10.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide11.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide12.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide13.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide14.jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide15.jpg" alt="an image load error">
		</div>

		<script type="text/ecmascript" src="js/audio-player.js"></script>
		<script type="text/ecmascript" src="js/Icosa.js"></script>
        <script type="text/ecmascript" src="js/Blackjack.js"></script>

    </body>
</html>

