'use client';

import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import toast from "react-hot-toast";
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import EditVideo from "./EditVideo"; // Adjust the path as necessary
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
import ReactPlayer from 'react-player';
import { motion } from "framer-motion"; // Import framer-motion

const VideoCard = ({ file, onSave }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDownloadClick = () => {
    window.open(file.fileURL, "_blank");
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleDeleteConfirm = async () => {
    try {
      const fileRef = doc(db, "VideoLinks", file.id);
      await deleteDoc(fileRef);
      toast.success("File deleted successfully");
      onSave(); // Refresh the list after deletion
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
        className="dark:bg-gray-800 border w-[23em] dark:border-gray-700 rounded-md overflow-hidden"
      >
        <ReactPlayer
          url={file.videoURL}
          width="300"
          height="200px"
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                controls: 1,
                showinfo: 0,
                rel: 0,
              },
            },
          }}
        />
        <div className="p-3 border-t dark:border-gray-700 flex items-center content-center justify-between">
          <p className="dark:text-gray-200 text-xs w-[80%] line-clamp-1 font-medium">
            {file.videoName}
          </p>

          <button
            onClick={toggleEditModal}
            className="flex items-center justify-center rounded-full"
          >
            <FiEdit className="dark:text-white" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="flex items-center justify-center rounded-full"
              >
                <FiTrash className="dark:text-white" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className='rounded-md'>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your video.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="dark:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>


      <EditVideo
        isOpen={showEditModal}
        onClose={toggleEditModal}
        file={file}
        onSave={onSave}
      />
    </>
  );
};

export default VideoCard;
