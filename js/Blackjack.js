

	/****************************************************
	*  													*
	*	Author:		James Marion Lynch, CEO		 		*
    *   Corp.:      JML_3D_Studios                      *
	*  	Date:		02-02-2021                          *
	* 	Version:	Alpha 1.0.0.0                      	*
	* 	Title:		Audio, Blackjack, Video            	*
	*  	Filename:	Blackjack.js             			*
	* 	Language:	JaveScript                    		*
	*                                                   *
	*****************************************************

The folders for files;
	
	css/*.css
	img/covers/*.png, *.jpg
	img/Cards/*.png
	img/Slides/slide-*.jpg
	js/*.js
	res/*.mp3, *.mp4
	
	
	Dependencies:       		(Shown in load order.)
	Filenames:					Descriptions:

	Blackjack.html				The main HTML5 document.
	
	css/normalize.css			The Cascading Style Sheet (reset).
	css/style.css				The Cascading Style Sheet (specific.)
	
	img/Cards/*.png				52 card images.
	img/covers/*.png/jpg		Audio music files for playlist.
	
	js/jquery.min.js			Helper Utility library
	js/math.min.js				class definitions for Vec3, Vec4, Mat4,...
	js/utils.js					Utility Helper library, geometry for Platonic solids.
	js/audio-player.js			The Audio Player jQuery program.
	js/Icosa.js	 				WebGL codes, GLSL shader programs, geo data sets it gets from above.
	js/Blackjack.js				class definitions for Player, hand, Card, Deck & Blackjack. (this file).
	
	res/movies.mp4				Place your file here of favorite movie.mp4
	res/*.mp3					Place your file here of favorite music.mp3 and edit this file.

**************************************************

	Notes:
	
	
	
	
	
	
**************************************************/




logEvent("Entering file 'js/Blackjack.js', the class definition file for many playing card game classes.");
logEvent("Player, Hand, Card, Deck & Blackjack classes.");


// Define constants for Hand class. 
const 	BLACKJACK = 21,
		TYPE_ACE  = 12,

// Define constants for Player class
    	NEW_BANK = 0,
		MAX_PLAYER_NAME = 12,
		MIN_HAND_NUM = 0,
		MAX_HAND_NUM = 1,
		MIN_BET = 5,
		MAX_BET = MIN_BET * 200;

class Player
{
	/// This constructor() will be called when you create a new instance of the class.
	constructor(strName = 'Player', tableID = 'card_table_player')
	{
		logEvent("Program entered class Player() constructor function.");
		
		this._bank = NEW_BANK;				// bank is empty to start.
		this._bet = MIN_BET;				// bet starts at MIN_BET.
		this._handNum = MIN_HAND_NUM;		// The currently active hand number.
		this.hands = [new Hand(this)];  	// new Hand(this) pass a reference as a parameter.
		this.strName = strName;				// Players name.
		this._savedBet = 0;					// Save bet to restore after double down or split hand.
		this.tableID = tableID;

		if (typeof(Storage) !==  undefined && strName !== 'Dealer')
		{
			// Get players bank & strName previously used, if any?
			this._bank = parseFloat(localStorage.getItem('players_bank'));
            if (Number.isNaN(this._bank))
            {
                this._bank = 0;
                localStorage.setItem('players_bank', 0);
            }
			this.strName = localStorage.getItem('players_name');
		}
		
		// Update the bank, bet and name for player only.
		if (this.strName !== 'Dealer')
		{
			document.getElementById('bank').innerHTML = '$' + this.bank.toFixed(2);
			document.getElementById('cmd_edit_name').innerHTML = this.strName;
			this.bet = parseFloat(document.getElementById('cmd_change_bet').value);
		}
	}

	// Getter & setters go below the constructor function.
	get bet()
	{ 
		return this._bet; 
	}
	
	set bet(value)
	{
		// Player may have doubled down or split a hand while betting the MAX_BET already, allow double max bet.
		// We set the bet within a MIN_BET & MAX_BET range each Hand().
		this._bet = setValue(value, MIN_BET, MAX_BET  * 2);
	}

	get bank()
	{ 
		return this._bank;
	}
	
	set bank(value)
	{
		// Set the bank to value passed in.
		// Test to determine if value is a number type.
		if (typeof(value) === 'number')
		{
			this._bank = value;
		}
		else
		{
			logEvent('Invalid type passed into set bank accessor.');
		}
	}

