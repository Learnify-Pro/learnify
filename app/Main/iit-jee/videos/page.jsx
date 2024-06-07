'use client'
import { Card } from '@/components/ui/card'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';
import { FaPlay } from "react-icons/fa";

const page = () => {
  const data = [
    { label: "Mathematics", desc: "Get All Mathematics Videos On One Click", link: "/Main/iit-jee/videos/math", icon: < FaPlay /> },
    { label: "Physics", desc: "Get All Physics Videos On One Click", link: "/Main/iit-jee/videos/physics", icon: < FaPlay /> },
    { label: "Chemistry", desc: "Get All Chemistry Videos On One Click", link: "/Main/iit-jee/videos/chemistry", icon: < FaPlay /> },
    { label: "All Videos", desc: "Get Access To All the Videos", link: "/Main/iit-jee/videos/all-videos", icon: <FaPlay /> },

  ]
  return (
    <div className="w-full h-full p-4">
      <ul className="flex flex-row gap-2 items-center justify-center flex-wrap">
        {data.map((item, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={i}
          >
            <Link href={item.link}>
              <Card className="w-[20em] p-8 rounded-md mt-2 hover:shadow-xl transition-all relative">
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
    </div>
  )
}

export default page
