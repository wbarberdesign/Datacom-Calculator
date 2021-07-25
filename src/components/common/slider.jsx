import React, {useState, useEffect} from 'react'

const Slider = ({ data, min, max, type, sliderActivated }) => {
    const slider = React.createRef();
    const [sliderValue, setSliderValue] = useState(min)
    const handleSetSliderValue= (slider) => {
        setSliderValue(slider.target.value)
        data(slider.target.value)
            slider.target.style.setProperty('--value', slider.target.value);
            slider.target.style.setProperty('--min', slider.target.min === '' ? '0' : slider.target.min);
            slider.target.style.setProperty('--max', slider.target.max === '' ? '100' : slider.target.max);
            slider.target.addEventListener('input', () => slider.target.style.setProperty('--value', slider.target.value));

    }

    return (
        <div className="slider-container">
            <div><p class="large semi-bold" style={{ marginBottom: 0 }}>{sliderValue}{type}</p></div>
            <input type="range" id="volume" className="styled-slider slider-progress" style={{ '--min': min, '--max': max, '--value': min  }}value={sliderValue} name="volume" start={min} min={min} max={max} onChange={e => handleSetSliderValue(e)} ref={slider}/>
        </div>
    )
}

export default Slider;