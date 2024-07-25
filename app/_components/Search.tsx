"use client";

import { useEffect, useState } from "react";
import { Character } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useDebounceValue } from "@/lib/hooks/useDebounceValue";
import { Select } from "./Select";
import Image from "next/image";
import styles from "./Search.module.css";

export const Search = ({ data }: { data: Array<Character> }) => {
  const [query, setQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>();

  const deferredQuery = useDebounceValue(query, 250);

  const { push } = useRouter();

  useEffect(() => {
    push(`/?query=${deferredQuery}`);
  }, [deferredQuery, push]);

  return (
    <div className={styles.wrapper}>
      <Select
        options={data}
        inputValue={query}
        onChange={(newValue) => setQuery(newValue)}
        getDisplayValue={(value) => value.name}
        getValue={(value) => value.name}
        onSelected={(selectedOption) => setSelectedCharacter(selectedOption)}
      />
      <div className={styles.imageWrapper}>
        {selectedCharacter && (
          <Image
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            width="500"
            height="500"
          />
        )}
      </div>
    </div>
  );
};
