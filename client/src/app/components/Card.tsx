'use client';
import { Character } from "../characters/character.interface";
import Image from "next/image";
import axios from "axios";
import React, {useState} from "react";
import ReactModal from 'react-modal';
import XButton from './XButton';

interface CardProps {
    name: string;
    image: any;
    url: string;
    films: string[];
}
type FilmTitles = Promise<string>[];

const styles = {
    main: "flex flex-col items-center justify-center gap-2 bg-[#191925] w-64 h-64 p-4 m-3 rounded-lg cursor-pointer transition ease-in-out",
    name: "mb-4 text-lg tracking-wider",
    image: "w-24 h-32",
    modalWrapper: "flex flex-col gap-2 h-full bg-[#191925] p-6 tracking-wider",
    modalTop: "flex items-center justify-end py-1 px-4",
    loader: "p-10 text-center text-2xl",
    modalContainer: "flex flex-col justify-center",
    modalName: "flex items-center justify-center gap-4 mb-4 text-4xl",
    attributesContainer: "flex justify-center mb-4",
    attributes: "flex items-center gap-4 text-lg",
    filmsHeader: "flex items-center justify-center gap-4 text-xl mb-2",
    listContainer: "flex justify-center",
    ul: "gap-2 pl-20 py-2 text-lg list-disc"
}

const modalStyles = {
    content: {
      width: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      borderRadius: "20px",
    },
  };

const Card = ({name,image, url, films}: CardProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [characterData, setCharacterData] = useState<Character>();
    const [filmTitles, setFilmTitles] = useState<FilmTitles>([]);

    const fetchCharacterData = async (urlAddress: string) => {
        try {
            const {data} = await axios(urlAddress);
            setCharacterData(data);
        } catch (error) {
            console.log(error)
        }

    }

    const fetchFilms = async () => {
        try { 
            const titles: FilmTitles = films.map(async film => {
                const {data} = await axios(film);
                return data.title;
            })
                setFilmTitles(titles);
        } catch (error) {
                console.log(error);
        }
    }

    const openModal = () => {
      fetchCharacterData(url);
      fetchFilms();
      setIsModalOpen(true);
    }
    const closeModal = () => {
      setIsModalOpen(false);
    }

    return (
        <>
        <ReactModal isOpen={isModalOpen} style={modalStyles}>
            <div className={styles.modalWrapper}>
                <div className={styles.modalTop}><XButton onClick={closeModal}/></div>
                {characterData === undefined 
                ? <div className={styles.loader}>Loading...</div> 
                : <div className={styles.modalContainer}>
                    <p className={styles.modalName}><span>{characterData?.name}</span></p>
                        <div className={styles.attributesContainer}>
                            <div>
                                <p className={styles.attributes}><span>Height:</span><span>{characterData?.height} cm</span></p>
                                <p className={styles.attributes}><span>Mass:</span><span>{characterData?.mass} kg</span></p>
                            </div>
                         </div>
                            <div className="">
                                <p className={styles.filmsHeader}><span>🎥 Films played in:</span></p>
                                    <div className={styles.listContainer}>
                                        <ul className={styles.ul}>
                                        {filmTitles.map((film, index) => (<li key={index}>{film}</li>))}
                                        </ul>
                                     </div>
                            </div>
                        
                    </div>    
                }
                </div>
        </ReactModal>
        <div className={`${styles.main} ${isHovered && 'scale-105 border-[#7474F299]'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={openModal}>
            <h2 className={styles.name}>{name}</h2>
            <Image alt="character_image" className={styles.image} src={image}/>
        </div>
        </>
    )
};

export default Card;