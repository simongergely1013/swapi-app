import React from "react";

interface CardProps {
    name: string;
    image: any;
}

const styles = {
    main: "flex flex-col items-center w-80 h-80 p-4 m-2 border rounded-lg",
    name: "mb-4",
    image: "w-1/2 h-3/4"
}

const Card = ({name,image}: CardProps) => {
    return (
        <div className={styles.main}>
            <h2 className={styles.name}>{name}</h2>
            <img className={styles.image} src={image}/>
        </div>
    )
};

export default Card;