'use client'
import React, { useState, useEffect } from "react";
import { LuDownload } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import AakashImg from "@/public/aakash.jpg";
import PwImg from "@/public/pw.jpg";
import UnacademyImg from "@/public/unacademy.jpg";
import VedantuImg from "@/public/vedantu.jpg";
import NarayanaImg from "@/public/narayana.jpg";
import InfinitylearnImg from "@/public/infinitylearn.jpg";
import MathonGoImg from "@/public/mathongo.jpg";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const institutionImages = {
  "Aakash": AakashImg,
  "Physics Wallah": PwImg,
  "Unacademy": UnacademyImg,
  "Vedantu": VedantuImg,
  "Narayana": NarayanaImg,
  "Infinity Learn": InfinitylearnImg,
  "MathonGo": MathonGoImg,
};

const PdfCard = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!file.institution || !institutionImages[file.institution]) {
      setLoading(false);
    }
  }, [file.institution]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleDownloadClick = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white border w-72 h-48 border-gray-200 rounded-md overflow-hidden">
        {file.institution && institutionImages[file.institution] ? (
          <>
            {loading && (
              <div className="flex justify-center items-center h-36 bg-gray-100">
                <div className="spinner"></div>
              </div>
            )}
            <img
              src={institutionImages[file.institution].src}
              alt={file.institution}
              className={`w-full h-36 object-cover ${loading ? 'hidden' : 'block'}`}
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-36 bg-gray-100">
            <FaFilePdf className="text-red-600 text-6xl" />
          </div>
        )}
        <div className="p-4 py-2 border-t border-gray-200 flex flex-wrap items-center justify-between">
          <Image src='/pdf.png' height={20} alt="pdf" width={20} />
          <p className="text-gray-800 text-xs w-48 line-clamp-1 font-medium truncate">{file.name}</p>
          <a
            href={file.downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center p-1 rounded-full border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
            onClick={handleDownloadClick}
          >
            <LuDownload className="text-gray-500" />
          </a>
        </div>
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className='w-full flex items-center content-center justify-center'>
            <DrawerTitle>Thanks for downloading</DrawerTitle>
          </DrawerHeader>
          <div className="w-full h-60 flex p-4 py-0 justify-center items-center">
            <div className="w-[25em] h-full p-4 ">
              <div className="flex flex-col items-center justify-center">
                <Image src='/party.svg' width={200} height={100} alt="image" className="w-40" />
                <span className="text-xs flex items-center content-center justify-center p-4 text-gray-300">Thanks For Downloading File From Our Website. Hope Its Useful for You</span>
              </div>
            </div>
          </div>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PdfCard;
