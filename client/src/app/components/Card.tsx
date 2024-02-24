'use client';
import React, {useState} from "react";

interface CardProps {
    name: string;
    image: any;
}

const styles = {
    main: "flex flex-col items-center justify-center gap-2 bg-[#191925] w-64 h-64 p-4 m-3 rounded-lg cursor-pointer transition ease-in-out",
    name: "mb-4 text-lg tracking-wider",
    image: "w-32 h-32",
}

const Card = ({name,image}: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`${styles.main} ${isHovered && 'scale-105 border-[#7474F299]'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <h2 className={styles.name}>{name}</h2>
            <img className={styles.image} src={image}/>
        </div>
    )
};

export default Card;