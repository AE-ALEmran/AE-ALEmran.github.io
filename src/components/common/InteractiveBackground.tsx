import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

interface Photon {
  fromNode: number;
  toNode: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

export const InteractiveBackground: React.FC = () => {
  const { theme } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default offscreen)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170, // Interaction radius in pixels
      active: false,
    };

    // Responsive node count
    const getNodeCount = () => {
      const area = width * height;
      if (width < 768) return Math.floor(area / 24000); // Mobile ~30 nodes
      return Math.min(65, Math.floor(area / 18000)); // Desktop ~50-65 nodes
    };

    // Dark vs Light color palettes
    const isDark = theme === 'dark';
    const nodeColors = isDark
      ? ['#38bdf8', '#0ea5e9', '#818cf8', '#34d399', '#67e8f9'] // Cyan, Sky, Indigo, Emerald
      : ['#0284c7', '#0369a1', '#6366f1', '#059669', '#0891b2']; // Crisp slate-blues

    // Generate nodes
    const nodeCount = getNodeCount();
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 1.6 + 1.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Optical Photons (pulses traveling along connections)
    const photons: Photon[] = [];
    const maxPhotons = 8;

    const spawnPhoton = (connections: [number, number][]) => {
      if (connections.length === 0 || photons.length >= maxPhotons) return;
      if (Math.random() > 0.04) return; // Spawn chance per frame

      const pair = connections[Math.floor(Math.random() * connections.length)];
      photons.push({
        fromNode: pair[0],
        toNode: pair[1],
        progress: 0,
        speed: Math.random() * 0.012 + 0.008,
        color: isDark ? '#7dd3fc' : '#0284c7',
      });
    };

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let lastTime = performance.now();
    const connectionDist = 135; // Maximum distance to draw line

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse interpolation (spring feel)
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient cursor glow if active
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        glowGrad.addColorStop(
          0,
          isDark ? 'rgba(56, 189, 248, 0.07)' : 'rgba(2, 132, 199, 0.05)'
        );
        glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Track active connections for photon traveling
      const activeConnections: [number, number][] = [];

      // 2. Update and draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            activeConnections.push([i, j]);
            const alpha = (1 - dist / connectionDist) * (isDark ? 0.22 : 0.16);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connection to mouse (interactive web)
        if (mouse.active) {
          const mdx = mouse.x - a.x;
          const mdy = mouse.y - a.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const mAlpha = (1 - mdist / mouse.radius) * (isDark ? 0.38 : 0.26);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(125, 211, 252, ${mAlpha})`
              : `rgba(3, 105, 161, ${mAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();

            // Gentle repulsion/attraction force
            const force = (1 - mdist / mouse.radius) * 1.5;
            a.vx -= (mdx / mdist) * force * 0.12;
            a.vy -= (mdy / mdist) * force * 0.12;
          }
        }
      }

      // 3. Update and draw traveling optical photons
      spawnPhoton(activeConnections);
      for (let pIdx = photons.length - 1; pIdx >= 0; pIdx--) {
        const p = photons[pIdx];
        p.progress += p.speed;

        if (p.progress >= 1 || !nodes[p.fromNode] || !nodes[p.toNode]) {
          photons.splice(pIdx, 1);
          continue;
        }

        const nodeA = nodes[p.fromNode];
        const nodeB = nodes[p.toNode];
        const px = nodeA.x + (nodeB.x - nodeA.x) * p.progress;
        const py = nodeA.y + (nodeB.y - nodeA.y) * p.progress;

        // Draw photon glow
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }

      // 4. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Pulse size subtly
        n.pulsePhase += dt * 1.5;
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 0.4;

        // Apply velocity with air friction dampening
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.99;
        n.vy *= 0.99;

        // Keep min movement
        if (Math.abs(n.vx) < 0.1) n.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(n.vy) < 0.1) n.vy += (Math.random() - 0.5) * 0.1;

        // Bounce off canvas edges smoothly
        if (n.x < 0) {
          n.x = 0;
          n.vx = Math.abs(n.vx);
        } else if (n.x > width) {
          n.x = width;
          n.vx = -Math.abs(n.vx);
        }

        if (n.y < 0) {
          n.y = 0;
          n.vy = Math.abs(n.vy);
        } else if (n.y > height) {
          n.y = height;
          n.vy = -Math.abs(n.vy);
        }

        // Draw node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.8, n.radius), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when tab is not visible (battery/CPU saver)
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic ambient soft blur orbs in background */}
      <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-brand-600/12 via-sky-500/8 to-transparent blur-[110px] animate-pulse-subtle pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-br from-indigo-600/10 via-brand-500/8 to-transparent blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-[-10%] left-[25%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/8 via-sky-600/6 to-transparent blur-[115px] pointer-events-none" />

      {/* High-tech circuit / grid overlay pattern with radial mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Interactive Neural & Optical Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </div>
  );
};
