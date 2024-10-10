import { useState } from 'react';
import axios from 'axios'
import styles from './SearchGeocode.module.css'

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function SearchGeocode({ placeholder, className, name, startIcon, endIcon, onClickEvent }) {
    const [places, setPlaces] = useState([])
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const getPlaces = async (e) => {
        const value = e.target.value

        if (value.length > 2) {
            const promise = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${TOKEN}`)

            setPlaces(promise.data.features)

            // console.log('promise.data.features: ', promise.data.features);
        } else {
            setPlaces([])
        }

    }

    const handleOnClick = (place) => {
        onClickEvent(place)
        setIsFocused(false)
        setInputValue(place.place_name)
    }

    const handleOnChange = (e) => {
        getPlaces(e)
        setInputValue(e.target.value)
    }

    return (

        <div className={className}>
            {startIcon}

            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                name={name}
                onChange={(e) => handleOnChange(e)}
                onFocus={() => setIsFocused(true)} 
            />

            {endIcon}

            {
                places.length > 0 && isFocused &&
                <div className={styles["box-places"]}>
                    {places.map((place) => (
                        <div key={place.id} onClick={() => handleOnClick(place)} className={styles["place"]}>
                            <span>{place.place_name}</span>
                        </div>
                    ))}
                </div>
            }
        </div>

    )
}

export default SearchGeocode