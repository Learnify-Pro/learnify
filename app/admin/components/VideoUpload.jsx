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

const VideoUpload = () => {
  const [form, setForm] = useState({
    videoName: "",
    videoURL: "",
    course: "",
    institution: "",
    subject: "",
    videoYear: "",
    tags: [],
    chapter: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [chapters, setChapters] = useState([]);

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
      await addDoc(collection(db, "VideoLinks"), form);
      toast.success("Upload successful!");
      setForm({
        videoName: "",
        videoURL: "",
        course: "",
        institution: "",
        subject: "",
        videoYear: "",
        tags: [],
        chapter: ""
      });
      setSubmitted(false);
    } catch (error) {
      console.error("Error uploading document: ", error);
      toast.error("Upload failed!");
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
      id: "institution", label: "Institution", type: "select", options: [
        "OFFICIAL JEE", "OFFICIAL NEET", "MathonGo", "Physics Wallah", "Aakash", "Vedantu",
        "Unacademy", "Infinity Learn", "Narayana", "Others"
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
    <main style={{
      display: "flex",
      padding: '50px',
      marginTop: '300px',
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}>
      <Toaster />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
          <CardDescription>Upload your new video in one-click.</CardDescription>
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
                <div className="flex flex-wrap">
                  {form.tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded mr-2 mb-2">
                      {tag}
                      <button type="button" className="ml-1" onClick={() => handleRemoveTag(tag)}>
                        <IoClose size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                {submitted && form.tags.length === 0 && <p className="text-red-500 text-xs">At least one tag is required</p>}
              </div>
              <Button type="submit">Upload</Button>
              <div className="flex justify-between mt-4">
                <Button variant="secondary" asChild>
                  <Link href="/admin-dashboard">Dashboard</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/">Home</Link>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default VideoUpload;