	get handNum()
	{
		return this._handNum; 
	}
	
	set handNum(value)
	{ 
		this._handNum = setValue(value, MIN_HAND_NUM, MAX_HAND_NUM); 
	}

	cmdEditName()
	{
		// Prompt user for player name?
		let playerName = prompt('Please enter your player name (12 chars limit)?'); 

		// Will be true if user enters one or more characters & did not cancel.
		if (playerName)
		{	
			// Limits to 12 characters and removes leading & trailing blank spaces
			playerName = playerName.substring(0, MAX_PLAYER_NAME).trim();

			// If your browser supports local site storage, save bank between play.
			if (typeof(Storage) !== 'undefined')
			{	
				// Store player's name to keep persistent between each session (each time you use program)
				localStorage.setItem('players_name', playerName);
			}

			logEvent(this.strName + ' changed name to: ' + playerName);
			this.strName = playerName;

			// Get the element by id.
			let btn = document.getElementById('cmd_edit_name');

			// It exists if not equal to a null value.
			if (btn)
			{
				btn.innerHTML = this.strName;
				btn.focus = false;
			}
		}
	}
	

	// Called from HTML select element.
	cmdChangeBet()
	{
		// Safety code so player cannot change bet in the middle of a hand.
		if (JML_Blackjack.hasDealt === true) return;

		// Get input element by id.
		const e = document.getElementById('cmd_change_bet');
		
		// select element exists if not equal to a null value.
		if (e)
		{
			// Pass it through the objects setter which keeps it between MIN_BET & MAX_BET * 2 values
			this.bet = parseFloat(e.value);
			this._savedBet = this.bet;

			// Log the event.
			logEvent(this.strName + ' changed bet to $' + this.bet.toFixed(2));
		
			// Release the select element focus on the page.
			e.focus = false;
		}
		else
		{
			logEvent('input element for cmdChangeBet() not found in HTML5 file?');
		}
	}
    
    cmdResetBank()
    {
		logEvent("User entered cmdRestBank method of Player().");
		
        this._bank = 0;
        document.getElementById("bank").innerHTML = "$0.00";
        if (typeof(Storage) !==  undefined)
		{
            localStorage.setItem('players_bank', 0);
		}
    }

	resetPlayer()
	{
		logEvent("Program entered resetPlayer method of Player().");
		
		// Reference objects need to be set to null to release memory.
		for (let hand of this.hands)
		{
			// Loop through Hand()'s in the Array calling resetHand()
			hand.resetHand();
		}
		
		// Create a new Array & pass 'this' Player reference parameter.
		this.hands = [new Hand(this)];
		
		// Active hand number 1 or 2.
		this._handNum = MIN_HAND_NUM;
		
		// We verify bet is within range, player may have doubled down or split hand into 2 hands both cases double bet.
		// In the setter we allow a double of MAX_BET, lets set bet within range.
		this._bet = setValue(this._bet, MIN_BET, MAX_BET);
	}
}

// ***************    class Hand definition    **************************
class Hand
{
	// Reference to an instance of Player
	constructor(plr = null)
	{
		logEvent("Program entered class Hand() constructor function.");
		
		this.bet = MIN_BET;
		this._savedBet = MIN_BET;
		this.cards = [];			// Store the Card()'s in this Array 
		this.player = null;			// Points to no player object.
		
		// If an instance of a Player class object was passed into the constructor, use it.
		if (plr instanceof Player) 
		{
			this.bet = plr.bet;
			this._savedBet = plr._savedBet;
			this.player = plr;
		}
	}

	// Returns the blackjack value of hand (there may be other games?)
	get blackjackValue()
	{
		let value = 0;
		for (let card of this.cards)
		{
			value += card.intValue;
		}
		if (value > 21)
		{
			let aces = this.countType(TYPE_ACE);
			while (aces > 0 && value > 21)
			{
				value -= 10;
				aces--;
			}
		}
		return value;
	}

	get isActive(){ return !(this.isBusted || this.isBlackjack || this.isFiveCardMonty); }
	get isBlackjack(){ return this.cards.length === 2 && this.blackjackValue === BLACKJACK; }
	get isBusted(){	return this.blackjackValue > BLACKJACK; }
	get isFiveCardMonty(){ return this.cards.length === 5 && this.blackjackValue <= BLACKJACK; }
	get isSplittable(){ return this.cards.length === 2 && this.cards[0].intType === this.cards[1].intType; }

