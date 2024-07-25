import { useEffect, useRef } from "react";
import styles from "./SelectOption.module.css";

export const SelectOption = ({
  isSelected,
  id,
  onClick,
  onMouseEnter,
  displayValue,
}: {
  isSelected: boolean;
  id: string;
  onClick: () => void;
  onMouseEnter: () => void;
  displayValue: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isSelected) return;

    ref.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [isSelected]);

  return (
    <li
      className={styles.optionListItem}
      role="option"
      aria-selected={isSelected}
      id={id}
      ref={ref}
    >
      <button
        type="button"
        className={styles.optionListButton}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {displayValue}
      </button>
    </li>
  );
};
