import React from "react";
import { Button } from "@/components/ui/button";

const FilterButton = ({ options, selectedOption, onClick }) => (
  <div className="flex gap-2 overflow-x-auto flex-shrink-0 mt-2">
    {options.map((option, index) => (
      <Button
        key={index}
        className={`px-4 border  rounded-md ${selectedOption === option ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onClick(option)}
      >
        {option === "" ? `All ${options[0].includes("All") ? "Subjects" : "Institutions"}` : option}
      </Button>
    ))}
  </div>
);

export default FilterButton;
