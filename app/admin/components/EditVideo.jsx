'use client'
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoClose } from "react-icons/io5";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import CustomDropdown from "@/app/components/DropDown"; // Ensure the path is correct based on your project structure
import { CSSTransition } from "react-transition-group";

const subjects = [
    {
        subject: "MATH",
        chapters: [
            "Sets, Relations, and Functions",
            "Complex Numbers and Quadratic Equations",
            "Matrices and Determinants",
            "Permutations and Combinations",
            "Mathematical Induction",
            "Binomial Theorem and its Simple Applications",
            "Sequences and Series",
            "Limit, Continuity, and Differentiability",
            "Integral Calculus",
            "Differential Equations",
            "Coordinate Geometry",
            "Three-Dimensional Geometry",
            "Vector Algebra",
            "Statistics and Probability",
            "Trigonometry",
            "Mathematical Reasoning",
            "Elementary Number Theory"
        ]
    },
    {
        subject: "PHYSICS",
        chapters: [
            "Units and Measurements",
            "Kinematics",
            "Laws of Motion",
            "Work, Energy, and Power",
            "Rotational Motion",
            "Gravitation",
            "Properties of Solids and Liquids",
            "Thermodynamics",
            "Kinetic Theory of Gases",
            "Oscillations and Waves",
            "Electrostatics",
            "Current Electricity",
            "Magnetic Effects of Current and Magnetism",
            "Electromagnetic Induction and Alternating Currents",
            "Electromagnetic Waves",
            "Optics",
            "Dual Nature of Matter and Radiation",
            "Atoms and Nuclei",
            "Electronic Devices",
            "Communication Systems",
            "Experimental Physics"
        ]
    },
    {
        subject: "CHEMISTRY",
        chapters: [
            "Some Basic Concepts in Chemistry",
            "States of Matter",
            "Atomic Structure",
            "Chemical Bonding and Molecular Structure",
            "Chemical Thermodynamics",
            "Solutions",
            "Equilibrium",
            "Redox Reactions and Electrochemistry",
            "Chemical Kinetics",
            "Surface Chemistry",
            "Classification of Elements and Periodicity in Properties",
            "General Principles and Processes of Isolation of Metals",
            "Hydrogen",
            "s-Block Element (Alkali and Alkaline Earth metals)",
            "p-Block Elements",
            "d- and f-Block Elements",
            "Coordination Compounds",
            "Environmental Chemistry",
            "Some Basic Principles and Techniques",
            "Hydrocarbons",
            "Organic Compounds Containing Halogens",
            "Organic Compounds Containing Oxygen",
            "Organic Compounds Containing Nitrogen",
            "Polymers",
            "Biomolecules",
            "Chemistry in Everyday Life",
            "Principles Related to Practical Chemistry"
        ]
    }
];

const EditVideo = ({ isOpen, onClose, file, onSave }) => {
    const [form, setForm] = useState({
        videoName: "",
        videoURL: "",
        course: "",
        institution: "",
        category:"",
        subject: "",
        videoYear: "",
        tags: [],
        chapter: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        if (file) {
            setForm(file);
            const selectedSubject = subjects.find((sub) => sub.subject === file.subject);
            setChapters(selectedSubject ? selectedSubject.chapters : []);
        }
    }, [file]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "videoYear" && isNaN(value)) {
            return;
        }
        setForm({ ...form, [id]: value });
    };

    const handleSelectChange = (id, value) => {
        setForm({ ...form, [id]: value });
        if (id === "subject" && ["MATH", "PHYSICS", "CHEMISTRY"].includes(value)) {
            const selectedSubject = subjects.find((sub) => sub.subject === value);
            setChapters(selectedSubject ? selectedSubject.chapters : []);
        } else if (id === "subject") {
            setChapters([]);
        }
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

        const { videoName, videoURL, course, institution, subject, videoYear, tags, chapter } = form;

        if (!videoName || !videoURL || !course || !institution || !subject || !videoYear || tags.length === 0) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            await updateDoc(doc(db, "VideoLinks", file.id), form);
            toast.success("Update successful!");
            onSave(); // Refresh the list after updating

            // Delay closing the modal by 2 seconds
            setTimeout(() => {
                onClose(); // Close the modal
            }, 2000);
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Update failed!");
        }
    };

    const formFields = [
        { id: "videoName", label: "Video Name", type: "input", placeholder: "Name of your Video" },
        { id: "videoURL", label: "Video URL", type: "input", placeholder: "URL of your Video" },
        {
            id: "course", label: "Course", type: "select", options: [
                "IIT-JEE", "NEET", "TS IPE", "OTHERS"
            ]
        },
        {
            id: "category", label: "Category", type: "select", options: [
              "JEE MAINS", "MAINS + ADVANCED", "JEE ADVANCED", "NEET",
            ]
          },
          {
            id: "subject", label: "Subject", type: "select", options: [
              "MATH", "PHYSICS", "CHEMISTRY",
              "ZOOLOGY", "BOTANY", "BIOLOGY"
            ]
          },
        { id: "videoYear", label: "Video Year", type: "input", placeholder: "Year of the Video" }
    ];

    return (
        <main className="Main">
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <div className="overlay" onClick={onClose}></div>
            </CSSTransition>
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="inset-0 flex items-center justify-center z-50">
                    <Toaster />
                    <Card className="w-[350px]">
                        <div className="p-6">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Edit Video</CardTitle>
                                        <CardDescription>Edit your video details.</CardDescription>
                                    </div>
                                    <IoClose className="cursor-pointer" onClick={onClose} />
                                </div>
                            </CardHeader>
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
                                            {submitted && !form[field.id] && (
                                                <p className="text-red-500 text-xs">{field.label} is required</p>
                                            )}
                                        </div>
                                    ))}
                                    {chapters.length > 0 && (
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="chapter">Chapter</Label>
                                            <CustomDropdown
                                                id="chapter"
                                                options={chapters}
                                                selectedValue={form.chapter}
                                                onSelectChange={handleSelectChange}
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="tags" className='mb-2'>Tags</Label>
                                        <Input
                                            id="tags"
                                            className='mb-2'
                                            placeholder="Tags for your Video"
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
                                        {submitted && form.tags.length === 0 && (
                                            <p className="text-red-500 text-xs">Tags are required</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 justify-between mt-4">
                                    <Button type="submit" className='w-full'>Submit</Button>
                                    <Button variant="outline" className='w-full' type="button" onClick={onClose}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </CSSTransition>
        </main>
    );
};

export default EditVideo;
