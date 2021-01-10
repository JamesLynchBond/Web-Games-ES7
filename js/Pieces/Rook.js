/*
 *
 *	Author:		James Lynch
 *	Date:		07-21-2019
 *	Title:		Rook
 *	Filename:	Rook.js
 *	Languages:	HTML5, CSS3 & JavaScript 6.0 (ES6), webGL shader language.
 *
 *
 *
 */


class Rook extends Piece
{
	constructor( strChar )
	{
		
		// super class called before any other code is executed.
		// Must call parent super class before attempting to reference the 'this' object.
		super( strChar );
		
		this.moves = [ 1, 1, -1, -1, 1, 1, -1, -1 ]; 
	}
}
 
// eof Rook.js
 