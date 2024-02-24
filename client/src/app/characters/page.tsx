'use client';
import { MoonLoader } from 'react-spinners';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import characterImages from './characterImages';
import Card from '../components/Card';

interface Character {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: string[] | [];
    starships: string[];
    url: string;
    vehicles: string[];
}

const styles = {
    main:"flex min-h-screen flex-col items-center p-24 border-l border-r border-slate-950",
    appName: "font-bold text-xl",
  }

const Page = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
        const {data} = await axios.get("http://localhost:5000/characters");
        setCharacters(data.results);
      };
        fetchCharacters();
  }, []);
 
  return (
    <div className={styles.main}>
      <div className='flex flex-wrap justify-center items-center w-full'>
         <MoonLoader loading={characters.length <= 0}  color="hsla(168, 67%, 53%, 1)" size={100}/>
        {characters.map((character, index) => 
            (<Card key={character.name} name={character.name} image={Object.values(characterImages[index])} films={character.films} height={character.height} mass={character.mass}/>)
        )}
      </div>
    </div>
  );
};

export default Page;
