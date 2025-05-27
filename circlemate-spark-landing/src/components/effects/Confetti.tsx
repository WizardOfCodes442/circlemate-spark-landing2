
import { useEffect, useRef } from "react";

interface ConfettiProps {
  duration?: number;
  pieces?: number;
}

const Confetti = ({ duration = 3000, pieces = 200 }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Confetti colors
    const colors = ['#0ea5e9', '#22d3ee', '#10b981', '#a855f7', '#f97316'];
    
    // Create confetti pieces
    const confettiPieces = Array.from({ length: pieces }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100, // Start above the viewport
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 2 * Math.PI,
      rotation: Math.random() * 0.2 - 0.1,
      opacity: 1
    }));
    
    // Animation start time
    const startTime = Date.now();
    
    // Animation function
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime > duration) {
        return; // Stop animation after duration
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw confetti
      confettiPieces.forEach((piece, i) => {
        // Update position
        piece.y += piece.speed;
        piece.x += Math.sin(piece.angle) * 1.5;
        piece.angle += piece.rotation;
        
        // Fade out towards the end of the animation
        if (elapsedTime > duration * 0.7) {
          piece.opacity = 1 - ((elapsedTime - duration * 0.7) / (duration * 0.3));
        }
        
        // Draw confetti piece
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.angle);
        ctx.globalAlpha = piece.opacity;
        ctx.fillStyle = piece.color;
        
        // Randomly draw different shapes
        const shape = i % 3;
        if (shape === 0) {
          // Rectangle
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size / 2);
        } else if (shape === 1) {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, piece.size / 2, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -piece.size / 2);
          ctx.lineTo(piece.size / 2, piece.size / 2);
          ctx.lineTo(-piece.size / 2, piece.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
  }, [duration, pieces]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default Confetti;
