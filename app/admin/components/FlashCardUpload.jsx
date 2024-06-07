'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoClose } from "react-icons/io5";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import CustomDropdown from "@/app/components/DropDown"; // Ensure the path is correct based on your project structure
import Link from "next/link";

const FlashCardUpload = () => {
    const [form, setForm] = useState({
        fileName: "",
        fileURL: "",
        course: "",
        institution: "",
        subject: "",
        fileYear: "",
        tags: []
    });

    const [submitted, setSubmitted] = useState(false);
    const [tagInput, setTagInput] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "fileYear" && isNaN(value)) {
            return;
        }
        setForm({ ...form, [id]: value });
    };

    const handleSelectChange = (id, value) => {
        setForm({ ...form, [id]: value });
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            setForm((prevForm) => ({
                ...prevForm,
                tags: [...prevForm.tags, tagInput.trim()]
            }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag) => {
        setForm((prevForm) => ({
            ...prevForm,
            tags: prevForm.tags.filter((t) => t !== tag)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { fileName, fileURL, course, institution, subject, fileYear, tags } = form;

        if (!fileName || !fileURL || !course || !institution || !subject || !fileYear || tags.length === 0) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            await addDoc(collection(db, "Flashcards"), form);
            toast.success("Upload successful!");
            setForm({
                fileName: "",
                fileURL: "",
                course: "",
                institution: "",
                subject: "",
                fileYear: "",
                tags: []
            });
            setSubmitted(false);
        } catch (error) {
            console.error("Error uploading document: ", error);
            toast.error("Upload failed!");
        }
    };

    const formFields = [
        { id: "fileName", label: "File Name", type: "input", placeholder: "Name of your File" },
        { id: "fileURL", label: "File URL", type: "input", placeholder: "URL of your File" },
        {
            id: "course", label: "Course", type: "select", options: [
                "IIT-JEE", "NEET","TS IPE", "OTHERS"
            ]
        },
        {
            id: "institution", label: "Institution", type: "select", options: [
                "OFFICIAL JEE", "OFFICIAL NEET", "MathonGo", "Physics Wallah", "Aakash", "Vedantu",
                "Unacademy", "Infinity Learn", "Narayana", "Others"
            ]
        },
        {
            id: "subject", label: "Subject", type: "select", options: [
                "JEE MAINS", "MAINS + ADVANCED", "JEE ADVANCED", "NEET", "MATH", "PHYSICS", "CHEMISTRY",
                "ZOOLOGY", "BOTANY", "OTHERS"
            ]
        },
        { id: "fileYear", label: "File Year", type: "input", placeholder: "Year of the File" },
    ];

    return (
        <main style={{
            display: "flex",
            padding: '50px',
            marginTop: '220px',
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Toaster />
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Upload FlashCard</CardTitle>
                    <CardDescription>Upload your new FlashCard in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            {formFields.map((field) => (
                                <div key={field.id} className="flex flex-col space-y-1.5">
                                    <Label htmlFor={field.id}>{field.label}</Label>
                                    {field.type === "input" ? (
                                        <Input
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            value={form[field.id]}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <CustomDropdown
                                            id={field.id}
                                            options={field.options}
                                            selectedValue={form[field.id]}
                                            onSelectChange={handleSelectChange}
                                        />
                                    )}
                                    {submitted && !form[field.id] && <p className="text-red-500 text-xs">{field.label} is required</p>}
                                </div>
                            ))}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="tags" className='mb-2'>Tags</Label>
                                <Input
                                    id="tags"
                                    className='mb-2'
                                    placeholder="Tags for your File"
                                    value={tagInput}
                                    onChange={handleTagInputChange}
                                    onKeyDown={handleTagInputKeyDown}
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {form.tags.map((tag) => (
                                        <span key={tag} className="flex items-center content-center justify-center px-4 p-1 bg-gray-200 dark:bg-gray-950 dark:text-white border rounded-full ">
                                            {tag}
                                            <IoClose
                                                className="ml-3 cursor-pointer"
                                                onClick={() => handleRemoveTag(tag)}
                                            />
                                        </span>
                                    ))}
                                </div>
                                {submitted && form.tags.length === 0 && <p className="text-red-500 text-xs">Tags are required</p>}
                            </div>
                        </div>
                        <Link href='/admin/upload/video' className="text-xs underline text-white ml-4">Go to Video Upload</Link>

                        <div className="flex flex-col gap-3 justify-between mt-4">
                            <Button type="submit" className='w-full'>Submit</Button>
                            <Button variant="outline" className='w-full' type="button">Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default FlashCardUpload;
