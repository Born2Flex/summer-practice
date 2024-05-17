// components/MainContainer.tsx

/*import React from 'react';

interface CardProps {
  header: string;
  text: string;
  imageUrl: string;
  imageOnRight?: boolean;
}

const Card: React.FC<CardProps> = ({ header, text, imageUrl, imageOnRight }) => {
  return (
    <div className="bg-green-400 rounded-lg shadow-lg flex flex-col md:flex-row mb-8">
      {imageOnRight ? (
        <>
          <div className="md:w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-2">{header}</h2>
            <p>{text}</p>
          </div>
          <div className="md:w-1/3">
            <img src={imageUrl} alt={header} className="rounded-lg shadow-lg" />
          </div>
        </>
      ) : (
        <>
          <div className="md:w-1/3">
            <img src={imageUrl} alt={header} className="rounded-lg shadow-lg" />
          </div>
          <div className="md:w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-2">{header}</h2>
            <p>{text}</p>
          </div>
        </>
      )}
    </div>
  );
};

interface MainContainerProps {
  cards: CardProps[];
}

const MainContainer: React.FC<MainContainerProps> = ({ cards }) => {
  return (
    <div className="bg-opacity-50 bg-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        {cards.map((card, index) => (
          <Card key={index} {...card} imageOnRight={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default MainContainer;*/

import React, { useEffect, useState } from 'react';

/*interface CardProps {
  header: string;
  text: string;
  imageUrl: string;
  imageOnRight?: boolean;
}

const Card: React.FC<CardProps> = ({ header, text, imageUrl, imageOnRight }) => {
  return (
    <div className="bg-green-400 rounded-lg shadow-lg flex flex-col md:flex-row mb-8">
      {imageOnRight ? (
        <>
          <div className="md:w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-2">{header}</h2>
            <p>{text}</p>
          </div>
          <div className="md:w-1/3">
            <img src={imageUrl} alt={header} className="rounded-lg shadow-lg h-full" />
          </div>
        </>
      ) : (
        <>
          <div className="md:w-1/3">
            <img src={imageUrl} alt={header} className="rounded-lg shadow-lg h-full" />
          </div>
          <div className="md:w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-2">{header}</h2>
            <p>{text}</p>
          </div>
        </>
      )}
    </div>
  );
};*/


/*interface CardProps {
  header: string;
  text: string;
  imageUrl: string;
  imageOnRight?: boolean;
}*/

/*const Card: React.FC<CardProps> = ({ header, text, imageUrl, imageOnRight }) => {
  return (
    <div className="bg-green-400 rounded-lg shadow-lg flex flex-row md:flex-row mb-8 relative overflow-visible">
      <div className={`md:w-2/3 p-4 ${imageOnRight ? 'order-2' : 'order-1'}`}>
      <div className={`p-4 justify-start`}>
        <h2 className="text-2xl font-bold mb-2">{header}</h2>
        <p>{text}</p>
      </div>
      <div className={`w-[10%]`}>
        <div className="absolute top-1 h-[120%] bottom-0 -right-[50%] overflow-visible">
          <img src={imageUrl} alt={header} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};*/

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  //gradientColors: string[];
}


const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="relative bg-gray-800 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-secondary via-neutral to-secondary">
      <div className="relative clip-path-polygon">
        <img src={imageUrl} alt={title} className="w-full h-auto" />
      </div>
      <div className="p-6 w-fit ">
        <h3 className="text-white font-semibold text-2xl mb-3">{title}</h3>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black" 
        />
    </div>
  );
};



/*const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [gradientX, setGradientX] = useState(50);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovered) {
      const card = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - card.left;
      const offsetX = mouseX / card.width;
      setGradientX(offsetX * 100);
    }
  };

  return (
    <div
      className="relative bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="relative clip-path-polygon">
        <img src={imageUrl} alt={title} className="w-full h-auto" />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: isHovered
              ? `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.6) ${gradientX}%, rgba(0,0,0,0.6) 100%)`
              : 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.6) 100%)'
          }}
        />
      </div>
      <div className="p-6 w-fit">
        <h3 className="text-white font-semibold text-2xl mb-3">{title}</h3>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>
    </div>
  );
};*/


/*const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  const [gradientCoords, setGradientCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradientCoords({ x, y });
  };

  const gradientColor1 = `rgb(${gradientCoords.x}, ${gradientCoords.y}, 100)`;
  const gradientColor2 = `rgb(${gradientCoords.x + 50}, ${gradientCoords.y + 50}, 150)`;

  return (
    <div 
      className="relative bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
      onMouseMove={handleMouseMove}
    >
      <div className="relative clip-path-polygon z-10">
        <img src={imageUrl} alt={title} className="w-full h-auto" />
        <div className="absolute top-0 left-0 w-full h-full to-black" />
      </div>
      <div className="p-6 w-fit z-10">
        <h3 className="text-white font-semibold text-2xl mb-3">{title}</h3>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>
      <div 
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black z-0"
        style={{ backgroundImage: `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})` }}
      />
    </div>
  );
};*/

interface MainContainerProps {
  cards: CardProps[];
}

/*const MainContainer: React.FC<MainContainerProps> = ({ cards }) => {
  return (
    <div className="bg-opacity-50 bg-gray-200 p-8 flex flex-col justify-center items-center">
      <div className="max-w-4xl flex flex-col items-center justify-center">
        {cards.map((card, index) => (
          <Card key={index} {...card} 
          />
        ))}
      </div>
    </div>
  );
};*/

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
