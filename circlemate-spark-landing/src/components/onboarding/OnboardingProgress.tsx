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
    ctx.strokeStyle = '#e5e7eb'; // Light gray background
    ctx.stroke();

    // Draw progress bar
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width * progress, height / 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0ea5e9'; // Primary color
    ctx.stroke();

  }, [currentStep, totalSteps]);

  return (
    <div className="w-full overflow-visible">
      <canvas
        ref={canvasRef}
        width={800}
        height={60}
        className="w-full h-12"
      ></canvas>
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        <span>{totalSteps} steps</span>
      </div>
    </div>
  );
};

export default OnboardingProgress;
