import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoClose } from "react-icons/io5";

const TagInput = ({ tags, tagInput, setTagInput, handleAddTag, handleDeleteTag, error }) => {
    return (
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tags">Tags</Label>
            <Input
                id="tags"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-gray-100 px-3 p-1 rounded-2xl flex items-center">
                        {tag}
                        <button className="ml-2 text-md" onClick={() => handleDeleteTag(tag)}>
                            <IoClose />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagInput;
