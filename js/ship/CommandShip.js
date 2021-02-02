/* 

    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*
	*    Author:			James Marion Lynch			
	*    Date:				10-10-2020
	*    Version:			Beta 0.8.3.2
	*    Title:				Sci-Fi Fantasy RPG Space Commander			
	*    Filename:			CommandShip.js
	*    Languages:			HTML5, CSS3 & JavaScript ES6 2015, WebGL and GLSL.
	*    
	*    Dependencies:	    (Shown in load order.)
	*    Filenames:			Description:
	*    
	*    CommandShip.html	The main HTML5 document web page.
	*    normalize.css		The Cascading Style Sheet (reset).
	*    style.css			The Cascading Style Sheet (specific.)
	*    math.js			class definition file, 3D Graphics Library, Vec3(), Mat4(), ...
	*    utils.js			Utility helper functions, createIcosa60() is here.
	*    CommandShip.js		class definition file CommandShip.
	*
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const LASER_SYSTEM = 0;

class Ship extends System
{
	constructor()
	{
		// Must call the parent super class before using the "this" reference.
		super();

		let i = 0, len;
		
		this.systems = [];
		this.add(new Laser());

		logEvent("Welcome aboard Captain!");
	
		// Link the parent object to the child with the "this" self referential object.
		// In the future I will add engine, forcefield, guidance, radar, etc, ...
		
		len = this.systems.length;
		for (i=0; i<len; i++)
		{
			this.systems[i].owner = this;				// The mother ship owns it"s systems.
			logEvent(this.systems[i].strTitle + " installed."); 
		}
		
		// Log the date & time app started.
		logEvent("App started: " + Date());
		logEvent("Ships position    => " + this.origin);
		logEvent("Ships orientation => " + this.orient);
		logEvent("Ships flight path => " + this.angle);
		logEvent("Ships velocity    => " + this.velocity);

		// Orient is ship direction, angle is flight path (Euler angles.)
		if (this.orient.isEqual(this.angle) === true)
		{
			logEvent("Ships flight path is aligned with orientation of thrusters.");
			logEvent("Engaging propulsion system will continue current flight path.");
		} 
		else 
		{
			logEvent("Ships flight path is not in alignment with propulsion system angle.");
			logEvent("Engaging propulsion system will alter course.");
		}
	}

	// Add the ability to test for existing system type.
	add(sys)
	{
		if (sys instanceof System) { this.systems.push(sys); }
	}
	
	fire()
	{
		this.systems[LASER_SYSTEM].fire();
	}
}

// Prevents others from tampering with our Object.
Object.freeze(Ship);

// Create one instance of Ship for game.
window.ship = new Ship();

// eof
