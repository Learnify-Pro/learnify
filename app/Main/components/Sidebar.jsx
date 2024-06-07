'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';
import { LuPi, LuStethoscope } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { FiMenu, FiX } from 'react-icons/fi';
import { RiSideBarFill } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Sidebar = () => {
  const Navlinks = useMemo(() => [
    { id: '1', icon: <IoHomeOutline />, link: '/Main', name: 'Home' },
    { id: '2', icon: <LuPi />, link: '/Main/iit-jee', name: 'IIT JEE' },
    { id: '3', icon: <LuStethoscope />, link: '/Main/neet', name: 'NEET' },
    { id: '4', icon: <MdOutlineLocalPostOffice />, link: '/Main/news', name: 'News' },
    { id: '5', icon: <RiSideBarFill />, link: '#', name: 'Expand' },
  ], []);

  const [sidedNav, setSidedNav] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const pathname = usePathname();
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const getActiveIndex = useCallback(() => {
    const currentLink = Navlinks.find(item => item.link === pathname);
    return currentLink ? currentLink.id : '';
  }, [pathname, Navlinks]);

  const [activeIndex, setActiveIndex] = useState(getActiveIndex);

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [pathname, getActiveIndex]);

  const toggleNav = () => {
    setSidedNav(prevState => !prevState);
  };

  const toggleExpand = () => {
    setExpanded(prevExpanded => {
      setShowLogout(false);
      if (!prevExpanded) {
        setTimeout(() => {
          setShowLogout(true);
        }, 500);
      }
      return !prevExpanded;
    });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setSidedNav(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="relative z-40" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="fixed top-0 p-2 left-0 w-full h-16">
          <header className="border-2 bg-white dark:bg-gray-950 z-40 rounded-full shadow-sm border-gray-200 flex items-center content-center">
            <Button
              className={`bg-white hover:bg-gray-100 ml-5 p-2 text-black transition-all ${sidedNav ? '' : 'bg-gray-100'}`}
              onClick={toggleNav}
            >
              <div className={`text-2xl transition-transform duration-300 ease-in-out ${sidedNav ? '' : 'rotate-180'}`}>
                {sidedNav ? <FiMenu /> : <FiX />}
              </div>
            </Button>
            <Link href='/Main' className='p-2'>
              <span className='text-xl p-2 font-bold'>Learnify</span>
            </Link>
          </header>
        </div>
        <div
          className={`bg-white transition-all duration-300 ${expanded ? 'w-60' : 'w-16'} h-[80vh] mt-14 fixed top-4 border-2 border-gray-200 shadow-2xl z-40 shadow-gray-300 p-2 rounded-xl ${sidedNav ? '-left-80' : 'left-3'}`}
        >
          <div className="flex flex-col justify-between h-full">
            <ul>
              {Navlinks.slice(0, 4).map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <motion.li key={item.id} whileHover={{ scale: 1.02, x: 5 }}>
                      <Link href={item.link} passHref>
                        <motion.span
                          className={`flex items-center text-black mt-4 p-2 rounded-md transition-colors duration-300 ${activeIndex === item.id ? 'bg-gray-100' : ''}`}
                          onClick={() => setActiveIndex(item.id)}
                        >
                          <span className="z-10 text-black text-2xl">{item.icon}</span>
                          {expanded && <span className="ml-2">{item.name}</span>}
                        </motion.span>
                      </Link>
                    </motion.li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </ul>
            <div className="">
              <ul>
                {Navlinks.slice(4).map((item) => (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <motion.li key={item.id} whileHover={{ scale: 1.02, x: 5 }}>
                        {item.id !== '5' ? (
                          <Link href={item.link} passHref>
                            <motion.span
                              className={`flex items-center text-md text-black mt-4 p-2 rounded-md transition-colors duration-300 ${pathname === item.link ? 'bg-gray-100' : ''}`}
                            >
                              <span className="z-10 text-black text-2xl">{item.icon}</span>
                              {expanded && <span className="ml-2">{item.name}</span>}
                            </motion.span>
                          </Link>
                        ) : (
                          <motion.button
                            onClick={toggleExpand}
                            className={`flex items-center text-md text-black mt-4 p-2 rounded-md transition-colors duration-300 ${expanded ? '' : ''}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="z-10 text-black text-2xl">{item.icon}</span>
                            {expanded && <span className="ml-2">{item.name}</span>}
                          </motion.button>
                        )}
                      </motion.li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </ul>
            </div>
            {!sidedNav && (
              <div
                className="fixed top-20 left-20 animate-fade-in duration-1000 delay-200 w-16 h-[75vh] bg-transparent rounded-lg flex items-center justify-center cursor-pointer z-50"
                onClick={toggleNav}
              >
              </div>
            )}
          </div>
          <AnimatePresence>
            {showLogout && (
              <motion.div
                className={`flex items-center content-center rounded-full border-2 border-gray-200 bg-white p-2 justify-center mt-4 ${sidedNav ? '-left-40' : 'left'} transition-all`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="text-md text-black opacity-0 animate-fade-in"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <SignedIn>
                    <UserButton showName />
                  </SignedIn>
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
