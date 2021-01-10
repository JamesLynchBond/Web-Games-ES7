


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







	
*/  





const MIN_PARTICLE_LIFETIME = 300, MAX_PARTICLE_LIFETIME = 2000;	// In milliseconds, 300/1000 to 2 seconds.	

class Particle
{
	constructor()
	{
		this.origin = new Vec3();				// This will project to the Ship.origin plus radius.
		this.velocity = new Vec3();				// Speed is derived from velocity.
		this.lifetime = MIN_PARTICLE_LIFETIME;	// Normally, all particles live a short life.
		this.startTime = 0.0;
	}

	kill()
	{
		this.origin = null;
		this.velocity = null;
	}

	move()
	{

		// All they do is move and die off.
		
	}
	
	update()
	{
		
		
	}
}

Object.freeze(Particle);

// eof Particle.js