	resetHand()
	{
		for (let card of this.cards)
		{	
			// Release reference objects.
			card = null;
		}

		// After releasing memory create a new Array[] with literal notation.
		this.cards = [];

		if (this.player instanceof Player)
		{
			this.bet = this.player.bet;
		}	
	}
	
	// returns a count of cards in hand matching the suit passed in.
	countSuit(suit = 0)
	{	
		// 0-3 values accepted for 4 suits of cards.
		let counter = 0;
		for (let card of this.cards)
		{
			if (card.intSuit === suit)
			{
				counter++;
			}
		}
		return counter;
	}
	
	// returns a count of cards in hand matching the type passed in.
	countType(type = 0)
	{
		// 0-12 values accepted for 13 types of cards.
		let counter = 0;
		for (let card of this.cards)
		{
			if (card.intType === type)
			{
				counter++;
			}
		}
		return counter;
	}	
}

// Define constants for Card class.
const STR_HIDDEN     = 'hidden',
	  STR_VISIBLE    = 'visible',
	  MIN_CARD_INDEX = 0,
	  MAX_CARD_INDEX = 51,
	  CARD_SPACING   = 10,
	  MIN_CUT        = 10,
	  MAX_CUT        = 30,
	  MIN_DECKS      = 1,
	  MAX_DECKS      = 6,
	  SHUFFLE_X		 = 10,
	  MIN_DELAY      = 10,
	  MAX_DELAY      = 3000,
      
/*

    Below is the syntax used to create an Array literal, this avoids a call to Array(),
    which is a function with more overhead than below literal syntax.
    I use to speed up the program a bit more.

*/     
      
	  COLOR_ARRAY    = ['black', 'red', 'red', 'black'],
	  SUIT_ARRAY     = ['clubs', 'diamonds', 'hearts', 'spades'],
	  SYMBOL_ARRAY   = ['&#9827', '&#9830', '&#9829', '&#9824'],
	  TYPE_ARRAY_1   = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten','Jack', 'Queen', 'King', 'Ace'],
	  TYPE_ARRAY_2   = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
      
/*

    There are 52 playing card symbols in the Unicode set of Characters or Symbols.
    There are also Jokers, Backs, and so many symbols you could never ;earn them all!
    This has a huge memory savings versus *.png files, which are 50,000 bytes in size on average.
    A Unicode Character Symbol uses 2 bytes of memory be card for the image it looks like.
    Just Google "Unicode Playing Card Symbols" The chess pieces use Unicode Charaters to save memory.
    Memory saving of 25,000 times per card means a very low power device could better play the game.
    (look on WiKi for info on Unicode chars., 1, 2, 3, 4, a, b, c, A, B, C, ...)
    In the early days of computing there was an ASCII set of characters, 128 of them, 7 bits per character.
    Next the extended set of ASCI character came out, doubling the character count to 256!
    Unicode is so vast it is broken up into planes of symbols! 
    Remember, the Chinese alphabet is about 3,000 characters.
    (Unicode was designed to never run out of space I hear.)
    

*/
      
      
      
	  UNICODE_PLAYING_CARDS	= [
	"&#127186;", "&#127187;", "&#127188;", "&#127189;", "&#127190;", "&#127191;", "&#127192;", "&#127193;", "&#127194;", "&#127195;", "&#127197;", "&#127198;", "&#127185;",
	"&#127170;", "&#127171;", "&#127172;", "&#127173;", "&#127174;", "&#127175;", "&#127176;", "&#127177;", "&#127178;", "&#127179;", "&#127181;", "&#127182;", "&#127169;",
	"&#127154;", "&#127155;", "&#127156;", "&#127157;", "&#127158;", "&#127159;", "&#127160;", "&#127161;", "&#127162;", "&#127163;", "&#127165;", "&#127166;", "&#127153;",
	"&#127138;", "&#127139;", "&#127140;", "&#127141;", "&#127142;", "&#127143;", "&#127144;", "&#127145;", "&#127146;", "&#127147;", "&#127149;", "&#127150;", "&#127137;"   ];


var gblCardCounter  = 0,
	gblUnicodeCards = false;

