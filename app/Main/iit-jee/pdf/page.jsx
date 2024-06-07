'use client'
import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import { db } from '@/firebase';
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import PdfCard from "@/app/Main/components/PDFCard";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; 
import { useRouter } from "next/navigation";
import LoadMore from "@/app/components/LoadMore";

const Page = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // New state for loading more files
  const [lastVisible, setLastVisible] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const fetchFiles = async (initial = false) => {
    if (initial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const filesQuery = initial ? query(collection(db, "FileLinks"), limit(10)) : query(collection(db, "FileLinks"), startAfter(lastVisible), limit(10));
    const querySnapshot = await getDocs(filesQuery);
    
    const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(prevFiles => initial ? filesList : [...prevFiles, ...filesList]);
    
    if (querySnapshot.docs.length > 0) {
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }

    setLoading(false);
    setLoadingMore(false); // Ensure to reset loading state
  };

  useEffect(() => {
    fetchFiles(true);
  }, []);

  const institutions = [
    "All Institutions", "OFFICIAL JEE", "MathonGo", "Physics Wallah", "Aakash", "Vedantu",
    "Unacademy", "Infinity Learn", "Narayana", "Others"
  ];

  const subjects = [
    "All Subjects", "JEE MAINS", "MAINS + ADVANCED", "JEE ADVANCED",  "MATH", "PHYSICS", "CHEMISTRY",
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredFiles = files.filter(file => {
    const institutionMatch = selectedInstitution === 'All Institutions' || (file.institution && file.institution.trim().toLowerCase() === selectedInstitution.trim().toLowerCase());
    const subjectMatch = selectedSubject === 'All Subjects' || (file.subject && file.subject.trim().toLowerCase() === selectedSubject.trim().toLowerCase());
    const tags = Array.isArray(file.tags) ? file.tags.map(tag => tag.toLowerCase()).join(' ') : (file.tags || '').toLowerCase();

    const isYearQuery = /^\d{4}$/.test(searchQuery); // Check if search query is a year
    const searchMatch = searchQuery === '' ||
      (isYearQuery ? (file.fileYear && file.fileYear.toString() === searchQuery) :
        (file.videoName && file.videoName.toLowerCase().includes(searchQuery)) || tags.includes(searchQuery));

    return institutionMatch && subjectMatch && searchMatch;
  });

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <Card className="w-full flex p-4 items-center content-center justify-center">
        <h2 className="font-semibold text-3xl ml-12">PDF</h2>
      </Card>
      <div className="ml-2">
        <div className="flex gap-1 overflow-x-auto flex-shrink-0 mt-2">
          {institutions.map((institution, index) => (
            <Button
              key={index}
              className={`bg-gray-100 text-black dark:text-white dark:bg-transparent text-xs dark:border-gray-700 border rounded-md p-2 px-4 hover:bg-gray-200 ${institution === selectedInstitution ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
              onClick={() => {
                setSelectedInstitution(institution);
              }}
            >
              {institution}
            </Button>
          ))}
        </div>
      </div>
      <div className="ml-2 mt-4">
        <div className="flex gap-1 overflow-x-auto flex-shrink-0 mt-2">
          {subjects.map((subject, index) => (
            <Button
              key={index}
              className={`bg-gray-100 text-black dark:text-white text-xs dark:bg-transparent dark:border-gray-700 border rounded-md p-2 px-4 hover:bg-gray-200 ${subject === selectedSubject ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
              onClick={() => {
                setSelectedSubject(subject);
              }}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button className="mr-2 hidden md:flex ml-2 absolute left-8 border text-xl rounded-md p-2" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <span className="mr-2 ml-2 border text-xl rounded-md p-2">
          <IoSearch />
        </span>
        <Input
          placeholder='Search by name or year...'
          className='w-[23em] mr-4 pl-8'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <motion.div
        className="flex flex-wrap justify-center gap-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="flex flex-row flex-wrap items-center content-center justify-center gap-4 p-4">
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
          </div>
        ) : (
          filteredFiles.length > 0 ? (
            filteredFiles.map(file => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PdfCard key={file.id} file={file} onSave={fetchFiles} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center w-full flex flex-col items-center content mt-8 justify-center">
                <Image src='/Notfound.svg' alt="not found" width={200} height={100} />
                <p className="text-gray-500 mt-8">No PDF'S found.</p>
              </div>
            </motion.div>
          )
        )}
        {loadingMore && (
          <div className="flex flex-row flex-wrap items-center content-center justify-center gap-4 p-4">
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
            <Skeleton className="h-48 w-72 rounded-xl" />
          </div>
        )}
      </motion.div>
      {hasMore && !loading && !loadingMore && (
        <LoadMore fetchMore={() => fetchFiles(false)} />
      )}
    </div>
  );
};

export default Page;
