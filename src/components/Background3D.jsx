import { useEffect, useRef } from 'react';

function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0;
    let animId;
    const stars = [];
    const nodes = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        z: Math.random() * 1000,
        px: 0,
        py: 0
      });
    }

    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        color: ['#a78bfa','#60a5fa','#34d399','#f59e0b','#ec4899'][i % 5]
      });
    }

    function draw() {
      t += 0.008;

      ctx.fillStyle = 'rgba(8, 8, 20, 0.15)';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const fov = 400;

      stars.forEach(s => {
        s.z -= 2.5;
        if (s.z <= 0) {
          s.x = Math.random() * 2000 - 1000;
          s.y = Math.random() * 2000 - 1000;
          s.z = 1000;
        }
        const sx = (s.x / s.z) * fov + cx;
        const sy = (s.y / s.z) * fov + cy;
        const r = Math.max(0.2, (1 - s.z / 1000) * 2.5);
        const alpha = Math.min(1, (1 - s.z / 1000) * 1.5);

        if (sx > 0 && sx < W && sy > 0 && sy < H) {
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180,160,255,' + alpha + ')';
          ctx.fill();

          if (s.px && r > 1.5) {
            ctx.beginPath();
            ctx.moveTo(s.px, s.py);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = 'rgba(140,120,255,' + (alpha * 0.4) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          s.px = sx;
          s.py = sy;
        }
      });

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(124,58,237,' + ((1 - dist / 200) * 0.3) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = a.color;
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(124,58,237,0.04)';
      ctx.lineWidth = 1;
      const gSize = 60;
      for (let x = 0; x < W; x += gSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}

export default Background3D;