class Card
{
	constructor(index = MIN_CARD_INDEX, visible = STR_VISIBLE)
	{
		
		logEvent("Program entered class Card constructor() function.");
		
		// Insure card index is a positive integer with 0-51 values.
		index = Math.floor(Math.abs(index));					    // create a positive integer.
		index = setValue(index, MIN_CARD_INDEX, MAX_CARD_INDEX);	// 0-51 card index.
		this.id = 'guid-' + gblCardCounter++;
		this.index = index;
		this.intSuit = Math.floor(index / 13);						// 0-3, clubs, diamonds, hearts, spaces.
		this.intType = Math.floor(index % 13);						// 0-12 types, 13 x 4 = 52, 12 is an ace.
		this.intValue = this.intType + 2;							// 2 through 14;
		if (this.intValue === 14)
		{															// Ace is 14 & valued @11, may change to 1.
			this.intValue = 11;
		}
		else if (this.intValue > 9)
		{
			this.intValue = 10;
		}
		this.strChar     = TYPE_ARRAY_2[this.intType];
		this.strColor    = COLOR_ARRAY[this.intSuit];
		this.strSuit     = SUIT_ARRAY[this.intSuit];
		this.strType     = TYPE_ARRAY_1[this.intType];
		this.strTitle    = this.strType + '_of_' + this.strSuit;
		this.strFilename = this.strTitle + ".png";
		this.strSymbol   = SYMBOL_ARRAY[this.intSuit];
		this.strHTML     = this.strSymbol + '<br>' + this.strChar + '<br> ' + this.strSymbol;
		this.strUnicode  = UNICODE_PLAYING_CARDS[this.index];
	
		let div = document.createElement("div");
		div.innerHTML = this.strUnicode;
		div.id = this.id;
        
        // visibility is only allowed to be 'hidden' or 'visible'.
        // Below is called an immediate if statement. (iff) in some languages, and that is no type.
		div.style.visibility = (visible === STR_HIDDEN) ? STR_HIDDEN : STR_VISIBLE;
		
		let strColor = (this.strColor === "red") ? "card-red" : "card";
		div.classList.add(strColor);
		
        // What get's stored here is a pointer to the original class Object().
        // This does not make a deep copy of a new Object.
        // Any class your create 
		this.cardDiv = div;
		this.isOnTable = false;
		
		// Create a screen image HTML element.
		this.imgElement = document.createElement('img');
		this.imgElement.style.visible = (visible === STR_HIDDEN) ? STR_HIDDEN : STR_VISIBLE;
		
		// The card width & height are in the class & other SS3 variables.
		this.imgElement.className = "card";
		this.imgElement.id = this.id;
		this.imgElement.draggable = true;
		this.imgElement.src = 'img/Cards/' + this.strTitle + '.png';
		
	}
 
    // By default the Player passes no arguments, unless player splits his hand into 2.
    // There is a small logic error which stops you from hitting after splitting.
    draw(id = 'card_table_player', visible = STR_VISIBLE)
	{
		let strID = id.toLowerCase();
		switch (strID){
			case 'card_table_player':
			case 'card_table_dealer':
			case 'card_table_player_split_hand':
				break;
			default:
				strID  = 'card_table_fullscreen';
		}
		const cardTable = document.getElementById(strID);
		if (cardTable)
		{
			if (gblUnicodeCards)
			{
				this.cardDiv.style.visibility = (visible === STR_HIDDEN) ? STR_HIDDEN : STR_VISIBLE;
				cardTable.appendChild(this.cardDiv);
				this.isOnTable = true;
			}
			else
			{
				this.imgElement.style.visible = (visible === STR_HIDDEN) ? STR_HIDDEN : STR_VISIBLE;
				cardTable.appendChild(this.imgElement);
			}
		}
	}
	
	toString=()=> this.strTitle;
}

class Deck
{
	constructor(numDecks = MIN_DECKS)
	{
		
		logEvent("Program entered class Deck() constructor function.");
		
		// Array will hold discards from Player()'s Hand()'s
		this.discards = [];
		
		// The Deck of cards literal Array stored as a single integer each.
		// One deck has 52 elements from 0-51.
		this.indices = [];
		
		// Private variables.
		this._cardCut = MIN_CUT;
	//	this._cardsDealt = 0;
		
		// Store an initial value.
		this._numDecks = MIN_DECKS;
		
		// numDecks passed into this constructor gets passed thru an accessor,
		// which limits values allowed to MIN_DECKS to MAX_DECKS constants
		// It stores the value into this._numDecks
        
		this.numDecks = numDecks;
		
		// We loop through the number of decks desired 1-6
		for (let d=0; d<this._numDecks; d++)
		{
			for (let i = 0; i<52; i++)
			{
				this.indices.push(i);			
			}
		}
	}
	
