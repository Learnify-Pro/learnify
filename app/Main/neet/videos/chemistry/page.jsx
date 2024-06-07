'use client';

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import VideoCard from "@/app/Main/components/VideoCard";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Page = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const fetchFiles = async () => {
    const querySnapshot = await getDocs(collection(db, "VideoLinks"));
    const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const mathFiles = filesList.filter(file => file.subject === 'CHEMISTRY');
    setFiles(mathFiles);
    setLoading(false);
  };
  useEffect(() => {
    fetchFiles();
  }, []);
 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleBackClick = () => {
    router.back();
  };

  const filteredFiles = files.filter(file => {
    const institutionMatch = selectedInstitution === 'All Institutions' || file.institution.trim().toLowerCase() === selectedInstitution.trim().toLowerCase();
    const subjectMatch = selectedSubject === 'All Subjects' || file.subject.trim().toLowerCase() === selectedSubject.trim().toLowerCase();
    const tags = Array.isArray(file.tags) ? file.tags.map(tag => tag.toLowerCase()).join(' ') : (file.tags || '').toLowerCase();
    const searchMatch = searchQuery === '' || file.videoName.toLowerCase().includes(searchQuery) || tags.includes(searchQuery);
    const isIITJEE = file.course.trim().toLowerCase() === 'neet';
    return institutionMatch && subjectMatch && searchMatch && isIITJEE;
  });

  return (
    <div>
      <div className="flex items-center justify-center mt-4">
        <button className="border p-2 absolute left-4  mt-4 rounded-md text-md hidden md:flex" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
        <h1 className="ml-2 font-semibold text-md  mt-4 absolute left-16 hidden md:flex">Videos</h1>
        <span className="mr-2 mt-4 ml-2 border text-xl  rounded-md p-2">
          <IoSearch />
        </span>
        <Input
          placeholder='Search...'
          className='w-[23em] mr-4 pl-8  mt-4'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-72 h-40" />
          ))
        ) : (
          filteredFiles.length > 0 ? (
            filteredFiles.map(file => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VideoCard file={file} onSave={fetchFiles} />
              </motion.div>
            ))
          ) : (
            <div className="text-center w-full">
              <p className="text-gray-500">No videos found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
