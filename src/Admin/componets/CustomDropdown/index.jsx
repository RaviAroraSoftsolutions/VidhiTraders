// src/CustomDropdown.js
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const CustomDropdown = ({
  prefixIcon,
  options,
  value,
  placeholder,
  handleChange,
  customClassName,
  showLabel,
  labelText,
  labelFor,

  id
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
  if(options &&options?.length>0) {let foundoption=options?.find(data=>data?.value===value)
      setSelectedOption(foundoption?foundoption.name:"");
    }
  }, [value]);
  const handleOptionSelect = (option) => {
    setSelectedOption(option.name);
    handleChange && handleChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="w-full text-left">
      {showLabel&& <label htmlFor={labelFor} className="text-left px-2 text-sm mb-2 font-bold">{t(labelText)}</label>}
      <div
        ref={dropdownRef}
        id={id}
        className={` ${
          customClassName ? customClassName : " rounded-[40px] "
        } relative flex items-center border px-2 py-1`}
      >
        {prefixIcon && <span className=" text-gray-500">{prefixIcon}</span>}
        <button
          type="button"
          className={` rounded-lg px-3 w-full py-2 flex items-center justify-between`}
          onClick={toggleDropdown}
        >
          <span>{t(selectedOption) || t(placeholder)}</span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 h-72 overflow-y-auto w-full top-full left-0 shadow-md border rounded-lg bg-white">
            {(options?.length)?options.map((option,index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleOptionSelect(option)}
              >
                {t(option.name)}
              </li>
            ))
            :<>No Data</>
            }
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