	// Get/Set accessor functions.
	get cardCut() { return this._cardCut; }
	get numDecks() { return this._numDecks; }
	set cardCut(value) { this._cardCut = setValue(value, MIN_CUT, MAX_CUT);	}
	set cardsDealt(value) { this._cardsDealt = value; }
	set numDecks(value) { this._numDecks = setValue(value, MIN_DECKS, MAX_DECKS); }

	cmdShuffle()
	{
		// We will log an error to our logEvent here.
		if (this.indices.length < 2) return;	// No need to shuffle 1 or 2 cards.
		
		logEvent('Cards are being cmdShuffle();');
		
		//Declare & initialize local variables.
		let	len = this.indices.length,
			len1 = 0,
			len2 = 0,
			temp = 0,
			loops = len * SHUFFLE_X;
		
		for (let i=0; i<loops; i++)
		{
			do 
			{
				len1 = rand(len);
				len2 = rand(len);
			} while(len1 === len2);
		
			// We swap only index integers not Card() Objects.
			temp = this.indices[len1];
			this.indices[len1] = this.indices[len2];
			this.indices[len2] = temp;
		}
	}

	// Called from HTML select element.
	cmdSelectDecks()
	{
		if (JML_Blackjack.hasDealt) return;

		// Get select element by id.
		const e = document.getElementById('cmd_select_decks');
		
		// e exists is not equal to null.
		if (e)
		{
			// Convert the string data into Integer data type
			let	numDecks = parseInt(e.value, 10);	
			
			JML_Blackjack.deck = new Deck(numDecks);
			JML_Blackjack.deck.cmdShuffle();
			logEvent('Decks changed to ' + numDecks);
			e.focus = false;
		}
		else
		{
			logEvent('select element for cmdSelectDecks() not found in *.html?');
		}
	}

	// Display one deck of cards on screen.
	cmdShowDeck()
	{
		// Get element by id.
		const e = document.getElementById('cmd_show_deck');
		
		// If div was found it will not be equal to a null value.
		if (e)
		{
            // Clear the tables.
            JML_Blackjack.clearTables();
            
			// Assign an event listener Arrow ()=> function.
			e.onclick=()=> JML_Blackjack.deck.cmdHideDeck();
		
			// Change what the innerHTML says.
			e.innerHTML = 'Stop?';
	
			// Loop through 0-51 indexes class Card() accepts.
			for (let i=0; i<52; i++)
			{
				// We pass in the index & id of the table element we wish cards draw as child elements.
				new Card(i).draw('card_table_fullscreen');
			}

			// Remove focus from this element.
			e.focus = false;
		}
	}

	cmdHideDeck()
	{
		// Remove the deck being displayed.
		JML_Blackjack.clearTables();

		// Get element by id.
		const e = document.getElementById('cmd_show_deck');

		// If div was found it will not be equal to a null value.
		if (e)
		{
			// Assign an event listener Arrow ()=> function.
			e.onclick=()=> JML_Blackjack.deck.cmdShowDeck();

			// Change what the innerHTML says.
			e.innerHTML = 'Demo?';
			
			// Remove focus form this element.
			e.focus = false;
		}
	}
}

class Blackjack
{
	// This function gets executed when you create an instance of the class
	constructor()
	{
		
		logEvent("Program entered class Blackjck() constructor function.");
		
		this.player = new Player();
		this.dealer = new Player("Dealer", "card_table_dealer");
		this.deck = new Deck();
		this.deck.cmdShuffle();
		this.delay = MIN_DELAY;
		this.handNumber = 0;
		this.hasDealt = false;
		this.handCounter = 0;
		
		let strName = this.player.strName;
		
		// Log the date & time player opened page.
		logEvent(strName + " started: " + Date());
		
		// Load the players name in the cmd_edit_name
		let btn = document.getElementById("cmd_edit_name");
		if (btn)
		{
			btn.innerHTML = strName;
		}
	}
	
	get getScrHgt() { return screen.availHeight; }
	get getScrWdt() { return screen.availWidth;  }

