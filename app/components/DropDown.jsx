'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";

const CustomDropdown = ({ id, options, selectedValue, onSelectChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState("bottom");

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (value) => {
        onSelectChange(id, value);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(`#dropdown-${id}`) === null) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [id]);

    // Determine dropdown position dynamically
    useEffect(() => {
        const dropdown = document.getElementById(`dropdown-${id}`);
        const dropdownHeight = dropdown.clientHeight;
        const windowHeight = window.innerHeight;
        const bottomSpace = windowHeight - dropdown.getBoundingClientRect().bottom;
        const topSpace = dropdown.getBoundingClientRect().top;

        if (bottomSpace < dropdownHeight && topSpace > dropdownHeight) {
            setDropdownPosition("top");
        } else {
            setDropdownPosition("bottom");
        }
    }, [id, isOpen]);

    return (
        <div id={`dropdown-${id}`} className="relative w-full">
            <div 
                className="cursor-pointer border p-2 pl-4 rounded flex justify-between items-center"
                onClick={handleToggle}
            >
                {selectedValue || "Select"}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <IoChevronDown />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={`absolute mt-2 p-2 border rounded bg-white dark:bg-gray-950 shadow-lg z-10 w-full ${dropdownPosition === "top" ? "bottom-full" : ""}`}
                        initial={{ opacity: 0, y: dropdownPosition === "top" ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: dropdownPosition === "top" ? 10 : -10 }}
                    >
                        {options.map((option) => (
                            <li 
                                key={option}
                                className="cursor-pointer p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-800"
                                onClick={() => handleSelect(option)}
                            >
                                <span className='ml-2 flex items-start'>{option}</span>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDropdown;
