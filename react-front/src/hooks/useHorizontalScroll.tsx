import { useRef, useEffect } from "react";

// useHorizontalScroll hook, handles horizontal scrolling on profile page
export default function useHorizontalScroll<T extends HTMLElement>() {
    const elRef = useRef<T>(null);
    const scrollInterval = useRef<number | null>(null);

    // useEffect hook to handle scrolling on page load
    useEffect(() => {
        const el = elRef.current;
        let scrollAmount = 1;

        const startAutoScroll = () => {
            if (scrollInterval.current !== null) {
                clearInterval(scrollInterval.current);
            }

            scrollInterval.current = window.setInterval(() => {
                if (el) {
                    el.scrollLeft += scrollAmount;

                    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
                        scrollAmount = -1;
                    } else if (el.scrollLeft <= 1) {
                        scrollAmount = 1;
                    }
                }
            }, 30);
        };

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el?.scrollTo({
                left: el.scrollLeft + e.deltaY * 2,
                behavior: 'smooth',
            });

            if (scrollInterval.current !== null) {
                clearInterval(scrollInterval.current);
                scrollInterval.current = null;
            }

            setTimeout(() => {
                startAutoScroll();
            }, 3000);
        };

        if (el) {
            el.addEventListener('wheel', onWheel);
            startAutoScroll();
        }

        return () => {
            if (el) {
                el.removeEventListener('wheel', onWheel);
            }
            if (scrollInterval.current !== null) {
                clearInterval(scrollInterval.current);
                scrollInterval.current = null;
            }
        };
    }, []);

    return elRef;
}