	cmdDeal()
	{
		
		logEvent("User clicked cmdDeal() method of class Blackjack().");
		
		if (this.hasDealt === true) return;

		this.hasDealt = true;
        disableButton("cmd_deal");
		this.handNumber = MIN_HAND_NUM;
		this.hideMenubar();
		this.clearScreen();
		this.dealer.resetPlayer();
		this.player.resetPlayer();
		
		let bet = "  Bet $" + this.player.bet.toFixed(2);
		logEvent("<br>*** Hand #" + ++this.handCounter + bet + " ***");
		document.getElementById("title_bar").innerHTML = bet;
		document.getElementById("bank").innerHTML = "$" + this.player.bank.toFixed(2);
		document.getElementById("cmd_deal").focus = false;

		setTimeout(()=> JML_Blackjack.nextCard(), this.delay + MIN_DELAY);
		setTimeout(()=> JML_Blackjack.nextCard("card_table_dealer"), this.delay * 2 + MIN_DELAY);
		setTimeout(()=> JML_Blackjack.nextCard(), this.delay * 3 + MIN_DELAY);
		setTimeout(()=> JML_Blackjack.nextCard("card_table_dealer"), this.delay * 4 + MIN_DELAY);
		setTimeout(()=> JML_Blackjack.testHandsAfterDeal(), this.delay * 5 + MIN_DELAY);
	}

	nextCard(tableID = "card_table_player",  visible = "visible", handNum = MIN_HAND_NUM)
	{
		logEvent("Program entered nextCard() method of class Blackjack().");
		
		if (this.deck.indices <= ((this.deck.numDecks * 52) - 15))
		{
			logEvent("Shuffling " + this.deck.numDecks + " decks of cards.");
			this.deck = new Deck(this.deck.numDecks);
			this.deck.cmdShuffle();
		}

        handNum = setValue(handNum, MIN_HAND_NUM, MAX_HAND_NUM);
        
		let plr = (tableID === "card_table_dealer") ? this.dealer : this.player,
            card = new Card(this.deck.indices.pop()),
			hand = plr.hands[handNum],
			cards = hand.cards;
        
		card.draw(tableID, visible);
		cards.push(card);

		let msg = " " + plr.strName + " @" + hand.blackjackValue;

		if (cards.length > 1)
		{
			document.getElementById("title_bar").innerHTML +=  msg;
		}
		logEvent(msg);
	}

	testHandsAfterDeal()
	{
		
		logEvent("Program entered testHandsAfterDeal() method of class Blackjack().");
		
		let dHand = this.dealer.hands[0],
			dVal = dHand.blackjackValue,
			dBJ = dHand.isBlackjack,
			pHand = this.player.hands[0],
			pVal = pHand.blackjackValue,
			pBJ = pHand.isBlackjack;

		if (dBJ === true || pBJ === true)
		{
			let msg = " Blackjack 21!";
			
			if (dBJ === true && pBJ == true)
			{
				msg = "Dealer & Player both have" + msg;
			}
			else if (dBJ === true)
			{
				msg = "Dealer has" + msg;
			}
			else
			{
				msg = "Player has" + msg;
			}
			document.getElementById("title_bar").innerHTML += msg;
			logEvent(msg);
			this.cmdStay();
		}
		else
		{
			enableButton("cmd_stay");
			enableButton("cmd_hit");
			enableButton("cmd_double_down");
			if (pHand.isSplittable === true)
				enableButton("cmd_split_hand");
		}
	}

	cmdStay()
	{
		logEvent("Program entered cmdStay() method of class Blackjack().");
		
		if (!this.hasDealt) return;
        
		let plr = JML_Blackjack.player,
			hands = plr.hands,
			hand = hands[this.handNumber],
			msg = " " + plr.strName + " ";

		msg += (hand.isBusted) ? "busts" : "stays";
		msg += " @" + hand.blackjackValue;
		logEvent(msg);
		document.getElementById("title_bar").innerHTML += msg;
			
		if (this.handNumber === 1)
		{
            this.handNumber++;
		}
		else
		{
			this.hideTaskbar();
			let activeHands = false, h = 0, len = hands.length;

			for (h = 0; h<len; h++)
			{
				if (hands[h].isActive === true)
				{
					activeHands = true;
				}
			}

			if (activeHands === true)
			{
				setTimeout(()=> JML_Blackjack.hitDealer(), this.delay);
			}
			else
			{
				this.scoreHands();
			}
		}
  		document.getElementById("cmd_stay").focus = false;
	}

