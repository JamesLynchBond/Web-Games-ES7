


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




const STATE_NEW = 1;
const STATE_LOADING = 2;
const STATE_LOADED = 3;
const STATUS_ACTIVE = 10;
const STATUS_INACTIVE = 20;
const STATUS_EXPLODING = 30;
const STATUS_CHARGING = 40;
const MIN_SPIN = 0.01;
const MAX_SPIN = 6.0;
const MIN_THRUST = 0.1;
const MAX_THRUST = 100;
const MIN_LIFETIME = 100.0;
const MAX_LIFETIME = Infinity;
const MIN_RADIUS = 0.01;
const MAX_RADIUS = 1000;
const MIN_MASS = 0.01;
const MAX_MASS = 1000;

/*

The 3D screen object class for use in video games or any 3D Virtual World Coordinate System.
As you know a 3D game has x-axis, y-axis & z-axis.

To create a Vec3() class object;
let vec = new Vec3(0, 0, 8);

When you create a new class of object, you are really creating a new data type of you design!
Below is a design of mine I am still working on.

Remember, this is HTML5, CSS3, ES6, WebGL and GLSL, not Visual Basic.

*/

class Obj3
{

  constructor(origin)
  {
    // Object.prototype is inherited by all new objects but no call to super() constructor is required.
    // Set screen boolean values.
    this._isActive = false;                   // new Obj3 class objects begin life not being active by default.
    this._isOnScreen = false;                 // new Obj3 begin life off screen and the owner puts on screen.

    // Set the state & status of new objects.
    this._stateObj3 = STATE_NEW;
    this._statusObj3 = STATUS_INACTIVE;

    // Set lifetime & startTime values to zero.
    this._et = 0.0;                           // Time in milliseconds since last movement.
    this._lifetime = MIN_LIFETIME;            // Lives 1 second by default (pulses extend this class.)
    this._startTime = new Date().now;         // Start time set by owner of Obj3().

    // Set physics properties.
    this._mass = MIN_MASS;                    // Minimal mass by default.
    this._radius = MIN_RADIUS;                // Smallest object radius @1st.
    this._spin = MIN_SPIN;                    // Obj3 may or may not be spinning object but this is the increment.
    this._thrust = MIN_THRUST;                // MIN_THRUST is a constant value.

    this._accel =    new Vec3();              // The acceleration of Obj3 in 3D.
    this._angle =    new Vec3();              // Current flight path in 3D Virtual Space (Euler angles.)
    this._color =    new Vec4(0, 0, 255, 1);  // RGBA = Red, Green, Blue & Alpha values (defaults to blue.)
    this._orient =   new Vec3(30, 0, 0);      // Current orientation of physics body roll, pitch, yaw order Euler angles.
    this._origin =   new Vec3();              // Origin of Obj3 in 3D Virtual Woprld Coordinates.
    this._scale =    new Vec3(1, 1, 1);       // Scale to 1 on all axis, (x, y, z)
    this._velocity = new Vec3();              // Zero vector velocity, body begins at rest with no velocity or speed.

	// We set the origin (location in 3D Virtual Space Coordinates) of the object.
	// This passes through safety check code in the set origin accessor.
	// All the Vec3() class objects pass through the same exact accessor bot we get direct access to this._origin!
	this.origin = origin;					  
  }

  get accel()     { return this._accel; }
  get angle()     { return this._angle; }
  get color()     { return this._color; }
  get orient()    { return this._orient; }
  get origin()    { return this._origin; }
  get scale()     { return this._scale; }
  get velocity()  { return this._velocity; }
  
  
  get isActive()  { return this._isActive; }
  get isOnScreen(){ return this._isOnScreen; }
  get stateOb3()  { return this._stateObj3; }
  get statusObj3(){ return this._statusObj3; }
  get et()        { return this._et; }
  get lifetime()  { return this._lifetime; }
  get startTime() { return this._startTime; }
  get mass()      { return this._mass; }
  get radius()    { return this._radius; }
  get speed()     { return this.velocity.mag().toFixed(3); }    // the magnitude of the velocity is the speed.
  get spin()      { return this._spin; }
  get thrust()    { return this._thrust; }

  set accel(value)
  {
    if (value instanceof Vec3 || value instanceof Vec4 || Array.isArray(value) && value.length >= 3)
	{
      this._accel[0] = value[0];
      this._accel[1] = value[1];
      this._accel[2] = value[2];
    }
  }

