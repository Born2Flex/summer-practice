import { useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MainNavigation from '../components/elements/MainNavigation';
import { useState } from "react";

function RootLayout() {
    const location = useLocation();



    const AnimatedOutlet: React.FC = () => {
        const o = useOutlet();
        const [outlet] = useState(o);

        return <>{outlet}</>;
    };

    const pageVariants = {
        initial: {
            opacity: 0,
            x: '100%',
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: '-100%',
        }
    };

    return (
        <div className='flex flex-col min-h-screen max-h-screen'>
            <div className={`bg-auth absolute w-full h-full -z-50 inset-0 bg-cover bg-bottom`} />
            <MainNavigation />
            <main className='flex flex-1 overflow-hidden'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        transition={{ type: 'tween', duration: 0.3 }}
                        className='flex flex-1'
                    >
                        <AnimatedOutlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default RootLayout;
