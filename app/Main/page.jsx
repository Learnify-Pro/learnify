import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {

  const CardLinks = [
    { label: "IIT-JEE", link: "/Main/iit-jee", img: "/iit-bombay.jpg" },
    { label: "NEET", link: "/Main/neet", img: "/aiims-delhi.jpg" },
  ]

  return (
    <div>
      <section className="p-4 w-full h-full">
        <Card className='flex items-center content-center'>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Welcome To the Wonderful Website Where You Can Find All Your Resources To Ease Your Preparation...
            </CardDescription>
          </CardHeader>
        </Card>
        <h1 className='p-4 text-2xl font-semibold'>Choose Your Path</h1>

        <ul className='flex items-center justify-center mt-2 flex-row content-center flex-wrap'>
          {CardLinks.map((item, i) => (
            <Link href={item.link} key={i} className='m-1'>
              <Card className="relative sm:w-[27em] w-[21em] h-[15em] sm:h-[15em] flex items-center justify-center overflow-hidden">
                <Image src={item.img} alt='logo' fill style={{ objectFit: 'cover' }} className='absolute inset-0 z-0' />
                <div className='absolute inset-0 bg-black bg-opacity-60 z-10'></div>
                <span className='absolute z-20 text-xl font-bold text-white'>{item.label}</span>
              </Card>
            </Link>
          ))}
        </ul>

      </section>
    </div>
  )
}

export default page
