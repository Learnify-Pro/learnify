'use client';

import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { motion } from "framer-motion"; // Import framer-motion

const VideoCard = ({ file, onSave }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="dark:bg-gray-800 border dark:border-gray-700 rounded-md overflow-hidden"
      >
        <ReactPlayer
          url={file.videoURL}
          width="350px"
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
          <p className="dark:text-gray-200 text-xs w-60 line-clamp-1 font-medium">
            {file.videoName}
          </p>

          
        </div>
      </motion.div>


    </>
  );
};

export default VideoCard;
