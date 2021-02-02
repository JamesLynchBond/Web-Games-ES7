


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


	Notes: Incorporate the vertex normals into this program to clean up ships paint job.
	Great shader code here from the golden platos solids!


	const vsSource = `
	attribute vec3 aPos;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform vec3 uNormalMatrix;
	varying vec4 vPos;
	varying vec3 vRotationNormal;
	void main(void)
	{
	   vPos = uModelViewMatrix * vec4(aPos, 1.);
	   vRotationNormal = (uModelViewMatrix * vec4(uNormalMatrix, 0.)).xyz;
	   gl_Position = uProjectionMatrix * vPos;
	}`;
	 
	const fsSource = `
	precision mediump float;
	varying vec3 vRotationNormal;
	varying vec4 vPos;
	const vec3 posSpec = vec3(1., 1., -1.);
	void main(void)
	{
	   vec3 view = - normalize(vPos.xyz);
	   float i = max(0., dot(vRotationNormal, view));
	   vec4 color = vec4(.9*i, .5*i, 0., 1.);
	   i = .7 * pow(max(0., dot(vRotationNormal, normalize(normalize(posSpec-vPos.xyz) + view))), 150.);
	   color += vec4(i, i, i, 0.);
	   gl_FragColor = color;
}`;



*/

objOrigin.z = -44;

function drawScene(){}                  // stub dummy program function

function setupGraphicsPipeline()        // called from function setupWebGL(); in utils.js.
{                                       // which is itself called from <body onload='setupWebGL();'>





const vsSource = `
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
void main(void)
{
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}`,

fsSource = `
void main(void)
{
  gl_FragColor = vec4 (1, 0, 0, 1);     // red colored ship
}`;







	const shaderProgram = createShaderProgram(gl, vsSource, fsSource),

    programInfo =
    {
		program: shaderProgram,
		attribLocations:
        {
			vertexPosition:   gl.getAttribLocation(shaderProgram, 'aVertexPosition')
		},
		uniformLocations:
        {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix:  gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
		}
	},
    buffers = createShip(gl);             // found in file utils.js

    function render(now)
    {
        now *= 0.001;

        const deltaTime = now - then;
        then = now;

        const projectionMatrix = Mat4.perspective(fieldOfView, aspectRatio, NEAR_PLANE, FAR_PLANE),
	          modelViewMatrix = new Mat4();

        modelViewMatrix.origin = objOrigin;
        modelViewMatrix.rotate(rotation,     [1, 0, 0]);        // see the identity matrix
        modelViewMatrix.rotate(rotation,     [0, 1, 0]);
        modelViewMatrix.rotate(rotation*0.5, [0, 0, 1]);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

        gl.useProgram(programInfo.program);
        gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,  false, modelViewMatrix);

        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
        
        gl.drawElements(gl.TRIANGLES, 72, gl.UNSIGNED_SHORT, 0);

        rotation += deltaTime;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

//  end of file Ship-3D.js
