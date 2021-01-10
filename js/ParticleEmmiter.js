


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





const CACHED_PARTICLES = 1000; 
 
class ParticleEmmiter
{
    constructor()
    {
		this._particles = [];
        this._cache = [];
        this.setup();
	}

	get count(){ return this._particles.length; }
	
	add(origin){
		if (origin instanceof Vec3 || origin instanceof Vec4 || Array.isArray(origin) && origin.length > 2)
        {
			let p = new Particle();
			p.origin.set(origin);
			p.velocity.random();
			this._particles.push(p);
		}
        else
        { 
			logEvent('ParticleEmmiter called with wrong parameter?');
		}
	}
	
	empty()
    {
		for (let particle of this._particles)
        {
			particle = null;
		}
		this._particles = [];
	}
    
    setup()
    {
       for (let i=0; i<CACHED_PARTICLES; i++)
       {
            
       }       
        
    }
	
	update()
    {
		for (let particle of this._particles)
        {
			particle.update();
		}
	}
}

Object.freeze(ParticleEmmiter);

// end of file ParticleEmmiter.js
