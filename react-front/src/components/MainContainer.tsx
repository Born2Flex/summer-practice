import { useState } from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

function generateSinusoidPoints(amplitude: number, frequency: number, phase: number, numPoints: number): string {
  const points: string[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const x: number = +(i / numPoints * 100).toFixed(2);
    const y: number = +(amplitude * Math.sin((2 * Math.PI * frequency * x) / 100 + phase) + 90).toFixed(2);
    points.push(`${x}% ${y}%`);
  }
  return points.join(', ');
}


const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  const sinusoidPoints = generateSinusoidPoints(5, 0.9, Math.PI, 100);

  //bg-gradient-to-r from-danger via-neutral to-danger

  return (
    <div className="relative bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
    style={{ background: 'radial-gradient(circle at bottom right, #1B512D, #0f0f0f)' }}>
      <div className="relative "
            style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})` }}
      >
        <img src={imageUrl} alt={title} className="w-full h-auto" />
      </div>
      <div className="px-6 pb-6 w-fit ">
        <h3 className="text-white font-semibold text-2xl mb-3">{title}</h3>
        <p className="text-white text-lg">{description}</p>
      </div>
    </div>
  );
};

interface MainContainerProps {
  cards: CardProps[];
}

const MainContainer: React.FC<MainContainerProps> = ({ cards }) => {
  return (
    <div className="h-fi p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};


export default MainContainer;
