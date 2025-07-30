import {CheckCircle} from "lucide-react";
import React from "react";

const Input = ({
                   id,
                   min,
                   isValid,
                   name,
                   value,
                   onChange,
                   onBlur,
                   type = "text",
                   placeholder = "Enter text",
                   className = "",
                   ...rest
               }) => {
    const isNumber = type === "number";
    const isDate = type === "date";

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    id={id || name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    min={min}
                    placeholder={placeholder}
                    className={`
            px-4 py-2 w-full border border-amber-500 rounded-sm 
            focus:outline-1 focus:border-amber-600 focus:outline-amber-600 
            placeholder-transparent peer
            ${isNumber ? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" : ""}
            ${className}
          `}
                    {...rest}
                />
                <label
                    htmlFor={id || name}
                    className={`
            absolute left-3 px-1 bg-white text-gray-400 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
            peer-focus:-top-[10px] peer-focus:text-sm peer-focus:bg-white peer-focus:px-1 peer-focus:rounded-md
            -top-2 text-sm
            peer-focus:text-amber-600 peer-not-placeholder-shown:text-amber-500
            ${isDate ? "text-amber-500" : ""}
          `}
                >
                    {placeholder}
                </label>

                {isValid && (
                    <CheckCircle
                        className="w-5 h-5 text-green-500 absolute right-4 top-1/2 transform -translate-y-1/2"
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
