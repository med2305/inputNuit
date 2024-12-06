export class Wave {
  x: number;
  y: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;

  constructor(canvasHeight: number, index: number) {
    this.x = 0;
    this.y = canvasHeight / 2;
    this.amplitude = Math.random() * 20 + 10;
    this.frequency = Math.random() * 0.02 + 0.02;
    this.speed = Math.random() * 0.1 + 0.05;
    
    // Create a gradient of blues for different wave layers
    const alpha = 0.1 - (index * 0.015);
    this.color = `rgba(59, 130, 246, ${alpha})`;
  }

  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, time: number) {
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight);

    for (let x = 0; x < canvasWidth; x++) {
      const y = this.y + 
        Math.sin(x * this.frequency + time * this.speed) * this.amplitude +
        Math.sin(x * this.frequency * 0.5 + time * this.speed * 0.7) * (this.amplitude * 0.5);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}