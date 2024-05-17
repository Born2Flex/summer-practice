// components/Footer.tsx

import React from 'react';

function generateSinusoidPoints(amplitude: number, frequency: number, phase: number, numPoints: number): string {
  const points: string[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const x: number = +(i / numPoints * 100).toFixed(2);
    const y: number = +(amplitude * Math.sin((2 * Math.PI * frequency * x) / 100 + phase) + 50).toFixed(2);
    points.push(`${x}% ${y}%`);
  }
  return points.join(', ');
}

const Footer: React.FC = () => {
  const sinusoidPoints = generateSinusoidPoints(10, 6, 0, 100);
  const rotationAngle = 180;

  return (
    <footer className="text-gray-300 h-fit">
        <div 
        className='bottom-full w-full h-[100px] bg-gradient-to-r from-primary via-neutral to-secondary'
        style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})`, transform: `rotate(${rotationAngle}deg)`  }}
        >
        </div>

      <div className="w-full flex justify-between items-center bg-gradient-to-r from-secondary via-neutral to-secondary py-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p>Contact us: example@example.com</p>
          </div>
          <div>
            <a href="#">About Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
