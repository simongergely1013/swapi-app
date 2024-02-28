'use client';
import { Character } from "../characters/character.interface";
import React, { useState } from "react";
import SearcIcon from "./SearchIcon";

interface SearcProps {
    characters: Character[];
}

const styles = {
    container: "relative mr-3",
    input: "w-[356px] h-[48px] pl-6 mb-10 text-black text-bold rounded-lg",
    searchIcon: "absolute right-3 top-3",
    searchResults: "absolute z-10 flex flex-col justify-center w-80 p-4 bg-white top-12 left-2 text-black"
}

const Search = ({characters}: SearcProps) => {
    const [value, setValue] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Character[]>();
    const isReady: boolean = characters.length > 0; 

    const handleSearch = (input: string) => {
        setValue(input);
        const filteredCharacters: Character[] = characters.filter(el => {
            const upperCase: string = el.name.toUpperCase();
            const lowerCase: string = el.name.toLowerCase();
            if(upperCase.includes(input) || lowerCase.includes(input)) return el.name;
        })
        setSearchResult(filteredCharacters);
    }

    return(
        <div className={styles.container}>
            {isReady &&
            <>
            <div className={styles.searchIcon}><SearcIcon/></div>
            <input className={styles.input} value={value} onChange={(e) => handleSearch(e.target.value)} placeholder="Search character..."/>
            </>}
            {value !== "" && <div className={styles.searchResults}>
                                {searchResult?.map(character => <p key={character.name} className="cursor-pointer">{character.name}</p>)}
                            </div>}
        </div>
    )
}

export default Search;