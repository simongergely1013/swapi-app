'use client';
import axios from "axios";
import React, {useState} from "react";
import ReactModal from 'react-modal';

interface CardProps {
    name: string;
    image: any;
    films: string[];
    height: string;
    mass: string;
}

type FilmTitles = Promise<string>[];

const styles = {
    main: "flex flex-col items-center justify-center gap-2 bg-[#191925] w-64 h-64 p-4 m-3 rounded-lg cursor-pointer transition ease-in-out",
    name: "mb-4 text-lg tracking-wider",
    image: "w-32 h-32",
}

const modalStyles = {
    content: {
      width: "40%",
      height: "504px",
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

const Card = ({name,image, films, height, mass}: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [filmTitles, setFilmTitles] = useState<FilmTitles>([]);

    const fetchFilms = () => {
        const titles: FilmTitles = films.map(async film => {
            const {data} = await axios(film)
            return data.title;
        })
            setFilmTitles(titles);
    }

    const openModal = () => {
      fetchFilms();
      setIsModalOpen(true);
    }
    const closeModal = () => {
      setIsModalOpen(false);
    }
    return (
        <>
        <ReactModal isOpen={isModalOpen} style={modalStyles}>
            <div className="h-full bg-[#191925] p-4">
                <button onClick={closeModal}>close</button>
                <p>Name: {name}</p>
                <ul>
                    {filmTitles.map(film => <li>{film}</li>)}
                </ul>
                <p>Height: {height} cm</p>
                <p>Mass: {mass} kg</p>
            </div>
        </ReactModal>
        <div className={`${styles.main} ${isHovered && 'scale-105 border-[#7474F299]'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={openModal}>
            <h2 className={styles.name}>{name}</h2>
            <img className={styles.image} src={image}/>
        </div>
        </>
    )
};

export default Card;