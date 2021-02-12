# Web-Games-ES7
HTML5, CSS3, JavaScript (ES7 2017, ECMAScript 2017), WebGL &amp; GLSL, Audio &amp; Video Player, Blackjack 2021!

 <!DOCTYPE html>

<!--

	According to the w3.org, who determine the specs of all web languages,
	the <!DOCTYPE html> above should be the first line of code for a well formed document.
	
	From w3schools.com: 
	
		Definition and Usage
		All HTML documents must start with a <!DOCTYPE> declaration.

		The declaration is not an HTML tag. It is an "information" to the browser about what document type to expect.


	World Wide Web Consortium (Standards organization) w3.org
	
		The World Wide Web Consortium is the main international standards organization for the World Wide Web. 
		Founded in 1994 and currently led by Tim Berners-Lee, the consortium is made up of member organizations 
		that maintain full-time staff working together in the development of standards for the World Wide Web. Wikipedia
		
		Founder: 		Tim Berners-Lee
		Founded: 		October 1, 1994
		CEO: 			Jeffrey M. Jaffe (Mar 8, 2010–)
		Director: 		Tim Berners-Lee (author of HTML, which is why hyperlinks let us click to the next webpage!)
		Purpose: 		Developing protocols and guidelines that ensure long-term growth for the Web
		Formation: 		1 October 1994; 26 years ago
	
	About 429 world wide web consortium members from corporations form the board that decides future languages,
	what goes in and what does not, (w3.org has collected all our info).
	
	 
	
	The corporations are all listed, if you want to see who they are, search "wiki.com w3c.org"
	
	Microsoft, Google, Samsung, ... 429 corps as of 02-01-2021.


	*****************************************************
	*  													*
	*	Author:		James Marion Lynch, CEO		 		*
    *   Corp.:      JML_3D_Studios                      *
	*  	Date:		02-12-2021                          *
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
	css/style.css				The Cascading Style Sheet (specific codes to display size, color, special effects.
	
	img/Cards/*.png				52 card images, example of a card filename image: Ace_Of_Hearts.png, Two_Of_Hearts.png, ....
                                Based on 4 suits and 13 types, numbered 0-3, 0-12.
                                Any card name is built from these 2 numbers and filename extension.
								Cards are created with the JavaScript code inside Blackjack.js,
								using the class keyword, along with classes, Hand, Deck, Player and Blackjack.
								A nice touch was allowing the player to switch between the image files and Unicode characters.
								An image file is about 50,000 bytes, whereas Unicode characters are 4 bytes each.
								If a person has an old low power device, it will move 4 bytes versus 50,000 bytes, per card!
								Whatever memory overhead per class Card() object is the same for either type.
								The Unicode character set is huge, billions of characters or symbols, they name it in astral planes! 
                                
	img/covers/*.png			Audio music files for playlist (10).
    
    img/Slides/slide1.jpg		A background image, (1 thru 15) 2, 3, 4,  ... .jpg
	
	js/jquery.min.js			Helper Utility library
	js/math.min.js				class definitions for Vec3, Vec4, Mat4,...
	js/utils.js					Utility Helper library, geometry for Platonic solids.
	js/audio-player.js			The Audio Player jQuery program.
	js/Icosa.js	 				WebGL codes, GLSL shader programs, geo data sets it gets from above.
	js/Blackjack.js				class definitions for Player, Hand, Card, Deck & Blackjack.
	
	res/movie.mp4				Place your favorite movie.mp4
	res/*.mp3					Place your favorite mp3 files, edit this file.




    Dir output from batch file program;
	
	Blackjack.html
	
	Cascading Style Sheets
	
	css\normalize.css
	css\style.css

	Playing Card Images
	
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
	
	The Albumn covers or media art
	
	img\covers\arlo-gunthrie.png
	img\covers\beach-boys.png
	img\covers\blue-ocean.jpg
	img\covers\golden-ocean.jpg
	img\covers\h2r.jpg
	img\covers\janis-joplin.jpg
	img\covers\joe-walsh.jpg
	img\covers\led-zeppelin.jpg
	img\covers\love-songs.jpg
	img\covers\oldies.jpg
	img\covers\pink-floyd.jpg
	img\covers\pink-floyd-sae.jpg
	img\covers\vortex.png
	
	for the 16 background images you can change
	
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
	
	Our JavaScript files
	
	js\audio-player.js
	js\Blackjack.js
	js\Icosa.js
	js\jquery.min.js
	js\math.min.js
	js\utils.js
	
	Music files *.mp3 & movie.mp4, res = resources
	
	res\amazing-grace.mp3
	res\Bring It On Home.mp3
	res\Coming Into Los Angeles.mp3
	res\lifes-been-good.mp3
	res\Money.mp3
	res\movie.mp4
	res\papa-loved-momma.mp3
	res\Piece Of My Heart.mp3
	res\Respect.mp3
	res\Time.mp3
	res\When A Man Loves A Woman.mp3
	res\Whole Lotta Love.mp3

 -->

<html lang="en-US">

    <head>

<!-- 
		
		Meta-data is content type="text/html", encoding is utf-8, language is English, USA, viewport size & limits,
		page contents, all so Search Engines can better index the page.
		
		The head element has meta data, links external Cascading Style Sheets & JavaScript.
		The <title>element</title> is mandatory per w3schools.com.	 
			 
-->

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

		<!-- The title appears in browser tab. -->
		<title>JML 3D Studios, Blackjack in ES7 2017, circa 02-10-2021</title>

	<!-- The closing tag for the head element. -->
    </head>

	<!-- The opening tag for the body element which is mandatory in all HTML5 documents,
		 & shows the JavaScript function to run when the body element is through loading.  -->

    <body onload="setupWebGL();">

		<!-- The menu_bar button container element @top of screen. -->
        <div id="menu_bar" class="menus">
			<button type="button" id="cmd_edit_name"    onclick="JML_Blackjack.player.cmdEditName();"  title="Edit your name?"></button> 
			<button type="button" id="bank"             onclick="JML_Blackjack.player.cmdResetBank();" title="Click to set bank $0.00"></button>
            <button type="button" id="cmd_slider_bet" title="Slider bets $5.00 to $1,000.00">
			 <input type="range"  id="cmd_change_bet"  onchange="JML_Blackjack.player.cmdChangeBet();" class="slider" min="5" max="1000" value="1000" />
            </button>
            <button type="button" id="cmd_slider_delay" title="Slider adjusts deal speed?">
			
				<!--  The speed is in milliseconds, from 10 to 2000 is max 2 seconds delay. -->
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
        
        <!-- The log history element shares screen space with Audio Player element.  -->
        <div id="log_div" style="visibility: hidden"></div>

		<div id="audio-player">
		
			<!-- The clock is updated by setInterval() every second.  -->
			<div id="clock" title="Local time"></div>
		
			<!-- Audio Image (album covers)-->
			<div id="audio-image">
				<img class="cover" alt="Album covers and or Media Art">
				<p id="audio_title">Scroll down for Audio Player controls!</p>
			</div>

			<!-- Audio information. -->
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

			<!-- The Audio menu container element. -->
			<div id="audio_bar" class="menus">
				<span>
					<button id="prev"  type="button" title="Previous song?">&#10094;</button>
					<button id="play"  type="button" title="Play song?">Play</button>
					<button id="pause" type="button" title="Pause song?">Pause</button>
					<button id="stop"  type="button" title="Stop song?">Stop</button>
					<button id="next"  type="button" title="Next song?">&#10095;</button>
				</span>
			</div>

            <!-- Tracker Audio View -->
            <div id="tracker">
				<span id="duration"></span>
			</div>

			<ul id="playlist" class="hidden" title="Click left mouse to select song?">
				<li song="amazing-grace.mp3" 			cover="pink-floyd.jpg"    artist="Judy Collins">   Amazing Grace</li>
				<li song="Money.mp3" 					cover="pink-floyd.jpg" 	  artist="Pink Floyd">     Money</li>
				<li song="Time.mp3" 					cover="pink-floyd.jpg" 	  artist="Pink Floyd">     Time</li>
				<li song="papa-loved-momma.mp3" 		cover="vortex.png" 		  artist="Garth Brooks">   Papa Loved Momma</li>
				<li song="Respect.mp3" 					cover="pink-floyd.jpg"    artist="Aretha Franklin">Respect</li>
				<li song="Coming Into Los Angeles.mp3" 	cover="arlo-gunthrie.png" artist="Arlo Gunthrie">  Coming Into Los Angeles</li>
				<li song="Whole Lotta Love.mp3" 		cover="led-zeppelin.jpg"  artist="Led Zepplin">    Whole Lotta Love</li>
				<li song="Piece Of My Heart.mp3" 		cover="golden-ocean.jpg"  artist="Janis Joplin">   Piece Of My Heart</li>
				<li song="When A Man Loves A Woman.mp3" cover="pink-floyd.jpg" 	  artist="Percy Sledge">   When A Man Loves A Woman</li>
				<li song="lifes-been-good.mp3" 			cover="joe-walsh.jpg" 	  artist="Joe Walsh">      Lifes Been Good</li>
			</ul>
			
		<!-- End of Audio Player element.  -->
		</div>

        <canvas id="JML_canvas" title="Scroll wheel me to zoom!"></canvas>

		<!-- The parent element allows resize of the child elements width & height.  -->
		<div id="video_container" class="resizable" style="visibility:hidden;">
			<video id="video_element" style="visibility:hidden;" mute controls loop>
				<source src="res/movie.mp4" type="video/mp4" /> Your browser does not support HTML5 video.
			</video>
		</div>

		<!-- The title bar where output from the Arrow function sendMsg(msg) is displayed.  -->
        <div id="title_bar"></div>

		<!-- Our card table elements. -->
        <div class="card_table" id="card_table_player"></div>
        <div class="card_table" id="card_table_player_split_hand"></div>
        <div class="card_table" id="card_table_dealer"></div>
        <div class="card_table" id="card_table_fullscreen"></div>
        
        
        <!-- The progress bar percentage is displayed in this div element. -->
		<div id="displayProgress"></div>

		<!-- The progress bar container div element. -->
		<div id="myProgress" style="visibility: hidden">

			<!-- The progress bar div element. -->
			<div id="myBar"></div>
		</div>

		<!-- The menu button container element @bottom of screen. -->
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
      
      <button type="button" id="cmd_progress_bar" onclick="cmdProgressBar();" title="Progress Bar">Test</button>  save code  
      <button type="button" id="cmd_get_gps"      onclick="cmdGetGPS();"      title="Get GPS location?">GPS?</button>
      
-->
      
            <button type="button" id="cmd_toggle_log" onclick="cmdToggleLog();" title="Show log history?">View?</button>
            
        </div>

		<!--  The 16 background images for slideshow.  -->
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

		<!-- The scripts I want loaded last.  -->
		<script type="text/ecmascript" src="js/audio-player.js"></script>
		<script type="text/ecmascript" src="js/Icosa.js"></script>
        <script type="text/ecmascript" src="js/Blackjack.js"></script>

	<!-- The closing tag of the body element.  -->
    </body>

<!-- The closing tag of the html document.  -->
</html>

<!-- eof -->
