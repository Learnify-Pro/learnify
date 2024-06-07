'use client'
import React from 'react';
import { FaLightbulb, FaBookOpen, FaFlask, FaChalkboardTeacher } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';

const AboutUs = () => {
  return (
    <main>
        <Header />
        <div className='mt-16'>
    <motion.section
      className="w-full h-full bg-white py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold text-black mb-4 ml-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        About Us
      </motion.h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <p className="mb-4 text-gray-600">
          We are your one-stop destination for all your IIT-JEE and NEET
          preparation needs. Our platform offers a comprehensive collection of
          Previous Year Questions (PYQs), reference books, NCERT textbooks,
          flashcards, and popular, easy-to-understand one-shot summaries on each
          topic.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">What We Offer:</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-600">
          <li>
            <FaLightbulb className="inline-block mr-2" />
            Extensive collection of IIT-JEE and NEET Previous Year Questions
            (PYQs)
          </li>
          <li>
            <FaBookOpen className="inline-block mr-2" />
            Reference books to supplement your preparation
          </li>
          <li>
            <FaFlask className="inline-block mr-2" />
            NCERT textbooks for a strong foundation
          </li>
          <li>
            <FaChalkboardTeacher className="inline-block mr-2" />
            Flashcards for quick revision
          </li>
          <li>
            <FaLightbulb className="inline-block mr-2" />
            Concise and understandable one-shot summaries on every topic
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Why Choose Us:</h2>
        <p className="mb-4 text-gray-600">
          We are dedicated to providing you with the resources and tools you need
          to excel in your IIT-JEE and NEET exams. Our platform is designed to
          simplify your preparation process and enhance your understanding of
          key concepts.
        </p>
        <p className="text-gray-600">
          Join us on this journey towards academic success and let us help you
          achieve your goals!
        </p>
      </div>
    </motion.section></div>
    </main>
  );
};

export default AboutUs;