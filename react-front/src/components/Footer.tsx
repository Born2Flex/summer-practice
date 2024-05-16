// components/Footer.tsx

import React from 'react';

function generateSinusoidPoints(amplitude: number, frequency: number, phase: number, numPoints: number): string {
  const points: string[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const x: number = +(i / numPoints * 100).toFixed(2);
    const y: number = +(amplitude * Math.sin((2 * Math.PI * frequency * x) / 100 + phase) + 50).toFixed(2);
    points.push(`${x}% ${y}%`); // Обратная синусоида: 100 - y
  }
  return points.join(', ');
}

const Footer: React.FC = () => {
  const sinusoidPoints = generateSinusoidPoints(10, 6, 0, 100);

  return (
    <footer className="relative text-gray-300  h-fit flex flex-col ">
        <div 
        className='relative bottom-full w-full h-[100px] bg-gray-900'
        style={{ clipPath: `polygon(0% 100%, 0% 100%, ${sinusoidPoints})` }}
        >
        <div 
        className='absolute w-full bg-gray-900'
        ></div>

        </div>

      <div className=" w-full flex justify-between items-center bg-gray-900 py-8">
        <div>
          <p>Contact us: example@example.com</p>
        </div>
        <div>
          <a href="#">About Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
