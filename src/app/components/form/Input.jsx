const Input = ({id, min, type = "text", placeholder = "Enter text", ...props}) => {
    const isNumber = type === "number";
    const isDate = type === "date";

    return (
        <div className="w-full ">
            <div className="relative">
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    min={min}
                    {...props}
                    className={`
                        px-4 py-2 w-full border border-amber-500 rounded-sm 
                        focus:outline-1 focus:border-amber-600 focus:outline-amber-600 
                        placeholder-transparent peer
                        ${isNumber ? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" : ""}
                    `}
                />
                <label
                    htmlFor={id}
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
            </div>
        </div>
    );
};

export default Input;
