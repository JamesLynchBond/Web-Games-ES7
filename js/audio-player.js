


	/****************************************************
	*  													*
	*	Author:		James Marion Lynch			 		*
	*  	Date:		01-03-2021                          *
	* 	Version:	Alpha 1.0.0.0                      	*
	* 	Title:		Audio Player w/Playlist            	*
	*  	Filename:	js/audio-player.js            		*
	* 	Language:	JavaScript/jquery.js           		*
	*                                                   *
	*****************************************************
    
    Notes: jQuery


*/


const AUDIO_FOLDER = "res/",
	  IMAGE_FOLDER = "img/covers/",
	  VOLUME_INPUT_MAX = 20,
	  TEN_SECONDS = 10,
	  ONE_HUNDRED_PERCENT = 100,
	  NO_TIME = 0;

var audio;

$('#pause').hide();

initAudio($('#playlist li:first-child'));

function initAudio(e) {
    var song = e.attr('song');
    var title = e.text();
    var cover = e.attr('cover');
    var artist = e.attr('artist');
    
    // Create audio object
    audio = new Audio(AUDIO_FOLDER + song);
    
    // Insert audio info
    $('.artist').text(artist);
    $('.title').text(title);
    
    // Insert cover
    $('img.cover').attr('src', IMAGE_FOLDER + cover);
    
    // Highlight selected song
    $('#playlist li').removeClass('active');
    e.addClass('active');
}

//	Play Button
$('#play').click(function() {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    showDuration();
});

//	Pause Button
$('#pause').click(function() {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

//	Stop Button
$('#stop').click(function() {
    audio.pause();
    audio.currentTime = 0;
});

//	Next Button
$('#next').click(function() {
    audio.pause();
    var next = $('#playlist li.active').next();
    
    if(next.length == 0) {
        next = $('#playlist li:first-child');
    }
    
    initAudio(next);
    audio.play();
    showDuration();
});

//	Prev Button
$('#prev').click(function() {
    audio.pause();
    var prev = $('#playlist li.active').prev();
    
    if(prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    
    initAudio(prev);
    audio.play();
    showDuration();
});

//	Song Click
$('#playlist li').click(function() {
    audio.pause();
    initAudio($(this));
    $('#play').hide();
    $('#pause').show();
    audio.play();
    showDuration();
});

// Stop Button
$('#stop').click(function() {
    audio.pause();
    audio.currentTime = 0;
});

// Volume Control
$('#audio_volume').change(function() {
   audio.volume = parseFloat(this.value / VOLUME_INPUT_MAX); 
});

// Time/Duration & Progress Bar
function showDuration() {
    $(audio).bind('timeupdate', function() {
        //Get hours and minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt(audio.currentTime / 60) % 60;
        
        if(s < 10) {
            s = '0' + s;
        }
        
        $('#duration').html(m + ':' + s);
		
		
		
/*		
        var value = 0;

        if(audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        
        $('#progress').css('width', value + '%');
		
*/

    });
}
