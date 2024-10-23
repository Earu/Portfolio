import { createRef, HTMLAttributes, useEffect, useState } from "react"

const positions = [
	-1, -1,  // Bottom left
	1, -1,  // Bottom right
	-1, 1,  // Top left
	1, 1   // Top right
];

function createShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) return null;

	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("Shader compile failed: ", gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

function initCanvas(canvas: HTMLCanvasElement, gl: WebGLRenderingContext, fragmentShaderSource?: string, vertexShaderSource?: string) {
	if (!fragmentShaderSource) return;

	if (!vertexShaderSource) {
		vertexShaderSource = `
		attribute vec4 a_position;
		void main() {
			gl_Position = a_position;
		}`;
	}


	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	const program = gl.createProgram();

	if (program && vertexShader && fragmentShader) {
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error("Program link failed: ", gl.getProgramInfoLog(program));
			gl.deleteProgram(program);
		}

		gl.useProgram(program);

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		const positionLocation = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
		const iTimeLocation = gl.getUniformLocation(program, "iTime");

		function render(time: number) {
			if (!canvas || !gl) return;

			gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
			gl.uniform1f(iTimeLocation, time * 0.001);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);

		// Set the canvas size and scale by device pixel ratio
		function resizeCanvas() {
			const devicePixelRatio = window.devicePixelRatio || 1;

			canvas.width = window.innerWidth * devicePixelRatio;
			canvas.height = window.innerHeight * devicePixelRatio;

			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
		}

		// Resize the canvas on window resize
		//window.addEventListener('resize', resizeCanvas);
		//resizeCanvas();  // Call once to set up on load
	}
}

interface ShaderProps {
	fragmentShader?: string;
	vertextShader?: string;
}

export default function Shader({ fragmentShader, vertextShader, ...props }: ShaderProps & HTMLAttributes<HTMLCanvasElement>): JSX.Element {
	const ref = createRef<HTMLCanvasElement>();
	let [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (loaded) return;

		setLoaded(true);

		const canvas = ref.current;
		const gl = canvas?.getContext("webgl");
		if (canvas && gl) {
			initCanvas(canvas, gl, fragmentShader, vertextShader);
		}
	});

	return <canvas ref={ref} {...props} />;
}