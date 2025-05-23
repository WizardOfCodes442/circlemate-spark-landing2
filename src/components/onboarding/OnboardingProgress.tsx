
import { useRef, useEffect } from "react";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const progress = currentStep / totalSteps;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background track
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#e5e7eb'; // Light gray for background
    ctx.stroke();
    
    // Draw progress line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width * progress, height / 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0ea5e9'; // Primary color
    ctx.stroke();
    
    // Draw dots for each step
    const dotRadius = 8;
    for (let i = 0; i < totalSteps; i++) {
      const x = (width / (totalSteps - 1)) * i;
      const y = height / 2;
      
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
      
      if (i < currentStep) {
        // Completed steps
        ctx.fillStyle = '#0ea5e9'; // Primary color
      } else if (i === currentStep) {
        // Current step
        ctx.fillStyle = '#0ea5e9'; // Primary color
        // Add pulsing effect to current dot
        const pulseSize = dotRadius + 4;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.3)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#0ea5e9';
      } else {
        // Future steps
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#e5e7eb';
      }
      
      ctx.fill();
      if (i > currentStep) ctx.stroke();
    }
  }, [currentStep, totalSteps]);
  
  return (
    <div className="w-full overflow-visible">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={45} 
        className="w-full h-10"
      ></canvas>
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>Step {currentStep + 1}</span>
        <span>{totalSteps} steps</span>
      </div>
    </div>
  );
};

export default OnboardingProgress;
