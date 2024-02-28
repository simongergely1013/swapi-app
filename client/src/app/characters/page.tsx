'use client';
import { Character } from './character.interface';
import { MoonLoader } from 'react-spinners';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Search from '../components/Search';
import characterImages from './characterImages';

const styles = {
    main:"flex min-h-screen flex-col items-center px-24 py-16 border-l border-r border-slate-950",
    appName: "font-bold text-xl",
    cardsWrapper: "flex flex-wrap justify-center items-center w-full"
  }

const Page: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [gender, setGender] = useState<string>("");
  const [homeworld, setHomeworld] = useState<string>("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data } = await axios.get<{ results: Character[] }>("http://localhost:5000/characters");
        const characterList: Character[] = [];

        for (const character of data.results) {
          const response = await axios(character.homeworld);
          const planet = response.data.name;
          characterList.push({ ...character, planet });
        }

        setCharacters(characterList);
        setFilteredCharacters(characterList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [gender, homeworld]);

  const filterCharacters = () => {
    let filteredList = characters;

    if (gender !== "") {
      filteredList = filteredList.filter(character => character.gender === gender);
    }

    if (homeworld !== "") {
      filteredList = filteredList.filter(character => character.planet === homeworld);
    }

    setFilteredCharacters(filteredList);
  };
   
  return (
    <div className={styles.main}>
      <div className='flex gap-4'>
        <Search characters={characters}/>
        {characters.length > 0 && 
        <>
        <div className='flex flex-col mr-4'>
          <label>Choose gender:</label>
          <select className="rounded" onChange={(e) => setGender(e.target.value)} id='gender'>
              <option value="">--No filter--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label>Choose homeworld:</label>
          <select className="rounded" onChange={(e) => setHomeworld(e.target.value)} id='homeworld'>
              <option value="">--No filter--</option>
              <option value="Tatooine">Tatooine</option>
              <option value="Alderaan">Alderaan</option>
              <option value="Yavin IV">Yavin IV</option>
              <option value="Hoth">Hoth</option>
              <option value="Dagobah">Dagobah</option>
              <option value="Bespin">Bespin</option>
              <option value="Endor">Endor</option>
              <option value="Naboo">Naboo</option>
              <option value="Coruscant">Coruscant</option>
              <option value="Kamino">Kamino</option>
          </select>
        </div>
        </>}
      </div>
      <div className={styles.cardsWrapper}>
         <MoonLoader loading={filteredCharacters.length <= 0}  color="hsla(168, 67%, 53%, 1)" size={100}/>
        {filteredCharacters.map((character) => {
           const image = characterImages.filter(el => el.name === character.name);
           const imageUrl: string = image[0].imageUrl;
           return <Card key={character.name} name={character.name} image={imageUrl} url={character.url} films={character.films}/>
        }
           
        )}
      </div>
    </div>
  );
};

export default Page;
