import React, {useState, useEffect} from 'react'

const Slider = ({ data, min, max, type }) => {
    const [sliderValue, setSliderValue] = useState(0)
    const handleSetSliderValue= (sliderData) => {
        setSliderValue(sliderData)
        data(sliderData)
    }
    return (
        <div className="slider-container">
            <div><p class="large semi-bold" style={{ marginBottom: 0 }}>{sliderValue}{type}</p></div>
            <input type="range" id="volume" name="volume" start={0} min={min} max={max} onChange={e => handleSetSliderValue(e.target.value)}/>
        </div>
    )
}

export default Slider;