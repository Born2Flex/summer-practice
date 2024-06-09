import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { getUserId } from '../../auth';

const Footer: React.FC = () => {
  const userId = getUserId() || "12345";
  return (
    <>

      <footer className="relative text-gray-300 h-fit">
        <div className="absolute top-0 w-full h-0.5 bg-gray-800/10 z-10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>

        <div className="mx-auto text-xl bg-green-50/70 py-8">
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
                <Link to={`/profile/${userId}`} className='w-fit'>Your Profile</Link>
                <Link to="#" className='w-fit'>About Us</Link>
              </div>
            </div>
          </div>
        </div>
      </footer></>
  );
};

export default Footer;


