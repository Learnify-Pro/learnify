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
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditModal from "./EditModal"; // Adjust the path as necessary
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

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const handleDeleteConfirm = async () => {
        try {
            const fileRef = doc(db, "FileLinks", file.id);
            await deleteDoc(fileRef);
            toast.success("File deleted successfully");
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error("Failed to delete file");
        }
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
                        <Image
                            src={institutionImages[file.institution]}
                            alt={file.institution}
                            layout="fill"
                            objectFit="cover"
                            className={`w-full h-36 object-cover ${loading ? "hidden" : "block"}`}
                            onLoad={handleImageLoad}
                        />
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
                    <button
                        onClick={toggleEditModal}
                        className="flex items-center justify-center rounded-full"
                    >
                        <FiEdit className="text-gray-500" />
                    </button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                className="flex items-center justify-center rounded-full"
                            >
                                <FiTrash className="text-gray-500" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your file.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </motion.div>

            <EditModal
                isOpen={showEditModal}
                onClose={toggleEditModal}
                file={file}
                onSave={onSave}
            />
        </>
    );
};

export default PdfCard;
