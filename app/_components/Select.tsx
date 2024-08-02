"use client";

import { useRef, useState, KeyboardEvent, useId, useEffect } from "react";
import styles from "./Select.module.css";
import { checkExhaustive } from "@/lib/utils";
import { SelectOption } from "./SelectOption";

export type SelectProps<T> = {
  onChange: (value: string) => void;
  options: Array<T>;
  getDisplayValue: (value: T) => string;
  getValue: (value: T) => string;

  inputValue: string;
  onSelected: (selectedOption: T) => void;
};

export const Select = <T extends object>({
  onChange,
  options,
  getDisplayValue,
  getValue,
  inputValue,
  onSelected,
}: SelectProps<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const [shouldUpdateInput, setShouldUpdateInput] = useState(true);
  const [currentFocusedOption, setCurrentFocusedOption] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const selectListId = useId();

  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
    setShouldUpdateInput(true);
  };

  const handleBlur = () => {
    if (shouldUpdateInput) return;

    const timeout = setTimeout(() => {
      setShouldUpdateInput(true);
    }, 200);

    return () => clearTimeout(timeout);
  };

  const handleFocus = () => {
    setShowOptions(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const specialKeys = ["ArrowUp", "ArrowDown", "Enter", "Escape"] as const;
    type SpecialKey = (typeof specialKeys)[number];

    const isSpecialKey = (key: string): key is SpecialKey =>
      specialKeys.includes(key as SpecialKey);

    if (!options || !isSpecialKey(e.key)) {
      return;
    }

    if (!showOptions) {
      if (e.key === "Escape") return;

      setShowOptions(true);
      return;
    }

    switch (e.key) {
      case "Escape": {
        setShouldUpdateInput(true);
        e.stopPropagation();
        return;
      }

      case "ArrowDown": {
        setCurrentFocusedOption((prev) => (prev + 1) % options.length);
        return;
      }

      case "ArrowUp": {
        setCurrentFocusedOption(
          (prev) => (prev - 1 + options.length) % options.length
        );
        return;
      }

      case "Enter": {
        if (currentFocusedOption === -1) {
          return;
        }
        e.preventDefault();

        setSelectedOption((prev) => options[currentFocusedOption] ?? prev);
        setShouldUpdateInput(true);

        return;
      }

      default:
        checkExhaustive(e.key);
    }
  };

  useEffect(() => {
    if (!shouldUpdateInput) return;
    if (!inputRef.current) return;

    if (selectedOption) {
      onChange(getDisplayValue(selectedOption));
    }

    setShowOptions(false);
    setShouldUpdateInput(false);
  }, [getDisplayValue, onChange, selectedOption, shouldUpdateInput]);

  useEffect(() => {
    if (!selectedOption) return;

    onSelected(selectedOption);
  }, [onSelected, selectedOption]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Type to search..."
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={showOptions}
        aria-controls={selectListId}
        value={inputValue}
      />
      {showOptions && (
        <ul id={selectListId} className={styles.optionsList} role="listbox">
          {options?.length > 0 ? (
            options.map((option, index) => (
              <SelectOption
                isSelected={index === currentFocusedOption}
                id={`selectOption__${getValue(option)}`}
                key={`selectOption__${getValue(option)}`}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setCurrentFocusedOption(index)}
                displayValue={getDisplayValue(option)}
              />
            ))
          ) : (
            <li className={styles.noOptions}>no options</li>
          )}
        </ul>
      )}
    </div>
  );
};
