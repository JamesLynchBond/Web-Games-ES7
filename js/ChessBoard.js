 
 
 
    /****************************************************
    *  													*
    *	Author:		James Marion Lynch			 		*
    *  	Date:		01-10-2021                          *
    * 	Version:	Alpha 1.0.0.0                      	*
    * 	Title:		Chess game   			         	*
    *  	Filename:	js/ChessBoard.js           			*
    * 	Language:	ES7 2017                       		*
    *                                                   *
    *****************************************************
    *  
    *  Dependencies:
    *  Filenames:			Description
    *
    *  ChessBoard.html		            The main web page document.
    *  normalize.css		            The Cascading Style Sheet (reset).
    *  style.css			            The Cascading Style Sheet (specific.)
    *  math.js				            The class definition file for Camera, Vec3, Vec4, Quat, Mat4, (3D graphics library.)
    *  utils.js			                A Utility lib. of functions, setupWebGL() called ChessBoard.html onload event handler.
    *  ChessBoard.js                    The class definition file for class Chessboard & Square
    *
    *
    *	Properties on instance:          data type:
    *
    *   this._boardSize                  integer
    *   this._squareSize                 integer
    *   this._blackSquare                new Image() black square
    *   this._whiteSquare                new Image() white square
    *	this.drawCharPieces				 true (default)
    *	this.moves                       literal Array()
    *	this.squares                     literal Array()
    *	this.canvas;                     HTML5 element
    *	this.gl;                         canvas.getContext('2d');
    *
    *
    *	accessors:
    *
    *   get boardSize                    integer
    *	get strBrd                       string
    *	get squareSize                   integer
    *
    *	ChessBoard.prototype methods:
    *
    *	drawBoard()				         draws the board & pieces. Border, box-shadow & padding done with CSS3.
    *	createPiece(strChar)	         creates the chess pieces based on strChar p r n b q k  P R N B Q K
    *	loadStrBrd(strBrd = NEW_STR_BRD) load pieces onto chessboard (squares[ ]) Array.
    *	loadFullStrTitles()				 gives new board piece 32 specific title names. (WhiteQueenRookPawn.) 
    *	isValidStrBrd(strBrd)			 returns a bool true or false (validates strBrd is good.)
    *	cmdPlayGame()					 start the chain reation!
    *	cmdQuitGame()					 clean up & call shutdown()
    *
    *   the clock div gets set in utils.js if it exists in ChessBoard.html?
    *
    *	class Piece() is the abstract base class which never gets instantiated.
    *	class Pawn, Rook, Knight, Bishop, King & Queen all extends Piece.
    *	Piece extends Object without coding it; all Objects spring from Object.
    *
    *	The prototype chain of inheritance starts with Object => Piece => onto all chess pieces.
    *	Object is the base class for all JavaScript objects.
    *   (Future versions will have Piece inherit form Obj3, making all Piece decendants 3D objects).
    *
    *   white pawn = 'p' = 0, rook = 'r' = 1, knight = 'n' = 2, bishop = 'b' = 3, queen = 'q' = 4, king = 'k' = 5; 			0-5
    *   black pawn = 'P' = 6, rook = 'R' = 7, knight = 'N' = 8, bishop = 'B' = 9, queen = 'Q' = 10, king = 'K' = 11; 		6-11
    *
    *	indexes into CHESS_PIECES_UNICODE array shown above.
    *	generic piece is 0-5 above.
    *	when you add (6 * team) you get team character upper or lower case (team = 0 or 1).
    *   The 8888 is 32 empty squares in the center of board.
    *
    *
    * * *   FEN = Forsyth Edwards Notation   * * *

    Forsyth–Edwards Notation (FEN) is a standard notation for describing a particular board position of a chess game.
    The purpose of FEN is to provide all the necessary information to restart a game from a particular position.
    FEN is based on a system developed by Scottish newspaper journalist David Forsyth.

    A FEN "record" defines a particular game position, all in one text line and using only the ASCII character set.
    A text file with only FEN data records should have the file extension ".fen".

    A FEN record contains six fields. The separator between fields is a space. The fields are:

    Piece placement (from White's perspective). Each rank is described, starting with rank 8 and ending with rank 1; 
    within each rank, the contents of each square are described from file "a" through file "h". 

    Following the Standard Algebraic Notation (SAN), each piece is identified by a single letter taken from the standard:
    English names (pawn = "P", knight = "N", bishop = "B", rook = "R", queen = "Q" and king = "K").

    White pieces are designated using upper-case letters ("PNBRQK") while black pieces use lowercase ("pnbrqk"). 
    Empty squares are noted using digits 1 through 8 (the number of empty squares), and "/" separates ranks.

    Active color. "w" means White moves next, "b" means Black moves next.

    Castling availability. If neither side can castle, this is "-". 
    Otherwise, this has one or more letters: 

    "K" (White can castle kingside)
    "Q" (White can castle queenside)
    "k" (Black can castle kingside)
    "q" (Black can castle queenside)

    A move that temporarily prevents castling does not negate this notation.

    En passant target square in algebraic notation. If there's no en passant target square, this is "-".
    If a pawn has just made a two-square move, this is the position "behind" the pawn.
    This is recorded regardless of whether there is a pawn in position to make an en passant capture.

    Halfmove clock: This is the number of halfmoves since the last capture or pawn advance. 
    The reason for this field is that the value is used in the fifty-move rule.

    Fullmove number: The number of the full move. It starts at 1, and is incremented after Black's move.

    Examples:

    The following example is from the FEN specification:
    Here's the FEN for the starting position:

    rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    After the move 1. e4:

    rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
    Then after 1. ... c5:

    rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2
    Then after 2. Nf3:

    rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2

 */

