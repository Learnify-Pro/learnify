import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TagInput from './TagInput';

const FileForm = ({ state, setState, tags, setTags, handleAddTag, handleDeleteTag }) => {
    return (
        <form>
            <div className="grid w-full items-center gap-4">
                {["name", "url", "course", "institution", "year", "subject"].map((field) => (
                    <div key={field} className="flex flex-col space-y-1.5">
                        <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
                        {field === "course" || field === "institution" || field === "subject" ? (
                            <Select onValueChange={(value) => setState((prev) => ({ ...prev, [field]: value }))}>
                                <SelectTrigger id={field}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {(field === "course"
                                        ? ["IIT-JEE", "NEET"]
                                        : field === "subject"
                                        ? ["All", "JEE-MAINS", "JEE-ADVANCED", "Others", "Math", "Physics", "Chemistry", "Zoology", "Botany"]
                                        : ["MathonGo", "Physics Wallah", "Aakash", "Byjus", "Vedantu", "Unacademy", "Infinity Learn", "Narayana", "Self Studys", "Toppr", "Others"]).map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : field === "year" ? (
                            <Input
                                id={field}
                                type="number"
                                placeholder={`${field[0].toUpperCase() + field.slice(1)} of your project`}
                                value={state[field]}
                                onChange={(e) => setState((prev) => ({ ...prev, [field]: e.target.value }))}
                            />
                        ) : (
                            <Input
                                id={field}
                                placeholder={`${field[0].toUpperCase() + field.slice(1)} of your project`}
                                value={state[field]}
                                onChange={(e) => setState((prev) => ({ ...prev, [field]: e.target.value }))}
                            />
                        )}
                        {state.errors[field] && <p className="text-red-500 text-sm">{state.errors[field]}</p>}
                    </div>
                ))}
                <TagInput
                    tags={tags}
                    tagInput={state.tagInput}
                    setTagInput={(value) => setState((prev) => ({ ...prev, tagInput: value }))}
                    handleAddTag={handleAddTag}
                    handleDeleteTag={handleDeleteTag}
                    error={state.errors.tags}
                />
            </div>
        </form>
    );
};

export default FileForm;
