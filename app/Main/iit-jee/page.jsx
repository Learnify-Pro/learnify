'use client'
import { Card } from '@/components/ui/card'
import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';
import { IoMdDocument } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const page = () => {
  const data = [
    { label: "Access All Best PDF's From the Internet", desc: "Find all best PDF'S available in the internet from the best Ed-Tech Companies", link: "/Main/iit-jee/pdf", icon: < IoMdDocument /> },
    { label: "Watch Best Chapter Videos from Youtube", desc: "Get Access to all best videos for all chapters from YouTube", link: "/Main/iit-jee/videos", icon: <FaPlay /> },
    { label: "Make Your Revision Faster", desc: "Make your revision faster with the help of FlashCards from top Institutions", link: "/Main/iit-jee/flashcards", icon: < IoMdDocument /> },
  ]

  const Images = [
    { label: "IIT-Bombay", img: "/iit-bombay.jpg" },
    { label: "IIT-Delhi", img: "/iit-delhi.jpg" },
    { label: "IIT-Kanpur", img: "/iit-kanpur.jpg" },
    { label: "IIT-Kharagpur", img: "/iit-kargpur.jpg" },
  ]

  return (
    <div className="w-full h-full p-4">
      <Card className="w-full flex p-4 items-center justify-center">
        <h2 className="font-semibold text-3xl">IIT-JEE</h2>
      </Card>
      <ul className="flex flex-row gap-2 items-center justify-center flex-wrap">
        {data.map((item, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={i}
          >
            <Link href={item.link}>
              <Card className="w-[22em] p-8 rounded-md mt-2 hover:shadow-xl transition-all relative">
                <h1 className="font-bold text-2xl">{item.label}</h1>
                <span className="text-gray-300 py-2 text-xs line-clamp-2">{item.desc}</span>
                <span className="text-blue-600 underline p-2 mt-2 pl-0 text-xs flex items-center">
                  Click here to Visit <FaArrowRight className="text-xs ml-2 hover:translate-x-2 transition-all" />
                </span>
                <div className="absolute right-4 bottom-4 bg-blue-600 rounded-full flex items-center justify-center p-4">
                  <span className="text-white text-2xl">{item.icon}</span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </ul>

      <h1 className='text-xl font-semibold p-4 pb-0 ml-4'>Some Photos For You</h1>
      <div className="p-4 pt-2 md:pt-2 md:p-12">
        <Carousel>
          <CarouselContent> 
            {Images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full md:h-[30em] h-64">
                  <Image src={image.img} alt={image.label} fill style={{ objectFit: 'cover' }} className="rounded-md" />
                  <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full text-center rounded-b-md">
                    {image.label}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent> 
        </Carousel>
      </div>
    </div>
  )
}

export default page