const MIN_SQUARE_INDEX = 0,
      MAX_SQUARE_INDEX = 63,
      NUMBER_OF_COLUMNS = 8,
      INNER_BORDER_COLOR = "black",
      INNER_BORDER_THICKNESS = 1,
      STRING_CHARACTERS = "prnbqkPRNBQK",	
      SCREEN_MULTIPLE = 0.55,
      NEW_STR_BRD = "rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR",
      whiteSquareIndices = [ 0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 59, 61, 63 ],
      CHESS_PIECES_FILENAMES = [ "WhitePawn", "WhiteRook", "WhiteBishop", "WhiteKnight", "WhiteQueen", "WhiteKing", "BlackPawn", "BlackRook", "BlackBishop", "BlackKnight", "BlackQueen", "BlackKing" ],
      CHESS_PIECES_FILENAMES_SIMPLE = [ "wP", "wR", "wB", "wN", "wQ", "wK", "bP", "bR", "bB", "bN", "bQ", "bK" ],
      CHESS_PIECES_UNICODE = [ "\u2659", "\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u265F", "\u265C", "\u265E", "\u265D", "\u265B", "\u265A" ];

function drawScene() {}	// a dummy function called from 'js/utils.js'

// A Square for any board game, in this case a 64 Square chessboard (8x8) grid.
class Square
{
	constructor(index = MIN_SQUARE_INDEX)
	{
        // MIN_SQUARE_INDEX = 0, MAX_SQUARE_INDEX = 63, (0-63) values allowed, no jokers yet.
		this.index = setValue(Math.floor(index), MIN_SQUARE_INDEX, MAX_SQUARE_INDEX);
		this.piece = null;
		this.scrX = 0;
		this.scrY = 0;
	}

	get col(){ return Math.floor(this.index / NUMBER_OF_COLUMNS); }
	get row(){ return Math.floor(this.index % NUMBER_OF_COLUMNS); }
	get strColor(){ return (whiteSquareIndices.indexOf(this.index) >= 0) ? WHITE_SQUARE_COLOR : BLACK_SQUARE_COLOR; }
    get isEmpty() { return this.piece === null; }
}

