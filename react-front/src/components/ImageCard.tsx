// components/ImageCard.tsx

import { Button } from '@material-tailwind/react';
import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { NavLink } from 'react-router-dom';
import BrowserMockup from './elements/BrowserMockup';
import ChartComponent from './elements/HomepageCards';
import StockChart from './elements/HomepageCards';
import Sponsors from './elements/Sponsors';

interface ImageCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

const data = {
  stockFullName: "SW Limited.",
  stockShortName: "ASX:SFW",
  price: {
    current: 2.32,
    open: 2.23,
    low: 2.215,
    high: 2.325,
    cap: 93765011,
    ratio: 20.1,
    dividend: 1.67,
  },
  chartData: {
    labels: [
      "10:00",
      "",
      "",
      "",
      "12:00",
      "",
      "",
      "",
      "2:00",
      "",
      "",
      "",
      "4:00",
    ],
    data: [
      2.23,
      2.215,
      2.22,
      2.25,
      2.245,
      2.27,
      2.28,
      2.29,
      2.3,
      2.29,
      2.325,
      2.325,
      2.32,
    ],
  },
};

// function generateSinusoidPoints(amplitude: number, frequency: number, phase: number, numPoints: number): string {
//   const points: string[] = [];
//   for (let i = 0; i <= numPoints; i++) {
//     const x: number = +(i / numPoints * 100).toFixed(2);
//     const y: number = +(amplitude * Math.sin((2 * Math.PI * frequency * x) / 100 + phase) + 50).toFixed(2);
//     points.push(`${x}% ${y}%`);
//   }
//   return points.join(', ');
// }

const ImageCard: React.FC<ImageCardProps> = () => {
  // const sinusoidPoints = generateSinusoidPoints(10, 6, 0, 100);

  // bg-gradient-to-r from-secondary via-neutral to-secondary

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-full h-fit flex flex-col py-10 px-4 bg-green-50/50 justify-center items-center">
        <div className='flex w-11/12 flex-col md:flex-row justify-center items-center divide-x-2 divide-gray-800/10 gap-x-20'>
          <div className='flex flex-col gap-y-8 w-2/5 items-center md:items-start'>
            <div>
              <h2 className="text-5xl font-bold mb-6">Start Your Journey</h2>
              <p className="text-3xl mb-4">Enjoy creating and sharing events!</p>
              <p>Our goal is to provide users with the ability to always have information
                about all events near their location, increasing the level of interaction between different social strata and groups.
              </p>
            </div>
            <NavLink to="/events">
              <Button
                variant="gradient"
                size="lg"
                className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                <span>Let's go!</span>
              </Button>
            </NavLink>
          </div>


          <div className='flex flex-1 justify-center items-center'>
            <BrowserMockup />
          </div>
        </div>

        <Sponsors />

        <div className="absolute bottom-0 w-full h-0.5 bg-gray-800/10 z-10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>

      </div>

      <div className="flex -mt-px -mb-px h-[2px] w-2/3 -scale-x-100 z-20">
        <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
      </div>

      {/* <div
        className='bg-gradient-to-r relative -top-1 w-full h-[100px] from-secondary via-neutral to-secondary'
        style={{ clipPath: `polygon(100% 0%, 0% 0%, ${sinusoidPoints})` }} /> */}

      {/* <StockChart info={data} /> */}

    </div>
  );
};

export default ImageCard;
