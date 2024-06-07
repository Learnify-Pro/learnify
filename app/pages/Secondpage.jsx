'use client'
import React from 'react'
import { IoMdDocument } from "react-icons/io";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'
import { LuDownload } from 'react-icons/lu';

const Secondpage = () => {
  const Features = [
    { id: 1, label: 'Best Collections', desc: "We have the best collection of PDFs from all institutions and the internet.", icon: <IoMdDocument /> },
    { id: 2, label: 'Many Videos', desc: "Access numerous videos related to your topic and prepare easily.", icon: <FaPlay /> },
    { id: 3, label: 'Easy FlashCards', desc: "Use FlashCards to boost your learning efficiency & save time.", icon: <IoMdDocument /> },
  ];

  const Benifits = [
    { title: "No Need to Browse" },
    { title: "Updated PYQs & Questions" },
    { title: "Popular Video Suggestions" },
    { title: "Comprehensive Topic Coverage" },
    { title: "Portion Updates" },
  ];

  const Motive = [
    { title: "Enhance Productivity and Time Management" },
    { title: "Streamline Study Process" },
    { title: "Boost Confidence and Exam Preparation" },
    { title: "Personalize Learning Experience" },
    { title: "Achieve Academic Goals" },
    { title: "Eliminate Distractions" },
  ];

  const Reasons = [
    { title: "Papers from All Ed-Tech Institutions" },
    { title: "Over 500+ Paper PDFs" },
    { title: "Detailed Solutions for Each Paper" },
    { title: "Categorized by Subject and Year" },
    { title: "Regularly Updated Papers and Trends" },
    { title: "Accessible Anytime, Anywhere" },
    { title: "Customized Practice by Difficulty Level" },
    { title: "Personalized Study Recommendations" },
    { title: "Interactive Practice Tests" },
  ];

  const Source = [
    { name: "Official Websites" },
    { name: "Physics Wallah" },
    { name: "Esarl" },
    { name: "MathonGo" },
    { name: "YouTube" },
    { name: "Social Media" },
  ];

  const animateImages = [
    { image: "/pw.jpg" },
    { image: "/mathongo.jpg" },
    { image: "/unacademy.jpg" },
    { image: "/aakash.jpg" },
    { image: "/vedantu.jpg" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <section className="w-full h-full p-2">
        <motion.ul
          className="flex items-center justify-center content-center gap-4 gap-y-2 flex-wrap mt-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {Features.map((item, i) => (
            <motion.li key={i} variants={itemVariants} className='mt-1'>
              <Card className="w-[22em] p-8 rounded-md mt-2 hover:shadow-xl transition-all relative">
                <h1 className="font-bold text-2xl">{item.label}</h1>
                <span className="text-gray-300 py-2 text-xs line-clamp-2 mb-12">{item.desc}</span>
                <div className="absolute right-4 bottom-4 m-2 bg-blue-600 rounded-full flex items-center justify-center p-4">
                  <span className="text-white text-2xl">{item.icon}</span>
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>

        <section className="w-full h-full mt-20 text-center">
          <motion.span
            className='text-2xl md:text-2xl font-bold text-gray-700 w-[10em] text-center mx-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            You Can Access All The PDFs And Material from the Top Institutions
          </motion.span>
          <div className="flex flex-wrap items-center content-center justify-around p-4">
            <ul className="flex flex-wrap justify-center items-center gap-4 mt-4 space-x-4">
              {animateImages.map((item, i) => (
                <li key={i} className="list-none">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="rounded-lg border hover:shadow-2xl  transition-all"
                  >
                    <Image
                      src={item.image}
                      alt='image'
                      width={200}
                      height={50}
                      className="rounded-lg"
                    />
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </section>


        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
              <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
                <div className="mx-auto max-w-md text-center lg:text-left">
                  <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Available Course PDF'S</h2>
                    <p className="mt-4 text-gray-500">
                      We currently offer two courses, but we're expanding our offerings. Stay tuned for more!
                    </p>
                  </header>

                  <Link
                    href="/Main"
                    className="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
                  >
                    View
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 lg:py-8">
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {['IIT-JEE', 'NEET'].map((course, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center content-center justify-center text-center border mx-4 rounded-xl p-4 "
                      variants={itemVariants}
                    >
                      <a href={course === 'IIT-JEE' ? '/Main/iit-jee' : '/Main/neet'} className="block">
                        <Image
                          src='/nta-logo.png'
                          alt="Image"
                          width={200}
                          height={200}
                          className="aspect-square w-full rounded object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="mt-3">
                          <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                            {course}
                          </h3>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      </section>

      <motion.section
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <div className="mt-20" id="features">
          <h1 className="p-4 px-24 text-4xl font-bold rounded-xl">Features</h1>
          <motion.div
            className="w-full h-full p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 rounded-md"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="w-[20em] h-[25em] border p-8 border-blue-600 shadow-lg rounded-md"
              variants={itemVariants}
            >
              <ul className="list-disc text-blue-500">
                {Reasons.map((item, i) => (
                  <li key={i} className="text-gray-500 my-2 text-sm font-semibold">
                    {item.title}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="w-[20em] h-fit border border-blue-600 p-8 shadow-lg rounded-md"
              variants={itemVariants}
            >
              <h1 className="text-xl text-blue-600 font-bold">Our Motive</h1>
              <ul className="list-disc text-blue-500 m-4">
                {Motive.map((item, i) => (
                  <li key={i} className="text-gray-500 text-sm font-semibold">
                    {item.title}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="w-[20em] h-fit border border-blue-600 p-8 shadow-lg rounded-md"
              variants={itemVariants}
            >
              <h1 className="text-xl text-blue-600 font-bold">Your Benefits</h1>
              <ul className="list-disc text-blue-500 m-4">
                {Benifits.map((item, i) => (
                  <li key={i} className="text-gray-500 text-sm font-semibold">
                    {item.title}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="w-[20em] h-fit border border-blue-600 p-8 shadow-lg rounded-md"
              variants={itemVariants}
            >
              <h1 className="text-xl text-blue-600 font-bold flex flex-col items-center justify-center">
                Let's Crack It
              </h1>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Secondpage;
