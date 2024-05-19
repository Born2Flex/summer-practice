// components/ImageCard.tsx

import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { NavLink } from 'react-router-dom';

interface ImageCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

function generateSinusoidPoints(amplitude: number, frequency: number, phase: number, numPoints: number): string {
  const points: string[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const x: number = +(i / numPoints * 100).toFixed(2);
    const y: number = +(amplitude * Math.sin((2 * Math.PI * frequency * x) / 100 + phase) + 50).toFixed(2);
    points.push(`${x}% ${y}%`);
  }
  return points.join(', ');
}

const ImageCard: React.FC<ImageCardProps> = ({ title, description, buttonText, imageUrl }) => {
  const sinusoidPoints = generateSinusoidPoints(10, 6, 0, 100);

  // bg-gradient-to-r from-secondary via-neutral to-secondary

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-full h-fit flex py-10 px-4 bg-radialGradient justify-center items-center animate-gradient">
        <div className='flex flex-col md:flex-row justify-center items-center lg:mx-[8%]'>
          <div className="mt-4 md:mt-0 w-fit flex flex-col justify-center items-center lg:mr-[12%]">
            <div>
            <div className='mb-[10%] w-fit items-center md:items-start'>
              <h2 className="text-5xl font-bold mb-6">{title}</h2>
              <p className="text-3xl mb-4">{description}</p>
            </div>

            {/*<button className="bg-danger w-fit text-3xl hover:bg-danger text-white font-bold py-2 px-4 rounded">
              {buttonText}
            </button>*/}
            <NavLink to="/events">
              <AwesomeButton type="primary" className='awesome-button-lg' >Start Journey</AwesomeButton>
            </NavLink>

            </div>
          </div>
          <div className='md:w-1/2 flex justify-center items-center'>
            <div className="md:w-full flex justify-center items-center">
                <img src={imageUrl} alt={title} className="rounded-lg maskedImage" />
            </div>
          </div>
        </div>
      </div>
      <div 
        className='bg-gradient-to-r relative -top-1 w-full h-[100px] from-secondary via-neutral to-secondary'
        style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})` }} /> 
    </div>
  );
};

export default ImageCard;
