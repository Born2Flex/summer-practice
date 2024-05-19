// components/Footer.tsx

/*import React from 'react';

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
        className='bottom-full w-full h-[100px] bg-gradient-to-r from-secondary via-neutral to-secondary'
        style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})`, transform: `rotate(${rotationAngle}deg)`  }}
        >
        </div>

      <div className="w-full flex justify-between items-center bg-gradient-to-r from-secondary via-neutral to-secondary py-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-black">
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

export default Footer;*/

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

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
        className='bottom-full w-full h-[100px] bg-gradient-to-r from-secondary via-neutral to-secondary'
        style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})`, transform: `rotate(${rotationAngle}deg)` }}
      >
      </div>
      <div className="mx-auto text-xl bg-gradient-to-r from-secondary via-neutral to-secondary py-8">
        <div className="max-w-2xl w-fit mx-auto grid grid-cols-1 md:grid-cols-2 text-black justify-center">
          <div className="flex flex-col items-center">
            <div>
            <p>Contact us: eventifyteam@gmail.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} className="text-black hover:text-gray-700" size="2x" />
              </a>
              <a href="https://www.twitter.com" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} className="text-black hover:text-gray-700" size="2x" />
              </a>
              <a href="https://www.instagram.com" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="text-black hover:text-gray-700" size="2x" />
              </a>
              <a href="https://www.linkedin.com" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="text-black hover:text-gray-700" size="2x" />
              </a>
            </div>
            </div>
          </div>
          <div className="flex flex-col justify-between md:justify-between items-start md:items-center">
            <div className="flex flex-col justify-between md:justify-between items-start">
              <Link to="/events" className='w-fit'>Explore Events</Link>
              <Link to="/profile" className='w-fit'>Your Profile</Link>
              <Link to="#" className='w-fit'>About Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


