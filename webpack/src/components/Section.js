import React from 'react';

const Section = ({ name, image, text }) => {
    return (
        <div>
                    <h1>{name}</h1>
                    <img src={image} alt={name} style={{ width: '200px', height: '200px' }}/>
                    <p>{text}</p>
        </div>
    );
};

export default Section;
