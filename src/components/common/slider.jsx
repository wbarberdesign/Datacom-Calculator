import React, {useState, useEffect} from 'react'

const Slider = ({ data, min, max, type, sliderActivated }) => {
    const slider = React.createRef();
    const [sliderValue, setSliderValue] = useState(min)
    const handleSetSliderValue= (sliderData) => {
        setSliderValue(sliderData)
        data(sliderData)
    }

    return (
        <div className="slider-container">
            <div><p class="large semi-bold" style={{ marginBottom: 0 }}>{sliderValue}{type}</p></div>
            <input type="range" id="volume" value={sliderValue} name="volume" start={min} min={min} max={max} onChange={e => handleSetSliderValue(e.target.value)} ref={slider}/>
        </div>
    )
}

export default Slider;