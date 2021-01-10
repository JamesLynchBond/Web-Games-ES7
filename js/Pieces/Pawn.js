/*
 *
 *	Author:		James Lynch
 *	Date:		07-21-2020
 *	Title:		Pawn
 *	Filename:	Pawn.js
 *	Languages:	HTML5, CSS3 & JavaScript (ES8 2017), webGL shader language.
 *
 *
 *
 */


 
 // Piece extends Obj3 so all pieces are ready for 3D code actions.
class Pawn extends Piece
{
	constructor( strChar )
	{
		
		// super class called before any other code is executed.
		// You cannot reference the 'this' object until a call to parent super() class is made.
		super( strChar );
		
		this.moves = [];
	}
	
	
	// We will add more code for each type of piece to determine the moves each piece makes.
	
}
 
// eof Pawn.js
 