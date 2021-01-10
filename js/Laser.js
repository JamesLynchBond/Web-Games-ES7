/****************************************************
*  													*
*	Author:		James Marion Lynch			 		*
*	Corp:		JML 3D Studios						*
*  	Date:		12-04-2020                          *
* 	Version:	Alpha 1.0.0.0                      	*
* 	Title:		Laser sub-system for video games.  	*
*  	Filename:	js/Laser.js             			*
* 	Language:	JavaScript ES7 2017            		*
*                                                   *
*****************************************************


NOTES:
 *	Dependencies: Asteroids.html, main.css, System.js, Player.js, Obj3.js & Util.js
 *
 *	Whereas; System inherits from Obj3, Laser inherits from System.
 *	Object is the abstract base class of all object classes.
 *
 *	functions:
 *
 *	Laser.prototype.fire();
  *	The main job is to create and store Obj3() laser pulse class Objects in an Array.
 *	When you fire() the Laser you actually just store another pulse for processing the Array each frame.
 *	Laser pulses can live from 1/2 second to 10 seconds maximium. 
 *	This is easily controlled by changing the 2 constants below.
 *	See also the speed constants below & fire rate constants below.
 *
 *	A Laser pulse cannon knows not what it destroys so no team numbers.
 *	It is just a dumb weapon, simplicity!
 *
 */

// Lifetime from one second to 10 seconds in milliseconds (min & max.)
const MIN_LASER_SPEED = 10,
	  MAX_LASER_SPEED = 1000,
	
	  MIN_LASER_LIFETIME = 500,
	  MAX_LASER_LIFETIME = 10000,
	
	  LASER_MIN_SHOTS = 1,		// Minimum number of laser pulses is 1.
	  LASER_MAX_SHOTS = 6;		// Should stop to recharge System it extends.

// For use in Ship class Object's stored in this.systems = []; such as Laser, Shield, Propulsion System, ...
// All extends System class Objects.
 
class Laser extends System{
	constructor(){
		
		// Call the System() constructor which calls Obj3() constructor & sets this.id. 
		super('Laser_Pulse_Cannon');
	
		this.lifetime = MIN_LASER_LIFETIME;
		this.pulses = [];						// Stores Obj3 pulse class types.
		this.shots = 0;							// To limit laser shots within a range.
	}
	fire(){
		
		logEvent('Laser.fire() called.');
		this.shots++;
		if (this.shots >= MAX_LASER_SHOTS){ 
			logEvent('Your laser system needs recharging!');
			return; 
		}
		
		let pulse = new Obj3(),
			origin = pulse.origin,
			orient = pulse.orient,
			velocity = pulse.velocity,
			radius = 1.0;
			
		pulse.thrust = MAX_LASER_SPEED;
		pulse.applyThrust();

		if (this.owner instanceof Ship){		// Can be a free standing Laser?
			this.owner.orient.normalize();
		
			origin.set(this.owner.origin)
			origin.add(this.owner.orient.mulScalar(this.owner.radius));

			orient.set(this.owner.orient);
			radius = this.owner.radius;
			
		} else {	// else it will be its vectors & info.
		
			this.orient.normalize();
			origin.set(this.origin.add(this.orient.mulScalar(this.radius)));
			origin.set(this.origin);
			orient.set(this.orient);
			radius = this.radius;
		}
		
		// Angle & orient are the same on pulse Obj3 class objects.
		pulse.origin.set(this.origin.addScalar(radius));
		pulse.angle.set(orient);
		this.pulses.push(pulse);
		
		logEvent('Laser system fired, Origin: ' + origin);
		logEvent('Orientation of pulse: ' + orient);
		logEvent('Velocity of pulse: ' + velocity);
	}
}

// eof Laser.js