  set angle(value)
  {
    if (value instanceof Vec3 || value instanceof Vec4 || Array.isArray(value) && value.length >= 3)
	{
      this._angle[0] = value[0];
      this._angle[1] = value[1];
      this._angle[2] = value[2];
    }
  }

  set color(value)
  {
    if (value instanceof Vec4 || Array.isArray(value) && value.length >= 4)
	{
      this._color[0] = value[0];
      this._color[1] = value[1];
      this._color[2] = value[2];
    }
  }

  set orient(value)
  {
    if (value instanceof Vec3 || value instanceof Vec4 || Array.isArray(value) && value.length >= 3)
	{
      this._orient[0] = value[0];
      this._orient[1] = value[1];
      this._orient[2] = value[2];
    }
  }

  set origin(value)
  {
    if (value instanceof Vec3 || value instanceof Vec4 || Array.isArray(value) && value.length >= 3)
	{
      this._origin[0] = value[0];
      this._origin[1] = value[1];
      this._origin[2] = value[2];
    }
  }

  set scale(value)
  {
    if (value instanceof Vec3 || value instanceof Vec4 || Array.isArray(value) && value.length >= 3)
	{
      this._scale[0] = value[0];
      this._scale[1] = value[1];
      this._scale[2] = value[2];
    }
  }

  set velocity(value)
  {
    if (value instanceof Vec3 || value instanceof Vec4 || Array.isArray(value) && value.length >= 3)
	{
      this._velocity[0] = value[0];
      this._velocity[1] = value[1];
      this._velocity[2] = value[2];
    }
  }



  set isActive(value){ this._isActive =  (value  ? true : false); }  // Limit to bools.
  set isOnScreen(value){ this._isOnScreen =  (value ? true : false); }
  
  set stateObj3(value)
  {
    switch(value)
	{
      case STATE_NEW: case STATE_LOADING: case STATE_LOADED:
		this._stateObj3 = value; 
		break;
      default:
		logEvent("Obj3.statusObj3 passed the wrong value: "  + value);
    }
  }
  
  set statusObj3(value)
  {
    switch(value)
	{
      case STATUS_ACTIVE: case STATUS_INACTIVE: case STATUS_EXPLODING:  case STATUS_CHARGING:
        this._statusObj3 = value;
		break;
      default:
		logEvent("Obj3.statusObj3 passed the wrong value. " + value);
	}
  }
  
  // elapsed time = et
  set et(value){ this._et = Math.abs(value); }
  set lifetime(value){ this._lifetime = Math.abs(value); }
  set startTime(value){ this._startTime = Math.abs(value); }
  set mass(value){ this._mass = setValue(value, MIN_MASS, MAX_MASS); }
  set radius(value){ this._radius = setValue(value, MIN_RADIUS, MAX_RADIUS); }
  set spin(value){ this._spin = setValue(value, MIN_SPIN, MAX_SPIN); }
  set thrust(value){ this._thrust = setValue(value, MIN_THRUST, MAX_THRUST); }

  // Apply a thrust to an object.
  applyThrust(){

    // The flight path angle (Unit Vector) and orient (Euler Angle) of the object may differ.
    // When creating a rotation matrix Vec3.toQuat(this.orient) is called.
    // Orientation of object is in Euler Angle so we change it into a Quaternion.

    let aV = this.orient,            // current orientation of Obj3 object (Euler Angle.)
        cV = this.velocity,          // current angle (Unit Vector) of flight path of Obj3 object.
        t = this._thrust;            // thrust being applied to Obj3 by thrusters (in the direction of orient.)

    logEvent('Velocity before thrust: ' + cV);

    cV[0] += aV[0] * t;  // current velocity + (applied velocity * time)
    cV[1] += aV[1] * t;
    cV[2] += aV[2] * t;

    logEvent('Velocity after thrust: ' + cV);
    logEvent('Current speed: ' + this.speed);
  }
  
  toString(){ return 'Origin = ' + this.origin + ', Orient = ' + this.orient; }
  