	cmdHit()
	{
		logEvent("User clicked cmdHit() method of class Blackjack().");
		
		if (!this.hasDealt) return;
		
        disableButton("cmd_double_down");
        disableButton("cmd_split_hand");

        let hand = this.player.hands[this.handNumber];

        document.getElementById("cmd_hit").focus = false;
            
        if (hand.isBusted || hand.isFiveCardMonty)
        {
            JML_Blackjack.cmdStay();
        }
        else
        {
            if (JML_Blackjack.handNumber === 0)
            {
                JML_Blackjack.nextCard();        // Get the player another Card();
            }
            else                                            // Get the players split hand another Card();
            {
               JML_Blackjack.nextCard("card_table_player_split_hand", "visible", 1);
            }

            // See if player must stay!
            if (hand.isBusted || hand.isFiveCardMonty)
            {
                JML_Blackjack.cmdStay();
            }
        } 
	}

	cmdDoubleDown()
	{
		
		logEvent("User clicked cmdDoubleDown() method of class Blackjack().");
		
        if (!this.hasDealt) return;
        
		disableButton("cmd_double_down");
		if (this.player.hands[0].cards.length !== 2)
		{
			logEvent(this.player.strName + " called cmdDoubleDown() incorrectly.");
			return;
		}

		let plr = this.player,
			pHand = plr.hands[0],
			cards = pHand.cards;

		logEvent("<br>" + plr.strName + " doubles down.<br>");
		plr.bet *= 2;
       	document.getElementById("cmd_double_down").focus = false;
		this.cmdHit();
		this.cmdStay();
	}

	// Called from <button type="button" id="cmd_split_hand" onclick="cmdSplitHand();">Split Hand?</button>
	cmdSplitHand()
	{
		
		logEvent("User clicked cmdSplitHand() method of class Blackjack().");
		
        if (!this.hasDealt) return;

		disableButton("cmd_split_hand");
		if (!this.player.hands[0].isSplittable)
		{
			logEvent(this.player.strName + " called cmdSplitHand() incorrectly.");
			return;
		}

		// Create local pointers to reference objects.
		let plr = this.player,	 		// player
			hands = plr.hands[0],		// players hand
			cards = hands.cards,		// players cards in his hand
			card0 = cards[0],			// player 1st card
			card1 = cards[1];			// player 2nd card

		let img = document.getElementById(card1.imgElement.id);
		if (img)
		{
			logEvent(plr.strName + " splits " + card0.strHTML);
			plr.bet *= 2;
			img.parentNode.removeChild(img);
			let dummy = plr.hands[0].cards.pop();
			this.nextCard();
			plr.hands.push(new Hand(plr));
			plr.hands[1].cards.push(card1);
			card1.draw("card_table_player_split_hand");
			this.nextCard("card_table_player_split_hand", "visible", 1);
			dummy = null;
		}
        document.getElementById("cmd_split_hand").focus = false;
	}

	cmdSliderDealSpeed()
	{
		
		logEvent("User clicked cmdSliderDealSpeed() method of class Blackjack().");
		
		let e = document.getElementById("cmd_slider_deal_speed"),
		    tmpDelay = parseInt(e.value, 10);

		logEvent("Blackjack class method cmdSliderDealSpeed() changed to " + tmpDelay + " milliseconds!");
		this.delay = setValue(tmpDelay, MIN_DELAY, MAX_DELAY);
		e.focus = false;
	}

	hitDealer()
	{
		
		logEvent("Program entered hitDealer() method of class Blackjack().");
		
		let plr = this.player,
			pHand = plr.hands, 
			msg = "",
			hands = plr.hands;
		
		if ((this.handNumber === 0 && !hands[0].isBusted || !hands[0].isFiveCardMothy) ||
			(this.handNumber === 1 && !(hands[0].isBusted && hands[1].isBusted) || !(hands[0].isFiveCardMothy && hands[1].isFiveCardMothy)))
		{
			let hand = this.dealer.hands[0];

			while (hand.blackjackValue <= 16)
			{
				msg = " Dealer hits => " + hand.blackjackValue;
				logEvent(msg);
				document.getElementById("title_bar").innerHTML += msg;
				this.nextCard("card_table_dealer");
				msg = " Dealer ";
				msg += (hand.isBusted) ? "busts" : "stays";
				msg += " @" + hand.blackjackValue;
				logEvent(msg);
				document.getElementById("title_bar").innerHTML += msg;
			}
		}
		this.scoreHands();
	}
	
