


	/****************************************************
	*  													*
	*	Author:		James Marion Lynch			 		*
	*  	Date:		12-11-2020                          *
	* 	Version:	Alpha 1.0.0.0                      	*
	* 	Title:		Cascading Style Sheet              	*
	*  	Filename:	css/style.css             			*
	* 	Language:	CSS3                          		*
	*                                                   *
	*****************************************************


	Notes: 

 *	The class Ship extends System and has an Array (named: systems[]) full of sub System class objects.
 *	System is used as an abstrct base class only. We build classes of System object that extends this class only.
 *
 *	Laser System.
 *	Propulsion System.
 *	Computer System.
 *	Guidance System.
 *	Security System.
 *	Health Monitor System.
 *
 *	Functions on prototype plus all inherited from Obj3 (Vec3, Vec4, Mat4, ...):
 *
 *	constructor(strTitle = 'New System') default value if ommitted.
 *	recharge()
 *
 *	For use as ship & it's sub systems[]; such as Guidance, Computer, Laser, Shield, Propulsion, ... 
 *
 */


const MIN_POWER = 0.0;
const MAX_POWER = 100.0;
const CURRENT_POWER_LEVEL = 115.0;
const CURRENT_POWER_DRAW_RATE = 12.0;
const MIN_POWER_RATE = 5.0;
const MAX_POWER_RATE = 45.0;
const STATE_CHARGING = 205;
const STATE_FULL_CHARGE = 100.0;
const RECHARGE_CYCLES = 50000;
const MIN_RECHARGE_RATE = 2.0;
const MAX_RECHARGE_RATE = 20.0;

class System extends Obj3
{
	
	constructor(strTitle = 'New System.')
	{
		super();
		
		this.isTurbo = false;
		this.lifetime = Infinity;
		this.powerLevel = 0.0;							// System's start uncharged.
		this.currentPowerDraw = MIN_POWER;				// Start systems uncharged, zero power.
		this.rechargeRate = MIN_RECHARGE_RATE;
		this.rechargeCycles = 5000;
		this.rechargeTime = 0.0;						// In milliseconds;
		this.owner = null;
		this.state = STATE_CHARGING;					// New Systems must charge before useage occurs.
		this.strTitle = strTitle;
		this.turboRechargeRate = MIN_RECHARGE_RATE * 2;
	}

	// Must figure this out later.
	recharge()
	{
		
		// Work needs to done here. Just a start.
		this.startTime = new Date().now();
		this.rechargeTime = this.startTime + Math.floor(this.rechargeCycles / this.rechargeRate);
	}
}

// Prevents tampering.
Object.freeze(System);

// eof System.js
