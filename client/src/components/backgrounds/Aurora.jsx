import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Aurora.css';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uSpeed;
uniform float uBlend;
uniform float uAmplitude;

varying vec2 vUv;

// Noise function for organic movement
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = noise(i);
  float b = noise(i + vec2(1.0, 0.0));
  float c = noise(i + vec2(0.0, 1.0));
  float d = noise(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for (int i = 0; i < 5; i++) {
    value += amplitude * smoothNoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;
  
  // Create flowing aurora waves
  float time = uTime * uSpeed * 0.3;
  
  // Multiple layers of noise for depth
  float wave1 = fbm(vec2(p.x * 2.0 + time * 0.5, p.y * 1.5 + time * 0.3));
  float wave2 = fbm(vec2(p.x * 1.5 - time * 0.4, p.y * 2.0 - time * 0.2));
  float wave3 = fbm(vec2(p.x * 2.5 + time * 0.6, p.y * 1.8 + time * 0.4));
  
  // Combine waves with amplitude
  float combined = (wave1 + wave2 * 0.7 + wave3 * 0.5) * uAmplitude;
  
  // Vertical gradient for aurora curtain effect
  float vertical = smoothstep(0.3, 0.7, uv.y);
  combined *= vertical;
  
  // Color mixing based on wave patterns
  vec3 color1Mix = uColor1 * wave1;
  vec3 color2Mix = uColor2 * wave2;
  vec3 color3Mix = uColor3 * wave3;
  
  // Blend colors with the blend parameter
  vec3 finalColor = mix(
    color1Mix + color2Mix + color3Mix,
    (color1Mix + color2Mix + color3Mix) * combined,
    uBlend
  );
  
  // Add glow effect
  float glow = pow(combined, 2.0) * 0.5;
  finalColor += glow * mix(uColor1, uColor2, 0.5);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const hexToRGB = (hex) => {
  const c = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};

export default function Aurora({
  colorStops = ['#00ff88', '#0088ff', '#ff00ff'],
  speed = 1.0,
  blend = 0.5,
  amplitude = 1.0,
  ...rest
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    console.log('Aurora: Initializing with props', { colorStops, speed, blend, amplitude });
    
    const container = containerRef.current;
    if (!container) return;

    let renderer, gl, program, mesh;

    try {
      renderer = new Renderer({
        dpr: window.devicePixelRatio || 1,
        alpha: true,
        antialias: true
      });
      
      gl = renderer.gl;
      if (!gl) {
        console.warn('Aurora: WebGL not available, skipping background');
        return;
      }

      const canvas = gl.canvas;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      // Parse colors
      const colors = colorStops.slice(0, 3);
      while (colors.length < 3) colors.push(colors[colors.length - 1] || '#ffffff');
      const [color1, color2, color3] = colors.map(hexToRGB);

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight] },
        uColor1: { value: color1 },
        uColor2: { value: color2 },
        uColor3: { value: color3 },
        uSpeed: { value: speed },
        uBlend: { value: blend },
        uAmplitude: { value: amplitude }
      };

      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms
      });

      const geometry = new Triangle(gl);
      mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
      };

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      const loop = (t) => {
        rafRef.current = requestAnimationFrame(loop);
        uniforms.uTime.value = t * 0.001;
        
        try {
          renderer.render({ scene: mesh });
        } catch (e) {
          console.error('Aurora: Render error', e);
        }
      };

      rafRef.current = requestAnimationFrame(loop);

      return () => {
        console.log('Aurora: Cleaning up');
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        if (canvas.parentElement === container) {
          container.removeChild(canvas);
        }
        if (program && typeof program.remove === 'function') program.remove();
        if (geometry && typeof geometry.remove === 'function') geometry.remove();
        if (mesh && typeof mesh.remove === 'function') mesh.remove();
        if (renderer && typeof renderer.destroy === 'function') renderer.destroy();
      };
    } catch (error) {
      console.warn('Aurora: Failed to initialize WebGL background', error);
      return () => {};
    }
  }, [colorStops, speed, blend, amplitude]);

  return <div ref={containerRef} className="aurora-container" {...rest} />;
}
