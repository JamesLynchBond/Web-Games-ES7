/*

Author:		        James Marion Lynch			
Date:		        09-14-2020
Version:	        Alpha 1.0
Title:		        Demo of WebGL 3D Platonic Solids.		
Filename:	        Dodecahedron.js
Languages:	        HTML5, CSS3 & JavaScript ES6 2015, WebGL and GLSL.

Dependencies:	    (Shown in the order they must be loaded in.)

Filenames			Description

Dodecahedron.html   The main web page document.
normalize.css	    The Cascading Style Sheet (generic from w3schoools.com free download.)
style.css	    	The Cascading Style Sheet (specific, all my code.)
math.js				The class definition file for Camera, Vec3, Vec4, Quat, Mat4, (3D graphics matrix math library.)
utils.js			Utility library of functions.
Dodecahedron.js		The 3D data set for geometry, GLSL shader programs & WebGL code.

Reworked to run with my libraries: math.js & utils.js
A Dodecahedron has 20 vertices & 12 faces, opposite of an Icosahedron.

Notes: 

1       After body loads, <body onload="setupWebGL();"> you are sent to function setupWebGL() in utils.js.
        It sets up canvas & gl variables, adds event listeners, ... & calls below. 

2       Next you are sent to function setupGraphicsPipeline() in CubeImg.js.
        The shaders are loaded, compiled & WebGL commands are called.
        
Shaders run compiled code directly on the graphics card!



*/

objOrigin.z = -22;

const positions = [ -2.753,0,0.5257,       2.753,0,-0.5257,       -0.8507,-2.618,0.5257,    -0.8507,2.618,0.5257, 
                    2.227,-1.618,0.5257,   2.227,1.618, 0.5257,   -0.5257,-1.618,2.227,     -0.5257,1.618,2.227,
                    -1.376,-1.000,-2.227,  -1.376,1.000,-2.227,   1.376,-1.000,2.227,       1.376,1.000,2.227,
                    1.701,0,-2.227,        -2.227,-1.618,-0.5257, -2.227,1.618,-0.5257,     -1.701,0,2.227,
                    0.5257,-1.618,-2.227,  0.5257,1.618,-2.227,   0.8507,-2.618,-0.5257,    0.8507,2.618,-0.5257 ],
	
	  indices = [ [14,9,8,13,0],[1,5,11,10,4],[4,10,6,2,18],[10,11,7,15,6],[11,5,19,3,7],[5,1,12,17,19],
                [1,4,18,16,12],[3,19,17,9,14],[17,12,16,8,9],[16,18,2,13,8],[2,6,15,0,13],[15,7,3,14,0] ],

      modelViewMatrix = new Mat4();

var nFaces = indices.length,
    normalLocation,
    modelViewMatrixLocation,
    normals = [];

function setupGraphicsPipeline()
{
   logEvent("Entering function setupGraphicsPipeline()");
   logEvent(new Date().toLocaleTimeString());
   var app = [], i = j = n = nx = ny = nz = v0 = v1 = v2 = 0.0;
    
   const prog = gl.createProgram(),
         indicesBuffer = gl.createBuffer(),
         positionsBuffer = gl.createBuffer(),
         projectionMatrix = Mat4.perspective(fieldOfView, aspectRatio, NEAR_PLANE, FAR_PLANE);
   
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
   gl.bindBuffer(gl.ARRAY_BUFFER,         positionsBuffer);
   gl.attachShader(prog, getShader(gl, 'vsSource'));
   gl.attachShader(prog, getShader(gl, 'fvSource'));
   gl.linkProgram(prog);
   gl.useProgram(prog);

   var positionsLocation = gl.getAttribLocation(prog, 'aVertexPosition');
   gl.enableVertexAttribArray(positionsLocation);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
   gl.vertexAttribPointer(positionsLocation, 3, gl.FLOAT, false, 0, 0);

   for(i=0; i<nFaces; i++)
   {
      app = app.concat(indices[i]);
   }

   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(app), gl.STATIC_DRAW);
   normalLocation = gl.getUniformLocation(prog,'uNormalMatrix');
   
   for(i=0; i<nFaces; i++)
   {
     j = 3*indices[i][0];
     v0 = positions.slice(j,j+3);
     j = 3*indices[i][1];
     v1 = positions.slice(j,j+3);
     j = 3*indices[i][2];
     v2 = positions.slice(j,j+3);
     nx = (v1[1]-v0[1])*(v2[2]-v0[2]) - (v2[1]-v0[1])*(v1[2]-v0[2]);
     ny =-(v1[0]-v0[0])*(v2[2]-v0[2]) + (v2[0]-v0[0])*(v1[2]-v0[2]);
     nz = (v1[0]-v0[0])*(v2[1]-v0[1]) - (v2[0]-v0[0])*(v1[1]-v0[1]);
     n = Math.sqrt(nx*nx + ny*ny + nz*nz);
     normals[i] = [nx/n, ny/n, nz/n];
   }

   gl.uniformMatrix4fv(gl.getUniformLocation(prog,'uProjectionMatrix'), false, projectionMatrix);
   modelViewMatrixLocation = gl.getUniformLocation(prog,'uModelViewMatrix');
   gl.clearDepth(1.0);
   gl.enable(gl.DEPTH_TEST);
   gl.clearColor(0.0, 0.0, 0.0, 0.0);

   drawScene();
}

function drawScene()
{
    var i = off = 0;
    
/*

objOrigin is a new Vec3() class object created in utils.js.

var objOrigin = new Vec3(0, 0, -5);

My 3D Graphics Library for matrix math is file: 'math.js' & accepts Vec3(), Vec4(), & Array[]'s.
The origin is a get set accessor!

rotation is the amount of angle rotation in radians.

    (x, y, z)
The {1, 0, 0] is the axis to rotate about (x-axis.)
The {0, 1, 0] is the axis to rotate about (y-axis.)
The {0, 0, 1] is the axis to rotate about (z-axis.)

*/   
 
    
    modelViewMatrix.origin = objOrigin;
    modelViewMatrix.rotate(xRot/5,    [1, 0, 0]);  
    modelViewMatrix.rotate(yRot/5,    [0, 1, 0]);
    modelViewMatrix.rotate(zRot, [0, 0, 1]);
    
    xRot = yRot = zRot = 0.0;
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

    for(i=0; i<nFaces; i++)
    {
      gl.uniform3fv(normalLocation, normals[i]);
      gl.drawElements(gl.TRIANGLE_FAN, indices[i].length, gl.UNSIGNED_SHORT, off);
      off += 2 * indices[i].length;
    }
    gl.flush();
}

// eof