	scoreHands()
	{
		
		logEvent("Program entered scoreHands() method of class Blackjack().");

		let dlr = this.dealer,
			dHand = dlr.hands[0],
			dVal = dHand.blackjackValue,
			dBJ = dHand.isBlackjack,
			i = 0,
			plr = this.player,
			hands = plr.hands,
			pHand = null,
			pName = " " + plr.strName + " ",
			pVal = 0,
			pBJ = false,
			msg = "",
			rate = 1,
			lose = false,
			win = false;

		for (i= 0; i<=this.handNumber; i++)
		{
			pHand = hands[i];
			pVal = pHand.blackjackValue;
			pBJ = pHand.isBlackjack;
			msg = "";
			rate = 1;
			lose = false;
			win = false;

			if (pHand.isBusted)
            {
				msg = pName + "busts @" + pVal;
				lose = true;
			}
            else if (dBJ && pBJ)
            {
				msg = pName + "ties dealer, Blackjack! ";
			}
            else if (dBJ)
            {
				msg = "Dealer has Blackjack! ";
				lose = true;
			}
            else if (pBJ)
            {
				rate = 1.5;
				msg = pName + "has Blackjack! ";
				win = true;
			}
            else if (dHand.isBusted)
            {
				msg = "Dealer busts @" + dVal;
				win = true;
			}
            else if (pHand.isFiveCardMonty)
            {
				msg = pName + "has Five Card Monty => " + pVal;
				win = true;
			}
            else if (dVal > pVal)
            {
				msg = "Dealer has " + dVal;
				lose = true;
			}
            else if (dVal < pVal)
            {
				msg = pName +  " has " + pVal;
				win = true;
			}
			logEvent(msg);
			msg = pName + " ";
			if (win)
			{
				plr.bank += plr.bet * rate;
				msg +=  "wins $" + plr.bet * rate;
			}
			else if (lose)
			{
				plr.bank -= plr.bet;
				msg += "loses $" + plr.bet;
			}
			else 
			{
				msg += "Ties!";
			}

			msg += " Dealer @" + dVal;
			logEvent(msg);
			document.getElementById("title_bar").innerHTML += " " + msg; 
			document.getElementById("bank").innerHTML = "$" + plr.bank.toFixed(2);
		
			if (typeof(Storage) !== "undefined")
			{	
				localStorage.setItem("players_bank", plr.bank.toFixed(2));
			}
		}

		enableButton("cmd_slider_bet");
		enableButton("cmd_select_decks");
		disableButton("cmd_stay");
		disableButton("cmd_hit");
		disableButton("cmd_double_down");
		disableButton("cmd_split_hand");
		enableButton("cmd_show_deck");
		enableButton("cmd_deal");
		this.handNumber = MIN_HAND_NUM;
		this.hasDealt = false;
	}

	clearScreen()
	{	
	
		logEvent("Program entered clearScreen() method of class Blackjack().");

		this.clearTables();
		this.hideTaskbar();
	}

	clearTables()
	{

		logEvent("Program entered clearTables() method of class Blackjack().");

		document.getElementById("title_bar").innerHTML = "";
		document.getElementById("card_table_dealer").innerHTML = "";	
		document.getElementById("card_table_player").innerHTML = "";
		document.getElementById("card_table_player_split_hand").innerHTML = "";
		document.getElementById("card_table_fullscreen").innerHTML = "";
	}

	hideMenubar()
	{
		logEvent("Program entered hideMenubar() method of class Blackjack().");

		disableButton("cmd_slider_bet");
		disableButton("cmd_select_decks");
	}

	hideTaskbar()
	{
		
		logEvent("Program entered hideTaskbar() method of class Blackjack().");
		
		disableButton("cmd_deal");
		disableButton("cmd_stay");
		disableButton("cmd_hit");
		disableButton("cmd_double_down");
		disableButton("cmd_split_hand");
		disableButton("cmd_show_deck");
	}
}

// This prevents tampering with our Object.
Object.freeze(Player, Hand, COLOR_ARRAY, SUIT_ARRAY, TYPE_ARRAY_1, TYPE_ARRAY_2, UNICODE_PLAYING_CARDS, Card, Deck, Blackjack);

// This attaches a single instance of the class Blackjack to the html document window.
window.JML_Blackjack = new Blackjack();

// end of file Blackjack.js