// The ChessBoard() class definition.
class ChessBoard
{
	constructor()
	{
        if (canvas === null || gl === null) return;

		this.gameStarted = false;

		let size = Math.floor((Math.min(screen.height, screen.width) * SCREEN_MULTIPLE) / NUMBER_OF_COLUMNS);

		this._squareSize = size;
        this._boardSize = size * NUMBER_OF_COLUMNS;

		let width = this._boardSize;
		canvas.width = width;
		canvas.height = width;

        this.canvas = canvas;
        this.gl = gl;
        this.moves = [];
        this._blackSquare = new Image(size, size);
        this._whiteSquare = new Image(size, size);
        this._blackSquare.src = 'img/blackSquare.png';
		this._whiteSquare.src = 'img/whiteSquare.png';
		
        // Log the date & time player opened app.
		logEvent("App started: "   + Date() +  
			"<br>screen.width = "  + screen.width +
			"<br>screen.height = " + screen.height +
			"<br>Board size is "   + this._boardSize +
			"<br>Square size is "  + this._squareSize + " pixels square." +
			"<br><br>Hello Professor, would you like to play a game of Chess?");

		// Wait a second for images to load.
		setTimeout(()=>	enableButton("cmd_play_game"),  ONE_SECOND);	
	}
	
    // With no set accessors, act like read only variables, no way to set them.
    get boardSize()  { return this._boardSize;  }
	get squareSize() { return this._squareSize; }

    get strBrd()
	{
		
		let count = i = 0,
			strBoard = "",
			square = null;
		
		for (i=0; i<=MAX_SQUARE_INDEX; i++)
		{
			square = this.squares[i];
			if (square.piece instanceof Piece)
			{
				if (count > 0)
				{
					strBoard += count;
					count= 0;
				}
				strBoard += square.piece.strChar;
			}
			else
			{
				count++;
			}

			if (count === 8)
			{
				strBoard += count;
				count = 0;
			}
		}
		return strBoard;
	}

    cmdPlayGame()
    {
		logEvent("Entering method ChessBoard.cmdPlayGame().");		

		// Get button element by id.
		const e = document.getElementById("cmd_play_game");
		if (e)
		{
			// Assign an event handler to the same button to quit.
			e.onclick=()=> this.cmdQuitGame();
			
			// Change what the button says.
			e.innerHTML = "Quit?";
			
			// Send it to the methods to complete task.
			this.loadStrBrd();
			this.gameStarted = true;
		}
    }

	// Called by loadStrBrd() from cmdPlayGame() which waits for the square images to load.
	drawBoard()
	{
		logEvent("Entering method ChessBoard.drawBoard().");

		let	ctx = this.gl,      
			sqSize = this._squareSize,
			piece = null,
			square = null,
			offsetX = Math.floor(sqSize * 0.15),
			offsetY = Math.floor(sqSize * 0.80),
			i = 0,
			x = 0,
			y = 0,
		    wdt = this.canvas.width;
		
		ctx.strokeStyle = INNER_BORDER_COLOR;
		ctx.lineWidth = INNER_BORDER_THICKNESS;
		ctx.font = Math.floor(sqSize * 0.75) + "px Arial";
		
		for (i=0; i<=MAX_SQUARE_INDEX; i++)
		{
			square = this.squares[i];
			piece = square.piece;
			square.scrX = x = square.row * sqSize;
			square.scrY = y = square.col * sqSize;
			
			// Draw the image of the Square.
            ctx.drawImage((square.strColor === WHITE_SQUARE_COLOR) ? this._whiteSquare : this._blackSquare, x, y);
			
			// If a Piece instance is on square, link & draw it.
			if (piece instanceof Piece)
			{
				piece.parentSquare = square;	
				ctx.strokeStyle = piece.strColor; 
				ctx.strokeText(piece.strUnicodeChar, x + offsetX, y + offsetY);							
				logEvent("Drawing piece index " + piece.imgIndex);
			}
        }

		// Draw a rectangle around the chessboard.
		let brdSize = this._boardSize;
		
		// Set the color of the inner border.
		ctx.strokeStyle = INNER_BORDER_COLOR;
		
		// Set the line width.
		ctx.lineWidth =  INNER_BORDER_THICKNESS;
		
		// Move to the origin of the chessboard which is (0, 0).
		ctx.moveTo(0, 0);
		
		// Create the path of the chessboard square.
		ctx.lineTo(brdSize, 0);
		ctx.lineTo(brdSize, brdSize);
		ctx.lineTo(0, brdSize);
		ctx.lineTo(0, 0);
		
		// Call to draw the path.
		ctx.stroke();
    }

