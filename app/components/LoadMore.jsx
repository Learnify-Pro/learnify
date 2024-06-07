'use client'
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LoadMore = ({ fetchMore }) => {
    const [ref, inView] = useInView();

    useEffect(() => {
        const fetchWithDelay = () => {
            setTimeout(() => {
                fetchMore();
            }, 2000); // 3 seconds delay
        };

        if (inView) {
            fetchWithDelay();
        }
    }, [inView, fetchMore]);

    return (
        <div ref={ref} className="flex justify-center p-4">
            <Image
                src='/spinner.svg'
                alt="spinner"
                width={25}
                height={25}
                className="animate-fast-spin"
            />
        </div>
    );
};

export default LoadMore;