  decreaseSpinRate(){ 
    this._spin = setValue(this._spin - MIN_SPIN, MIN_SPIN, MAX_SPIN);
    logEvent('Spin rate decreased: ' + this._spinRate.toFixed(2));
  }
  increaseSpinRate(){ 
    this._spin = setValue(this._spin + MIN_SPIN, MIN_SPIN, MAX_SPIN);
    logEvent('Spin rate increased: ' + this._spin.toFixed(2));
  }
  decreaseThrust(){ 
    this._thrust = setValue(this._thrust - MIN_THRUST, MIN_THRUST, MAX_THRUST);
    logEvent('Thrust decreased: ' + this._thrust.toFixed(2));
  }
  increaseThrust(){ 
    this._thrust = setValue(this._thrust + MIN_THRUST, MIN_THRUST, MAX_THRUST);
    logEvent('Thrust increased: ' + this._thrust.toFixed(2));
  }
  clone(){
    
    // Create a new Obj3() & copy all the data over.
    let obj = new Obj3();
    obj.isActive = this._isActive;
    obj.isOnScreen = this._isOnScreen;
    obj.lifetime = this._lifetime;
    obj.startTime = this._startTime;
    obj.mass = this._mass;
    obj.radius = this._radius;
    obj.spin = this._spin;
    obj.thrust = this._thrust;
    obj.setup(this.origin, this.orient, this.scale, this.color);
    obj.accel.set(this.accel);
    obj.velocity.set(this.velocity);
    return obj;  // exact duplicate but values must pass thru accessors.
  }

  // Remove an Obj3 from memory by setting its new class Object() properties to null (nothing.)
  free(){
    this.accel = null;
    this.angle = null;
    this.color = null;
    this.orient = null;
    this.origin = null;
    this.scale = null;
    this.velocity = null;
  }
  
  // Collision detection using a sphere, the radius & origin only.
  // Where body is an Obj3 or extends the Obj3 class.
  collision(body){
    
    // We donnot call a function to do subtraction but do each element here individually.
    // This speeds up code since it is called every frame on each object.
    let radius = this._radius + body.radius;
    let x = this.origin[0] - body.origin[0];
    let y = this.origin[1] - body.origin[1];
    let z = this.origin[2] - body.origin[2];
    let abs = Math.abs;
    
    // Returns a bool value, true or false    
    return (radius > abs(x) && radius > abs(y) && radius > abs(z));
  }
  
  /*
  
  Revive a JSON object file definition (see JSON in books on JavaScript or help files.) needs work!
  reviver(text){
    let obj = JSON.parse(text, function(key, value){
      switch(key){
        case 'origin': case 'orient': case 'angle': case  'velocity': case 'scale': {
          value = new Vec3(value); break;
        } case 'color': {
          value = new Vec4(value); break;
        } case 'matrix': {
          value = new Mat4(value); break;
        }
      }
      return value;
    });
  }
  
  
  */
  
  // Accepts 4 arrays of any types, excepts length of 3 or more.
  setup(origin, orient, scale, color){
    
    if (Array.isArray(origin) && origin.length >= 3){
      this.origin.set(origin);
    }
    if (Array.isArray(orient) && orient.length >= 3){
      this.orient.canonize();              // Euler angles use canonize(); Directional vector
      this.orient.set(orient);
      
      // Assumes Obj3 is at rest if you just setup(). SO no velocity or speed.
      this.angle.set(this.orient);       // Direction of current flight path of Obj3
      this.velocity.set([ 0, 0, 0 ]);    // Remove velocity thereby speed which is derived velocity.
    }
    if (Array.isArray(scale) && scale.length >= 3 && !scale.isZero()){
      
      // Any 3 floats are acceptable for scale.
      this.scale.set(scale);
    }
    if (Array.isArray(color && color.length >= 4)){  // RGBA = Red, Green, Blue & Alpha values between 0-255.

      // Therefore we trim them to 0-255 & 0-1 for Alpha channel (opacity value.)
      color[0] = Math.abs(color[0]) % 255;
      color[1] = Math.abs(color[1]) % 255;
      color[2] = Math.abs(color[2]) % 255;
      color[3] = Math.abs(color[3]) % 1;  // Between 0 - 1 only
      this.color.set(color);
    }
    this._startTime = 0.0;
  }
}

// You can extend this object but not tamper with it. Used as an abstract base class mostly except for pulse objects.
// It is designed to be a laser pulse object at minimum, other classes will extend it.
// It can be instantiated (created) as an object on it's own (not a true abstract base class as in C++.)

Object.freeze(Obj3);

// end of class Obj3 object definition.

