import React from "react";

const SingleCharacter = ({params}: {params: {id: number}}) => {
    return <div>Single character: {params.id}</div>
};