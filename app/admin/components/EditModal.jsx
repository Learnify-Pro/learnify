import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IoClose } from "react-icons/io5";
import CustomDropdown from "@/app/components/DropDown"; // Ensure the path is correct based on your project structure
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { CSSTransition } from "react-transition-group";

const EditModal = ({ isOpen, onClose, file, onSave }) => {
  const [form, setForm] = useState({
    fileName: "",
    fileURL: "",
    course: "",
    institution: "",
    subject: "",
    fileYear: "",
    tags: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (file) {
      setForm(file);
    }
  }, [file]);

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
        tags: [...prevForm.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: prevForm.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { id, fileName, fileURL, course, institution, subject, fileYear, tags } = form;

    if (
      !fileName ||
      !fileURL ||
      !course ||
      !institution ||
      !subject ||
      !fileYear ||
      tags.length === 0
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const docRef = doc(db, "FileLinks", id);
      await updateDoc(docRef, form);
      toast.success("Update successful!");
      onSave(); // Call the onSave callback to refresh the parent component data

      // Delay closing the modal by 2 seconds
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Update failed!");
    }
  };

  const formFields = [
    {
      id: "fileName",
      label: "File Name",
      type: "input",
      placeholder: "Name of your File",
    },
    {
      id: "fileURL",
      label: "File URL",
      type: "input",
      placeholder: "URL of your File",
    },
    {
      id: "course",
      label: "Course",
      type: "select",
      options: ["IIT-JEE", "NEET", "TS IPE", "OTHERS"],
    },
    {
      id: "institution",
      label: "Institution",
      type: "select",
      options: [
        "OFFICIAL JEE",
        "OFFICIAL NEET",
        "MathonGo",
        "Physics Wallah",
        "Aakash",
        "Vedantu",
        "Unacademy",
        "Infinity Learn",
        "Narayana",
        "Others",
      ],
    },
    {
      id: "subject",
      label: "Subject",
      type: "select",
      options: [
        "JEE MAINS",
        "JEE ADVANCED",
        "MAINS +  ADVANCED",
        "NEET",
        "MATH",
        "PHYSICS",
        "CHEMISTRY",
        "ZOOLOGY",
        "BOTANY",
        "BIOLOGY",
        "OTHER"
      ],
    },
    {
      id: "fileYear",
      label: "File Year",
      type: "input",
      placeholder: "Year of the File",
    },
  ];

  return (
    <main
      className="Main2"
    >
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="overlay"
        unmountOnExit
      >
        <div className="overlay" onClick={onClose}></div>
      </CSSTransition>{" "}
      <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
        <div className="inset-0 flex items-center justify-center z-50">
          <Toaster />
          <Card className="w-[350px]">
            <div className="p-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Edit PDF</CardTitle>
                    <CardDescription>Update your PDF details.</CardDescription>
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
                        <p className="text-red-500 text-xs">
                          {field.label} is required
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="tags" className="mb-2">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      className="mb-2"
                      placeholder="Tags for your File"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center content-center justify-center px-4 p-1 dark:bg-gray-950 dark:text-white border rounded-full "
                        >
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
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </CSSTransition>
    </main>
  );
};

export default EditModal;