    cmdQuitGame()
    {
		logEvent("Entering method ChessBoard.cmdQuitGame().");		
		
		if (this.gameStarted === true)
		{
			// Get button element by id.
			const e = document.getElementById("cmd_play_game");
			if (e)
			{
				// Assign an event handler method.
				e.onclick=()=> this.cmdPlayGame();
			
				// Change what the button say.
				e.innerHTML = "Play?";
			
				// Call the method to shut down the game.
				this.shutdown();
			}
		}
    }

	createPiece(strChar = "p")
	{
		logEvent("Entering method ChessBoard.createPiece().");

		let piece = null;

		// Notice it passes the lower case to the switch statement but the normal case to the correct constructor.
		switch(strChar.toLowerCase())
		{
			case "p":	// Pawn
			{
				piece = new Pawn(strChar);
				break;
			}
			case "r":	// Rook
			{
				piece = new Rook(strChar);
				break;
			}
			case "n":	// Knight
			{
				piece = new Knight(strChar);
				break;
			}
			case "b":	// Bishop
			{
				piece = new Bishop(strChar);
				break;
			}
			case "k":	// King
			{
				piece = new King(strChar);
				break;
			}
			case "q":	// Queen
			{
				piece = new Queen(strChar);
				break;
			}
			default:
			{
				logEvent("ChessBoard.prototype.createPiece() called with invalid parameter: " + strChar);
			}
		}
		return piece;	
	}	

	loadStrBrd(strBrd = NEW_STR_BRD)
	{
		logEvent("Entering ChessBoard.loadStrBoard() method.");
		
		// A lot of things happen to the strBrd to insure it is valid!
		if (!this.isValidStrBrd(strBrd))
		{
			logEvent("An invalid strBrd was passed into loadStrBrd() " + strBrd);
			return;
		}
		
		// Declare & initialize local variables.
		let i = 0;
		let index = 0;
		let errorCounter = 0;
		let square = null;
		let piece = null;
		let strChar = "";

		// Hide the canvas element while working on it.
		hide(this.canvas.id);

		// Create a new Array() using literal syntax and fill it with 64 new Square()instances.
		this.squares = [];
		for (i=0; i<=MAX_SQUARE_INDEX; i++) { this.squares.push(new Square(i)); }

		for (strChar of strBrd)
		{
			// Loop thru string of characters.
			// Test its alpha or numeric?
			if ("prnbqkPRNBKQ".includes(strChar) === true)
			{
				
				this.squares[index].piece = this.createPiece(strChar);
				this.squares[index++].piece.square = this;

				// If you found a valid character reset the errorCounter variable to zero.
				errorCounter = 0;

			}
			else if ("123456789".includes(strChar) === true)
			{
				// Increase the index this many squares & reset errorCounter.
				index += parseInt(strChar);
				errorCounter = 0;
			}
			else
			{
				logEvent("loadStrBrd() pass invalid character @index =  " + (index + errorCounter) + " <br>strBrd = " + strBrd);
				errorCounter++;
			}
			if (index > (MAX_SQUARE_INDEX + 1)){ break; }
		}
		if (strBrd === NEW_STR_BRD){ this.loadFullStrTitles(); }

		this.drawBoard();
		
		// Create a new Array() using literal syntax.
		this.moves = [];
		
		// Log the event.
		logEvent("A new canvas chessboard & pieces image was drawn.");

		// Display the canvas element.
		show(this.canvas.id);
	}
	
