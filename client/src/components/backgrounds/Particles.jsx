import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Geometry, Transform, Vec3, Camera, Mat4 } from 'ogl';
import './Particles.css';

const vertexShader = `
attribute vec3 position;
attribute vec3 color;
attribute float alpha;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uPointSize;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = color;
  vAlpha = alpha;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uPointSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Create circular particles
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  
  if (dist > 0.5) {
    discard;
  }
  
  // Soft edge
  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
  
  gl_FragColor = vec4(vColor, alpha);
}
`;

const hexToRGB = (hex) => {
  const c = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ['#ffffff'],
  moveParticlesOnHover = false,
  alphaParticles = false,
  particleBaseSize = 100,
  cameraDistance = 20,
  disableRotation = false,
  ...rest
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Particles: Initializing with props', {
      particleCount,
      particleSpread,
      speed,
      particleColors,
      moveParticlesOnHover,
      alphaParticles,
      particleBaseSize,
      cameraDistance,
      disableRotation
    });

    const container = containerRef.current;
    if (!container) return;

    let renderer, gl, program, particles, scene;

    try {
      renderer = new Renderer({
        dpr: window.devicePixelRatio || 1,
        alpha: true,
        antialias: true
      });

      gl = renderer.gl;
      if (!gl) {
        console.warn('Particles: WebGL not available, skipping background');
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      const canvas = gl.canvas;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      // Create camera
      const camera = new Camera(gl, { fov: 45 });
      camera.position.z = cameraDistance;

      // Create scene
      scene = new Transform();

      // Generate particle data
      const positions = [];
      const colors = [];
      const alphas = [];
      const velocities = [];

      const colorList = particleColors.length > 0 ? particleColors : ['#ffffff'];

      for (let i = 0; i < particleCount; i++) {
        // Random position within spread
        const x = (Math.random() - 0.5) * particleSpread;
        const y = (Math.random() - 0.5) * particleSpread;
        const z = (Math.random() - 0.5) * particleSpread;
        positions.push(x, y, z);

        // Random color from palette
        const colorHex = colorList[Math.floor(Math.random() * colorList.length)];
        const rgb = hexToRGB(colorHex);
        colors.push(...rgb);

        // Random alpha if enabled
        const alpha = alphaParticles ? Math.random() * 0.5 + 0.5 : 1.0;
        alphas.push(alpha);

        // Random velocity for animation
        velocities.push(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        );
      }

      const geometry = new Geometry(gl, {
        position: { size: 3, data: new Float32Array(positions) },
        color: { size: 3, data: new Float32Array(colors) },
        alpha: { size: 1, data: new Float32Array(alphas) }
      });

      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uPointSize: { value: particleBaseSize },
          modelViewMatrix: { value: new Mat4() },
          projectionMatrix: { value: new Mat4() }
        },
        transparent: true,
        depthTest: false
      });

      particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
      particles.setParent(scene);

      // Store velocities for animation
      particles.velocities = velocities;
      particles.originalPositions = [...positions];

      const updateCamera = () => {
        camera.perspective({
          aspect: gl.canvas.width / gl.canvas.height
        });
        program.uniforms.projectionMatrix.value.copy(camera.projectionMatrix);
      };

      const resize = () => {
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        updateCamera();
      };

      resize();
      updateCamera();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };

      if (moveParticlesOnHover) {
        container.addEventListener('mousemove', onMouseMove);
      }

      let time = 0;
      const loop = (t) => {
        rafRef.current = requestAnimationFrame(loop);
        time += speed;

        // Update particle positions
        const pos = geometry.attributes.position.data;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Animate with velocities
          pos[i3] += particles.velocities[i3] * speed;
          pos[i3 + 1] += particles.velocities[i3 + 1] * speed;
          pos[i3 + 2] += particles.velocities[i3 + 2] * speed;

          // Wrap around boundaries
          const limit = particleSpread / 2;
          if (Math.abs(pos[i3]) > limit) pos[i3] = -pos[i3];
          if (Math.abs(pos[i3 + 1]) > limit) pos[i3 + 1] = -pos[i3 + 1];
          if (Math.abs(pos[i3 + 2]) > limit) pos[i3 + 2] = -pos[i3 + 2];

          // Mouse interaction
          if (moveParticlesOnHover) {
            const dx = mouseRef.current.x * 5 - pos[i3];
            const dy = mouseRef.current.y * 5 - pos[i3 + 1];
            pos[i3] += dx * 0.01;
            pos[i3 + 1] += dy * 0.01;
          }
        }
        geometry.attributes.position.needsUpdate = true;

        // Rotate scene
        if (!disableRotation) {
          scene.rotation.y = time * 0.001;
          scene.rotation.x = Math.sin(time * 0.0005) * 0.2;
        }

        // Update camera view matrix
        camera.updateMatrixWorld();
        
        // Combine camera view with scene rotation
        const viewMatrix = camera.viewMatrix;
        const modelMatrix = scene.worldMatrix;
        
        // Calculate modelViewMatrix = viewMatrix * modelMatrix
        program.uniforms.modelViewMatrix.value.copy(viewMatrix);
        program.uniforms.modelViewMatrix.value.multiply(modelMatrix);

        try {
          gl.clear(gl.COLOR_BUFFER_BIT);
          renderer.render({ scene: particles, camera });
        } catch (e) {
          console.error('Particles: Render error', e);
        }
      };

      rafRef.current = requestAnimationFrame(loop);

      return () => {
        console.log('Particles: Cleaning up');
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        if (moveParticlesOnHover) {
          container.removeEventListener('mousemove', onMouseMove);
        }
        if (canvas.parentElement === container) {
          container.removeChild(canvas);
        }
        if (program && typeof program.remove === 'function') program.remove();
        if (geometry && typeof geometry.remove === 'function') geometry.remove();
        if (particles && typeof particles.remove === 'function') particles.remove();
        if (renderer && typeof renderer.destroy === 'function') renderer.destroy();
      };
    } catch (error) {
      console.warn('Particles: Failed to initialize WebGL background', error);
      return () => {};
    }
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    alphaParticles,
    particleBaseSize,
    cameraDistance,
    disableRotation
  ]);

  return <div ref={containerRef} className="particles-container" {...rest} />;
}
