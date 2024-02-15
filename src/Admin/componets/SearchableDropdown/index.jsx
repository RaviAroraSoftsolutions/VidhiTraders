// src/components/SearchableDropdown.js

import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CircularProgress, MenuItem, TextField } from "@mui/material";

const SearchableDropdown = ({
  options,
  titleKey,
  defaultVal,
  handleOption,
  placeholder,
  labelStyle,
  labelTitle,
  containerStyle,
  required,
  loading
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const filteredOptions = options?.filter((option) => {
    return option[titleKey]?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (defaultVal) {
      setSearchTerm(defaultVal);
    } else {
      setSearchTerm("");
    }
  }, [defaultVal]);
  const handleSelectOption = (option) => {
  
    handleOption(option);
    setSearchTerm(option?.label);
    setIsOpen(false);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleSearchTerm = (e) => {
 
    setSearchTerm(e.target.value);
  };
 
  return (
    <div ref={dropdownRef} className={`relative ${containerStyle}`}>
      {/* {labelTitle && (
        <label className="label m-0 p-0">
          <span className={"label-text text-base-content " + labelStyle}>
            {labelTitle}
            {required && <span className="text-red-600">*</span>}
          </span>
        </label>
      )} */}
      <div className="flex justify-start  items-center">
      <TextField
           size="medium"
           label={labelTitle}
                fullWidth
                value={searchTerm}
                placeholder={placeholder}
                onChange={(e) => handleSearchTerm(e)}
          onFocus={() => setIsOpen(true)}
              />
       
        <span
          onClick={() => setIsOpen(!isOpen)}
          style={{transform:isOpen?'rotate(90deg)':"",cursor:"pointer",transition:"ease-in-out 200ms"}}
          className={`${
            isOpen && "-rotate-90 ease-in-out"
          } transition-all hover:cursor-pointer rotate-90`}
        >
          <KeyboardArrowRightIcon />
        </span>
      </div>
      {isOpen && (
        <div style={{zIndex:10,background:"#0D0907 ",maxHeight:"11rem",overflowY:"auto"}} id="style-1" className="absolute top-full left-0 w-full mt-1 h-44 overflow-y-auto bg-white border rounded shadow z-20">
          {!loading?filteredOptions?.length > 0 ? (
            filteredOptions
              .sort((a, b) => a?.createdon - b?.createdon)
              .map((option, key) => (
                <MenuItem
                  key={option?._id + "a"}
                  sx={{background:"#0D0907 "}}
                  className="p-2  text-xs bg-white text-black cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectOption(option)}
                >
                  {option[titleKey]}
                </MenuItem>
              ))
          ) : (
            <p className="text-xs">No Data Found</p>
          ):<CircularProgress color="secondary" />}
        </div>
      )}
      {/* {selectedOption && (
        <div className="absolute top-0 right-0 p-2">
          <span className="text-blue-500">{selectedOption}</span>
        </div>
      )} */}
    </div>
  );
};

export default SearchableDropdown;
