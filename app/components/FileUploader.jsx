'use client'
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { db } from "@/firebase";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import FileForm from './FileForm';

const FileUploader = () => {
    const [tags, setTags] = useState([]);
    const [state, setState] = useState({ name: "", url: "", course: "", institution: "", year: "", subject: "", tagInput: "", errors: {} });
    const [files, setFiles] = useState([]);

    const handleDeleteTag = (tag) => setTags(tags.filter((t) => t !== tag));

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && state.tagInput.trim()) {
            if (tags.includes(state.tagInput.trim())) {
                setState((prev) => ({ ...prev, errors: { ...prev.errors, tags: "Duplicate tags are not allowed" } }));
                toast.error("Duplicate tags are not allowed");
            } else {
                setTags([...tags, state.tagInput.trim()]);
                setState((prev) => ({ ...prev, tagInput: "", errors: { ...prev.errors, tags: "" } }));
            }
            e.preventDefault();
        }
    };

    const handleSubmit = async () => {
        const { name, url, course, institution, year, subject } = state;
        const errors = {};
        if (!name.trim()) errors.name = "Name is required";
        if (!url.trim()) errors.url = "File link is required";
        if (!course) errors.course = "Course is required";
        if (!institution) errors.institution = "Institution is required";
        if (!year.trim() || isNaN(parseInt(year))) errors.year = "Year is required and must be a number";
        if (!subject) errors.subject = "Subject is required";
        setState((prev) => ({ ...prev, errors }));

        if (Object.keys(errors).length === 0) {
            try {
                await addDoc(collection(db, "FileLinks"), {
                    name,
                    url,
                    course,
                    institution,
                    year: parseInt(year),
                    subject,
                    tags,
                    createdAt: new Date()
                });
                toast.success("File uploaded successfully!", {
                    icon: <FaCircleCheck className="w-5 h-5 text-green-500" />,
                });
                setState({ name: "", url: "", course: "", institution: "", year: "", subject: "", tagInput: "", errors: {} });
                setTags([]);
            } catch (e) {
                toast.error(`Error uploading file: ${e.message}`, {
                    icon: <IoIosCloseCircle className="w-5 h-5 text-red-500" />,
                });
            }
        }
    };

    useEffect(() => {
        const q = query(collection(db, "FileLinks"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const filesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFiles(filesData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <main style={{
            background: "linear-gradient(to top, #020024, #005d70)",
            display: "flex",
            padding: '50px',
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Card className="w-[23em] md:w-[27em]">
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>
                        <p>Upload your new File in one-click.</p>
                    </CardHeader>
                    <CardContent>
                        <FileForm
                            state={state}
                            setState={setState}
                            tags={tags}
                            setTags={setTags}
                            handleAddTag={handleAddTag}
                            handleDeleteTag={handleDeleteTag}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSubmit}>Upload</Button>
                    </CardFooter>
                </Card>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        className: "",
                        duration: 5000,
                        style: {
                            background: "#333",
                            color: "#fff",
                        },
                    }}
                />
            </motion.div>
        </main>
    );
};

export default FileUploader;
