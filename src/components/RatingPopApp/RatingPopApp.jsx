import React, {useEffect, useState} from 'react';
import s from './RatingPopApp.module.css';
import {BiSolidStar} from "react-icons/bi";
import {IoCloseOutline} from "react-icons/io5";

const RatingPopApp = ({data, setRatingClicked, setStoredRating}) => {
    const [rating, setRating] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(-1);

    useEffect(() => {
        const savedRating = localStorage.getItem(`rating_${data.id}`);
        if (savedRating !== null) {
            setRating(parseInt(savedRating));
        }
    }, [data.id]);

    const handleStarClick = (index) => {
        const newRating = index + 1;
        setRating(newRating);
        localStorage.setItem(`rating_${data.id}`, newRating); // Save rating to localStorage
        setStoredRating(newRating); // Update storedRating in Movies component
    };

    const handleStarHover = (index) => {
        setHoverIndex(index);
    };

    const handleStarLeave = () => {
        setHoverIndex(-1);
    };

    const handleSaveRating = () => {
        const existingData = JSON.parse(localStorage.getItem('data')) || [];
        const newData = [...existingData, data];
        localStorage.setItem('data', JSON.stringify(newData));
        window.dispatchEvent(new Event('localStorageChange'));
        setRatingClicked(false);
    };

    const handleRemoveRating = () => {
        localStorage.removeItem(`rating_${data.id}`);
        const existingData = JSON.parse(localStorage.getItem('data')) || [];
        const updatedData = existingData.filter(item => item.id !== data.id);
        localStorage.setItem('data', JSON.stringify(updatedData));
        window.dispatchEvent(new Event('localStorageChange'));
        setRating(0);
        setStoredRating(null);
        setRatingClicked(false);
    };


    return (
        <div className={s.popAppBlock}>
            <div className={s.ratingBlock}>
                <p>Your rating</p>
                <IoCloseOutline onClick={() => setRatingClicked(false)}/>
            </div>
            <hr/>
            <h3>{data?.original_title}</h3>
            <div className={s.starRating} onMouseLeave={handleStarLeave}>
                {[...Array(10)].map((_, index) => (
                    <BiSolidStar
                        key={index}
                        className={`${s.star} ${index <= hoverIndex || index < rating ? s.starFilled : s.starDefault}`} // Modified star class
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleStarHover(index)}
                    />
                ))}
            </div>
            <div className={s.buttonBlock}>
                <button className={s.saveButton} onClick={() => {
                    handleSaveRating()
                }}>Save
                </button>
                <button className={s.removeButton} onClick={() => {
                    handleRemoveRating()
                }}>Remove rating
                </button>

            </div>
        </div>
    );
};

export default RatingPopApp;
