"use client"; // Add at the top of the file to make it a client component

import React, { useState, useEffect } from "react";
import { LuDownload } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";
import { db } from "@/firebase";
import AakashImg from "@/public/aakash.jpg";
import PwImg from "@/public/pw.jpg";
import UnacademyImg from "@/public/unacademy.jpg";
import VedantuImg from "@/public/vedantu.jpg";
import NarayanaImg from "@/public/narayana.jpg";
import InfinitylearnImg from "@/public/infinitylearn.jpg";
import MathonGoImg from "@/public/mathongo.jpg";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { doc, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion"; // Import framer-motion
import { Progress } from "@/components/ui/progress"; // Import the Progress component
import { Card } from "@/components/ui/card";

const institutionImages = {
    "Aakash": AakashImg,
    "Physics Wallah": PwImg,
    "Unacademy": UnacademyImg,
    "Vedantu": VedantuImg,
    "Narayana": NarayanaImg,
    "Infinity Learn": InfinitylearnImg,
    "MathonGo": MathonGoImg,
};

const PdfCard = ({ file, onSave }) => {
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!file.institution || !institutionImages[file.institution]) {
            setLoading(false);
        }
    }, [file.institution]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const startProgress = () => {
        setShowProgress(true);
        setProgress(0);
        const timer = setInterval(() => setProgress(prev => Math.min(prev + 20, 100)), 1000);
        setTimeout(() => {
            clearInterval(timer);
            setShowProgress(false);
            openFile();
        }, 5000);
    };

    const openFile = () => {
        window.open(file.fileURL, "_blank");
    };

    const handleDownloadClick = () => {
        startProgress();
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border w-72 h-48 border-gray-200 rounded-md overflow-hidden relative"
            >
                {file.institution && institutionImages[file.institution] ? (
                    <>
                        {loading && (
                            <div className="flex justify-center items-center h-36 bg-gray-100">
                                <div className="spinner"></div>
                            </div>
                        )}
                        <Image
                            src={institutionImages[file.institution].src}
                            alt={file.institution}
                            layout="fill"
                            objectFit="cover"
                            className={loading ? "hidden" : "block"}
                            onLoadingComplete={handleImageLoad}
                        />
                    </>
                ) : (
                    <div className="flex justify-center items-center h-36">
                        <Image src="/pdf.png" height={50} alt="pdf" width={100} />
                    </div>
                )}
                <div className="p-3 border-t border-gray-200 flex items-center content-center justify-between">
                    <Image src="/pdf.png" height={20} alt="pdf" width={20} />
                    <p className="text-gray-800 text-xs w-46 mr-16 mt-1 ml-2 line-clamp-1 font-medium">
                        {file.fileName}
                    </p>

                    <button
                        className="flex items-center justify-center rounded-full"
                        onClick={handleDownloadClick}
                    >
                        <LuDownload className="text-gray-500" />
                    </button>
                </div>
                {showProgress && (
                    <div className="fixed z-40 top-0 left-0 w-screen h-screen inset-0 flex justify-center items-center bg-black bg-opacity-75">
                        <Card className='w-[21em] flex-col flex items-center content-center justify-center p-4 h-[10em] rounded-xl shadow-2xl'>
                            <span className="mb-8">Wait A Moment !</span>
                            <Progress value={progress} className="w-[90%]" />
                        </Card>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default PdfCard;
