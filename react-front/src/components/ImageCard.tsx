// components/ImageCard.tsx

import React from 'react';

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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full flex flex-col md:flex-row bg-gradient-to-r py-10 px-4 from-secondary via-neutral to-secondary">

        <div className="md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg mb-4">{description}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {buttonText}
          </button>
        </div>
        <div className="md:w-1/2 md:pr-8">
          <img src={imageUrl} alt={title} className="rounded-lg shadow-lg" />
        </div>
      </div>
      <div 
        className=' top-full bg-gradient-to-r w-full h-[100px] from-secondary via-neutral to-secondary'
        //style={{ clipPath: 'polygon(100% 0%, 0% 0% , 0% 65%, 1% 64.95%, 2% 64.8%, 3% 64.6%, 4% 64.3%, 5% 63.9%, 6% 63.45%, 7% 62.9%, 8% 62.25%, 9% 61.55%, 10% 60.8%, 11% 59.95%, 12% 59.05%, 13% 58.1%, 14% 57.1%, 15% 56.05%, 16% 55%, 17% 53.9%, 18% 52.8%, 19% 51.65%, 20% 50.5%, 21% 49.35%, 22% 48.2%, 23% 47.05%, 24% 45.9%, 25% 44.8%, 26% 43.75%, 27% 42.75%, 28% 41.75%, 29% 40.8%, 30% 39.9%, 31% 39.1%, 32% 38.35%, 33% 37.65%, 34% 37.05%, 35% 36.5%, 36% 36.05%, 37% 35.65%, 38% 35.35%, 39% 35.15%, 40% 35.05%, 41% 35%, 42% 35.05%, 43% 35.2%, 44% 35.45%, 45% 35.75%, 46% 36.15%, 47% 36.65%, 48% 37.2%, 49% 37.85%, 50% 38.55%, 51% 39.35%, 52% 40.2%, 53% 41.1%, 54% 42.05%, 55% 43.05%, 56% 44.1%, 57% 45.15%, 58% 46.3%, 59% 47.4%, 60% 48.55%, 61% 49.7%, 62% 50.85%, 63% 52%, 64% 53.15%, 65% 54.25%, 66% 55.35%, 67% 56.4%, 68% 57.45%, 69% 58.4%, 70% 59.35%, 71% 60.2%, 72% 61.05%, 73% 61.8%, 74% 62.45%, 75% 63.05%, 76% 63.6%, 77% 64.05%, 78% 64.4%, 79% 64.7%, 80% 64.85%, 81% 65%, 82% 65%, 83% 64.9%, 84% 64.75%, 85% 64.5%, 86% 64.2%, 87% 63.75%, 88% 63.25%, 89% 62.7%, 90% 62.05%, 91% 61.3%, 92% 60.5%, 93% 59.65%, 94% 58.75%, 95% 57.8%, 96% 56.8%, 97% 55.75%, 98% 54.65%, 99% 53.55%, 100% 52.4%)'}}     
        style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})` }}
        ></div>

    </div>
  );
};

export default ImageCard;
