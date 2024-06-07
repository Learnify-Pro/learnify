'use client';

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import PdfCard from "../../components/PDFCard";

const Page = () => {
  const [files, setFiles] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFiles = async () => {
    const querySnapshot = await getDocs(collection(db, "FileLinks"));
    const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(filesList);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const institutions = [
    "All Institutions", "OFFICIAL JEE", "OFFICIAL NEET", "MathonGo", "Physics Wallah", "Aakash", "Vedantu",
    "Unacademy", "Infinity Learn", "Narayana", "Others"
  ];

  const subjects = [
    "All Subjects", "JEE MAINS", "MAINS + ADVANCED", "JEE ADVANCED", "NEET", "MATH", "PHYSICS", "CHEMISTRY",
    "ZOOLOGY", "BOTANY", "BIOLOGY"
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

  return (
    <div>
      <h1 className="p-4 ml-2 font-semibold text-md">PDF</h1>
      <div className="ml-2">
        <h2 className="font-semibold text-md">Institution</h2>
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
        <h2 className="font-semibold text-md">Subject</h2>
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
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filteredFiles.length > 0 ? (
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
          <div className="text-center w-full">
            <p className="text-gray-500">No PDF'S found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