	loadFullStrTitles()
	{
		
		let index = 0,
		    titles = [ "WhiteQueensRook", "WhiteQueensKnight", "WhiteQueensBishop", "WhiteQueen", "WhiteKing",
			"WhiteKingsBishop", "WhiteKingsKnight", "WhiteKingsRook", "WhiteQueensRookPawn", "WhiteQueensKnightPawn",
			"WhiteQueensBishopPawn", "WhiteQueensPawn", "WhiteKingsPawn", "WhiteKingsBishopPawn", "WhiteKingsKnightPawn",
			"WhiteKingsRookPawn" ];
			
			
		for (let i=0; i<16; i++){
			this.squares[i].piece.fullStrTitle = titles[i];
		}

		titles = [ "BlackQueensRookPawn", "BlackQueensKnightPawn", "BlackQueensBishopPawn", "BlackQueensPawn", 
			"BlackKingsPawn", "BlackKingsBishopPawn", "BlackKingsKnightPawn", "BlackKingsRookPawn", 
			"BlackQueensRook", "BlackQueensKnight", "BlackQueensBishop", "BlackQueen", "BlackKing",
			"BlackKingsBishop", "BlackKingsKnight", "BlackKingsRook"  ];
		
		for (let i=48; i<=MAX_SQUARE_INDEX; i++){
			this.squares[i].piece.fullStrTitle = titles[index++];
		}
	}

	isValidStrBrd(strBrd)
	{
		let strChar = "",
			countTotalPieces  = 0,
			countWhitePawns   = 0, 
			countWhiteRooks   = 0, 
			countWhiteKnights = 0, 
			countWhiteBishops = 0, 
			countWhiteKings   = 0, 
			countWhiteQueens  = 0, 
			countBlackPawns   = 0, 
			countBlackRooks   = 0, 
			countBlackKnights = 0, 
			countBlackBishops = 0, 
			countBlackKings   = 0, 
			countBlackQueens  = 0;

		for (strChar of strBrd)
		{
			if ("prnbkqPRNBKQ".includes(strChar)){ countTotalPieces++; }
			switch(strChar)
			{
				case "p":{
					countWhitePawns++;
					break;
				}
				case "r":{
					countWhiteRooks++;
					break;
				}
				case "n":{
					countWhiteKnights++;
					break;
				}
				case "b":{
					countWhiteBishops++;
					break;
				}
				case "k":{
					countWhiteKings++;
					break;
				}
				case "q":{
					countWhiteQueens++;
					break;
				}
				case "P":{
					countBlackPawns++;
					break;
				}
				case "R":{
					countBlackRooks++;
					break;
				}
				case "N":{
					countBlackKnights++;
					break;
				}
				case "B":{
					countBlackBishops++;
					break;
				}
				case "K":{
					countBlackKings++;
					break;
				}
				case "Q":{
					countBlackQueens++;
					break;
				}
				default:
				{}
			}
		}
		return countWhiteKings === 1 && countBlackKings === 1 && countTotalPieces <= 32 && (countWhiteQueens + countWhitePawns) <= 9 
		&& (countBlackQueens + countBlackPawns) <= 9;	
	}

	shutdown()
	{
		logEvent("Game over, shutting down.");
		
		// Hide the canvas element.
		hide(this.canvas.id);
		
		// Clear the rectangle of anything.
		this.gl.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// Create a new array for moves (Save the game to disk or HTML5 doc?)
		this.moves = [];

		// Remove link between Piece() & Square, (piece.parentSquare = null; piece = null.)
		if (this.squares.length > 0)
		{
			let square = null;
			let piece = null;
			
			for (square of this.squares)
			{
				piece = square.piece;
				if (piece instanceof Piece)
				{ 
					piece.parentSquare = null;
					piece = null;
				}
			}	
		}
		else
		{
			this.squares = [];
		}
		this.gameStarted = false;
	}
}

// Prevent tampering with our Object classes.
Object.freeze(CHESS_PIECES_FILENAMES_SIMPLE, CHESS_PIECES_FILENAMES, CHESS_PIECES_UNICODE, whiteSquareIndices, Square, ChessBoard);

function setupGraphicsPipeline()
{   
    window.JML_Chess = new ChessBoard('chessboard', '2d');
}

// eof
