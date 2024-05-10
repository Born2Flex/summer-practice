import React from 'react';
import bg from '../assets/auth-bg.jpg'

const FullScreenBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0">
      <div
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${bg})`,
                 filter: 'blur(5px) brightness(0.6)'
        }}>

        </div>
    </div>
  );
};

export default FullScreenBackground;
