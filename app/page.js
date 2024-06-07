'use client'
import { useState, useRef } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Secondpage from "./pages/Secondpage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Spinner from "./Main/components/Spinner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleLinkClick = () => {
    setLoading(true);
  };

  const handleScrollClick = () => {
    if (scrollRef.current) {
      window.scrollTo({
        top: scrollRef.current.offsetTop - 80, // Adjust the offset as needed
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="w-full h-full">
      <Header />
      <div className="p-4">
        <section className="w-full mt-16 md:mt-12 h-full md:p-12 rounded-md">
          <div className="border p-2 items-center flex-col content-center justify-center flex rounded-2xl bg-blue-600 h-[25em]">
            <h1 className="md:text-7xl text-4xl font-bold text-white">Are Your Preparing</h1>
            <span className="text-white ml-7">for</span>
            <div className="flex flex-row items-center content-center">
              <h1 className="text-white text-4xl md:text-7xl font-bold flex items-center content-center">IIT-JEE <span className="text-sm mx-2">OR</span> NEET</h1>
            </div>
            <span className="text-xs text-center text-white my-4">Then You Are At The Right Place</span>
            <div className="flex items-center content-center justify-center mt-4 gap-4">
              <Link href='/Main' onClick={handleLinkClick} className='bg-white p-2 transition-all w-32 h-12 flex items-center justify-center content-center hover:bg-gray-100 text-sm px-4 rounded-md text-gray-600'>
                <span>{loading ? <Spinner /> : "Get Started"}</span>
              </Link>
              <Button className='border-white rounded-md text-white border' onClick={handleScrollClick}>Know More</Button>
            </div>
          </div>
        </section>
      </div>

      <section ref={scrollRef} className="mt-20">
        <h1 className="text-2xl font-bold flex items-center content-center justify-center">Why To Choose Us ?</h1>
        <div className="flex items-center content-center justify-center">
          <Secondpage />
        </div>
      </section>
    </main>
  );
}
