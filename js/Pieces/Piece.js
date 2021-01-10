/*
 *
 *	Author:		James Lynch
 *	Date:		11-22-2020
 *	Title:		Chess Game
 *	Filename:	js/Pieces/Piece.js
 *	Languages:	HTML5, CSS3 & JavaScript 6.0 (ES6), webGL shader language.
 *
 *
 *
 */

const BLACK_SQUARE_COLOR = "black";
const WHITE_SQUARE_COLOR = "white";
const WHITE_PIECE_COLOR = "white";
const BLACK_PIECE_COLOR = "black";
const CHAR_PIECES = "prbnqk";
const CHAR_PIECES_ARRAY = [ "p", "r", "b", "n", "k", "q", "P", "R", "B", "N", "K", "Q" ];


/*

white pawn = 'p' = 0, rook = 'r' = 1, knight = 'n' = 2, bishop = 'b' = 3, queen = 'q' = 4, king = 'k' = 5; 			0-5
black pawn = 'P' = 6, rook = 'R' = 7, knight = 'N' = 8, bishop = 'B' = 9, queen = 'Q' = 10, king = 'K' = 11; 		6-11

indexes into CHESS_PIECES_UNICODE array shown above.
generic piece is 0-5 above.
when you add (6*team) to the generic piece you get team character upper or lower case since team = 0 or 1 value.

let index = (6 * this.team) + index;

*/

class Piece
{
	constructor(strChar = "p")
	{
		this.parentSquare = null;
		this._strChar = 'p';
		this._strUnicodeChar = "&#9817;";
		this.strChar = strChar.trim();
		this.team = (CHAR_PIECES.includes(this.strChar) === true) ? 0 : 1;
		this.fullStrTitle = "";
		this.currentLegalMoves = [];
		this.moves = [];
		this.imgIndex = CHAR_PIECES_ARRAY.indexOf(this._strChar);
		this.unicodeIndex = this.imgIndex;
		this.strUnicodeChar = CHESS_PIECES_UNICODE[this.unicodeIndex];
	}

	get col()
	{ return (this.isPieceOnSquare === true) ? this.piece.parentSquare.col : -1; }
	
	get row()
	{ return (this.isPieceOnSquare === true) ? this.piece.parentSquare.row : -1; }
	
	get isPieceOnSquare(){ return (this.parentSquare instanceof Square); }
	
	get strChar(){ return this._strChar; }
	
	get strUnicodeChar(){ return this._strUnicodeChar; }

	set strChar(value)
	{
		if (STRING_CHARACTERS.includes(value) === true)
		{
			this._strChar = value;
		}
		else
		{
			logEvent("Invalid character sent to Piece.prototype.strChar() accessor; " + value);
		}
	}
	
	set strUnicodeChar(value)
	{
		if (CHESS_PIECES_UNICODE.includes(value) === true)
		{
			this._strUnicodeChar = value;
		}
		else
		{
			logEvent("Invalid character sent to Piece.prototype.strUnicodeChar() accessor; " + value);
		}
	}
	
	get strColor(){ return (this.team === 0) ? WHITE_PIECE_COLOR : BLACK_PIECE_COLOR; }
	
	get strTitle(){ return this.strColor + this.title; }

	get title()
	{
		var title = '';
		switch(this._strChar)
		{
			case 'p': case 'P':{
				title = "Pawn"; break;
			}
			case 'r': case 'R': {
				title = "Rook"; break;
			}
			case 'n': case 'N': {
				title = "Knight"; break;
			}
			case 'b': case 'B': {
				title = "Bishop"; break;
			}
			case 'k': case 'K': {
				title = "King"; break;
			}
			case 'q': case 'Q': {
				title = "Queen"; break;
			}
		}
		return title;				
	}
	toString(){ return (this.fullStrTitle.length === 0) ? this.strTitle : this.fullStrTitle; }
}

// eof
