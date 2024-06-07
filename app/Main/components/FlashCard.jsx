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
import { motion } from "framer-motion";

const institutionImages = {
    "Aakash": AakashImg,
    "Physics Wallah": PwImg,
    "Unacademy": UnacademyImg,
    "Vedantu": VedantuImg,
    "Narayana": NarayanaImg,
    "Infinity Learn": InfinitylearnImg,
    "MathonGo": MathonGoImg,
};

const FlashCard = ({ file, onSave }) => {
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        if (!file.institution || !institutionImages[file.institution]) {
            setLoading(false);
        }
    }, [file.institution]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleDownloadClick = () => {
        window.open(file.fileURL, "_blank");
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border w-72 h-48 border-gray-200 rounded-md overflow-hidden"
            >
                {file.institution && institutionImages[file.institution] ? (
                    <>
                        {loading && (
                            <div className="flex justify-center items-center h-36 bg-gray-100">
                                <div className="spinner"></div>
                            </div>
                        )}
                        <div className={`w-full h-36 ${loading ? "hidden" : "block"}`}>
                            <Image
                                src={institutionImages[file.institution].src}
                                alt={file.institution}
                                layout="fill"
                                objectFit="cover"
                                onLoadingComplete={handleImageLoad}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-36 bg-gray-100">
                        <FaFilePdf className="text-red-600 text-6xl" />
                    </div>
                )}
                <div className="p-3 border-t border-gray-200 flex items-center content-center justify-between">
                    <Image src="/pdf.png" height={20} alt="pdf" width={20} />
                    <p className="text-gray-800 text-xs w-38 mt-1 line-clamp-1 font-medium">
                        {file.fileName}
                    </p>
                    <button
                        onClick={handleDownloadClick}
                        className="flex items-center justify-center rounded-full"
                    >
                        <LuDownload className="text-gray-500" />
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default FlashCard;
