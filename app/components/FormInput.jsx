// components/FormInput.jsx
import React from "react";

const FormInput = ({ field, type = "text", value, onChange, error, options }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <label htmlFor={field} className="font-medium text-gray-700">
        {field[0].toUpperCase() + field.slice(1)}
      </label>
      {options ? (
        <select
          id={field}
          className="border rounded px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled className="text-gray-500">
            Select
          </option>
          {options.map((item) => (
            <option key={item} value={item} className="bg-white p-4 text-gray-700 hover:bg-blue-100">
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field}
          type={type}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`${field[0].toUpperCase() + field.slice(1)} of your project`}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
