'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Home, PlayCircle } from 'lucide-react'; // Importing Lucide icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 1 },
  };

  const pathname = usePathname();

  return (
    <div>
      <header className="w-full border-b h-16 z-40 bg-white dark:bg-gray-900 p-8 fixed top-0 left-0 z-60 flex justify-between items-center">
        <div className="flex items-center">
          <Link href='/' passHref>
            <span className="font-bold ml-8 mr-4 text-2xl">Learnify</span>
          </Link>
          <nav className="hidden md:flex mt-1">
            <NavigationMenu>
              <NavigationMenuList>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className='font-semibold text-lg flex items-center'>
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='p-4 flex'>
                    <NavigationMenuLink asChild>
                      <div className="bg-blue-600 w-80 h-[25em] p-4 align-bottom rounded-md flex items-end">
                        <span className='text-sm text-white'>Access all PDFs and videos which will be useful for you</span>
                      </div>
                    </NavigationMenuLink>
                    <div className="flex flex-col ml-4 space-y-2">
                      <NavigationMenuLink asChild>
                        <Link href="/Main/iit-jee/pdf" className='p-2 px-4 font-bold hover:bg-gray-100 rounded-md'>
                          PYQ'S
                          <p className='text-xs'>You can download all previous years' papers for free!</p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/Main/iit-jee/videos" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                          Videos
                          <p className='text-xs'>Explore a variety of educational videos of Youtube.</p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/Main/iit-jee/flashcards" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                          Easy FlashCards
                          <p className='text-xs'>Revise Quickly Thorugh FlashCards & Save Your Time</p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className='font-semibold text-lg'>
                    Course
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='p-4 flex flex-row space-y-2'>
                    <div className="flex flex-col">
                      <NavigationMenuLink asChild>
                        <Link href="/Main/iit-jee" className='p-2 px-4 w-60 font-bold hover:bg-gray-100 rounded-md'>
                          IIT-JEE
                          <p className='text-xs'>We Provide All The Material Required to boost Your Efficiency</p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/Main/neet" className='p-2 px-4 w-60 font-bold hover:bg-gray-100 rounded-md'>
                          NEET
                          <p className='text-xs'>Learn more about our features and benefits.</p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

          </nav>
        </div>

        <button className="md:hidden p-4 focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-gray-800 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


        <div className="absolute right-4">
          <Link href='/Main' className='bg-blue-600 text-white p-2 px-4 rounded-md'>
            Get Strated</Link>
        </div>

      </header>

      <AnimatePresence>
        {isOpen && (
          <>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden fixed top-16 left-0 w-full bg-white h-12 flex shadow-black items-center shadow-2xl dark:bg-gray-900 rounded-b-xl border-b z-30"
            >
              <NavigationMenu>
                <NavigationMenuList>

                  <NavigationMenuItem className='shadow-2xl'>
                    <NavigationMenuTrigger className='font-semibold text-lg flex items-center'>
                      <span className='p-2'>Features</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='p-4 flex'>
                      <NavigationMenuLink asChild>
                        <div className="bg-blue-600 w-60 h-[25em] p-4 align-bottom rounded-md flex items-end">
                          <span className='text-sm text-white'>Access all PDFs and videos which will be useful for you</span>
                        </div>
                      </NavigationMenuLink>
                      <div className="flex flex-col ml-4 space-y-2">
                        <NavigationMenuLink asChild>
                          <Link href="/" className='p-2 px-4 font-bold hover:bg-gray-100 rounded-md'>
                            PYQ'S
                            <p className='text-xs'>You can download all previous years' papers for free!</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/videos" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                            Videos
                            <p className='text-xs'>Explore a variety of educational videos.</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/tutorials" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                            Tutorials
                            <p className='text-xs'>Step-by-step tutorials on various topics.</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/articles" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                            Articles
                            <p className='text-xs'>Read insightful articles and blogs.</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/resources" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                            Resources
                            <p className='text-xs'>Access a collection of useful resources.</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/contact" className='p-2 px-4 hover:bg-gray-100 rounded-md'>
                            Contact Us
                            <p className='text-xs'>Get in touch with our support team.</p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='font-semibold text-lg'>
                      Course
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='p-4 flex flex-row space-y-0 space-x-2'>
                      <div className="flex flex-col space-y-2">
                        <NavigationMenuLink asChild>
                          <Link href="/" className='p-2 px-4 w-60 font-bold hover:bg-gray-100 rounded-md'>
                            IIT-JEE
                            <p className='text-xs'>Access comprehensive materials to enhance your preparation.</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/introduction" className='p-2 px-4 w-60 font-bold hover:bg-gray-100 rounded-md'>
                            NEET
                            <p className='text-xs'>Explore our extensive features and benefits for your success.</p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/faq" className='p-2 px-4 w-60 font-bold hover:bg-gray-100 rounded-md'>
                            TSIBE
                            <p className='text-xs'>Find answers to frequently asked questions.</p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>

                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>


            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
