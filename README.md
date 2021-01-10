# Web-Games-ES7
HTML5, CSS3, JavaScript (ES7 2017, ECMAScript 2017), WebGL &amp; GLSL, Audio &amp; Video Player, Blackjack 2021!



Below, see a copy of Blackjack.html

<!DOCTYPE html>

<!--

	*****************************************************
	*  													*
	*	Author:		James Marion Lynch			 		*
	*  	Date:		01-10-2020                          *
	* 	Version:	Alpha 1.0.0.0                      	*
	* 	Title:		Blackjack game		              	*
	*  	Filename:	Blackjack.html             			*
	* 	Language:	HTML5                          		*
	*                                                   *
	*****************************************************

	Notes: 
	
	This program scales with the window, so it is able
	to be played on any size screen, 100 inches diagonal,
	or down to your cell phone screen size. 
	I tested it on both my 43 inch TV hooked up to a Windows 10 Home laptop,
	and my cell phone screen, running Android 10.
	It uses viewport height, or viewport width for all that was px = pixel.
	vh = viewport height, vw = viewport width.
	Normally, people would use pixels like margin: 10px; this program says margin: 1vh;
	By me using vh & vw, it scales with the browser, from 25% to 500% it all looks the same.
	The only downside of this is you cannot scale the window.



	Dependencies:       		(Shown in load order.)
	Filenames:					Descriptions:

	Blackjack.html				The main HTML5 document (this file.)
	
	css/normalize.css			The Cascading Style Sheet (reset).
	css/style.css				The Cascading Style Sheet (specific.)
	
	img/Cards/*.png				52 card images.
	img/covers/*.jpg		    Audio music files for playlist.
	
	js/jquery.min.js			Helper Utility library
	js/math.min.js				class definitions for Vec3, Vec4, Mat4,...
	js/utils.js					Utility Helper library, geometry for Platonic solids.
	js/audio-player.js			The Audio Player jQuery program.
	js/Icosa.js	 				WebGL codes, GLSL shader programs, geo data sets it gets from above.
	js/Blackjack.js				class definitions for Player, hand, Card, Deck & Blackjack.
	
	res/movie.mp4				Place your file here of favorite movie.mp4
	res/*.mp3					Place your file here of favorite music.mp3 and edit this file.

	The head element has meta data, links external Style Sheets & JavaScript.
	The title element is mandatory per w3schools.com.
 -->
 
<html lang="en-US">
    <head>

		<!-- Meta-data is content type=text/html, encoding is utf-8, en-US, viewport size & limits.
			 page contents, all so Search Engines can better index the page.  -->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta name="viewport"    content="width=device-width, initial-scale=1" />
        <meta name="description" content="Blackjack Card Game, Audio & Video player." />
        <meta name="keywords"    content="HTML5, CSS3, JavaScript ES7 2017, WebGL, GLSL." />
        <meta name="author"      content="James M. Lynch." />
        <meta name="college"     content="Los Angeles Trade Tech College (LATTC)." />
		<meta name="professor"   content="Lin" />

		<!-- Link external Cascading Style Sheets to page. -->
        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/style.css" />

		<!-- Load external JavaScript program text files.  -->
		<script type="text/ecmascript" src="js/jquery.min.js"></script>
        <script type="text/ecmascript" src="js/math.min.js"></script>
        <script type="text/ecmascript" src="js/utils.js"></script>

		<!-- The title appears in browser tab. -->
		<title>JML 3D Studios, Blackjack 2021</title>

	<!-- The closing tag for the head element. -->
    </head>

	<!-- The opening tag for the body element which is mandatory in all HTML5 documents,
		 & shows the JavaScript function to run when the body element is through loading.  -->
    <body onload="setupWebGL();">

		<!-- The menu button container element @top of screen. -->
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
        
        <!-- The log history element shares screen space with below Audio Player element.  -->
        <div id="log_div" style="visibility: hidden"></div>

		<div id="audio-player">
		
			<!-- The clock is updated by setInterval() every second.  -->
			<div id="clock" title="Local time"></div>
		
			<!-- Audio Image (album covers)-->
			<div id="audio-image">
				<img class="cover" alt="Album covers and or Media Art">
				<p id="audio_title">Scroll down for controls!</p>
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
				<li song="music1.mp3" cover="albumn-cover-art-1.jpg" artist="Artist 1">Song-1</li>
				<li song="music2.mp3" cover="albumn-cover-art-2.jpg" artist="Artist 2">Song-1</li>
				<li song="music3.mp3" cover="albumn-cover-art-3.jpg" artist="Artist 3">Song-1</li>
				<li song="music4.mp3" cover="albumn-cover-art-4.jpg" artist="Artist 4">Song-1</li>
			</ul>
			
		<!-- End of Audio Player element.  -->
		</div>

		<!-- The canvas element to display the Icosahedron 3D WebGL content.  -->
        <canvas id="JML_canvas" title="Scroll wheel me to zoom!"></canvas>

		<!-- The parent element allows resize of the child elements width & height.  -->
		<div id="video_container" class="resizable" style="visibility:hidden;">
			<video id="video_element" style="visibility:hidden;" mute controls loop>
				<source src="res/movie.mp4" type="video/mp4" /> Your browser does not support HTML5 video.
			</video>
		</div>

		<!-- The title bar where output from the Arrow function sendMsg(msg) is displayed  -->
        <div id="title_bar"></div>

		<!-- Our card table elements. -->
        <div class="card_table" id="card_table_player"></div>
        <div class="card_table" id="card_table_player_split_hand"></div>
        <div class="card_table" id="card_table_dealer"></div>
        <div class="card_table" id="card_table_fullscreen"></div>

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
            <button type="button" id="cmd_toggle_log" onclick="cmdToggleLog();" title="Show log history?">View?</button>
        </div>
		
		<!--  The 32 background images for slideshow.  -->
		<div id="mySlideShow" class="w3-content w3-display-container">
			<img class="mySlides" src="img/Slides/slide(1).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(2).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(3).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(4).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(5).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(6).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(7).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(8).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(9).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(10).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(11).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(12).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(13).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(14).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(15).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(16).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(17).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(18).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(19).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(20).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(11).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(22).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(23).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(24).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(25).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(26).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(27).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(28).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(29).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(30).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(31).jpg" alt="an image load error">
			<img class="mySlides" src="img/Slides/slide(32).jpg" alt="an image load error">
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


