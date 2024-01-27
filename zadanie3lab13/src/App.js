// App.js
import React, { useState, useEffect } from "react";
import { photosData } from "./data";
import "./App.css"; // Import stylów

const StarRating = ({ rating, onRatingChange }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div>
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => onRatingChange(star)}
                    style={{ cursor: "pointer" }}
                >
          {star <= rating ? "★" : "☆"}
        </span>
            ))}
        </div>
    );
};

const PhotoDetails = ({ link, details }) => (
    <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
            Details
        </a>
        <p>{details}</p>
    </div>
);

const NavigationButtons = ({ onPrevious, onNext, isFirst, isLast }) => (
    <div>
        <button onClick={onPrevious} disabled={isFirst}>
            {"<"}
        </button>
        <button onClick={onNext} disabled={isLast}>
            {">"}
        </button>
    </div>
);

const App = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [photos, setPhotos] = useState(photosData);
    const [currentRating, setCurrentRating] = useState(0);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        // Randomly select the first photo on initial load
        const randomIndex = Math.floor(Math.random() * photos.length);
        setCurrentPhotoIndex(randomIndex);
        setCurrentRating(photos[randomIndex].rating);
    }, [photos]);

    const handlePreviousPhoto = () => {
        if (currentPhotoIndex > 0) {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
            setCurrentRating(ratings[currentPhotoIndex - 1] || 0);
        }
    };

    const handleNextPhoto = () => {
        if (currentPhotoIndex < photos.length - 1) {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
            setCurrentRating(ratings[currentPhotoIndex + 1] || 0);
        }
    };

    const handleRatingChange = (newRating) => {
        const updatedRatings = { ...ratings, [currentPhotoIndex]: newRating };
        setRatings(updatedRatings);

        const photoRatings = Object.values(updatedRatings);
        const averageRating =
            photoRatings.reduce((sum, rating) => sum + rating, 0) / photoRatings.length;

        setCurrentRating(averageRating);
    };

    const currentPhoto = photos[currentPhotoIndex];

    return (
        <div className="photo-container">
            <img
                className="photo"
                src={currentPhoto.link}
                alt={`Photo ${currentPhoto.id}`}
            />
            <StarRating rating={currentRating} onRatingChange={handleRatingChange} />
            <p>Average Rating: {currentRating.toFixed(2)}</p>
            <PhotoDetails link={currentPhoto.link} details={currentPhoto.details} />
            <NavigationButtons
                onPrevious={handlePreviousPhoto}
                onNext={handleNextPhoto}
                isFirst={currentPhotoIndex === 0}
                isLast={currentPhotoIndex === photos.length - 1}
            />
        </div>
    );
};

export default App;
