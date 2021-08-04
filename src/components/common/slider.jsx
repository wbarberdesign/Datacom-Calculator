import React, {useState, useEffect} from 'react'

const Slider = ({ stateData, data, min, max, type, sliderActivated, start, textColor }) => {
    const slider = React.createRef();
    const [sliderValue, setSliderValue] = useState(start)

    const handleSetSliderValue= (slider) => {
        setSliderValue(slider.target.value)
        data(slider.target.value)
            slider.target.style.setProperty('--value', slider.target.value);
            slider.target.style.setProperty('--min', slider.target.min === '' ? '0' : slider.target.min);
            slider.target.style.setProperty('--max', slider.target.max === '' ? '100' : slider.target.max);
            slider.target.addEventListener('input', () => slider.target.style.setProperty('--value', slider.target.value));

    }
    
    return (
        <div key={`${type}-${stateData}`} className={`slider-container ${textColor}`}>
            <p>{start}</p>
            <div><p class="large semi-bold" style={{ marginBottom: 0 }}>{type === ' Million' && sliderValue >= 1000 ? (sliderValue / 1000).toFixed(1) : sliderValue}{type === ' Million' && sliderValue >= 1000 ? 'Billion' : type}</p></div>
            <input type="range" id="volume" className="styled-slider slider-progress" style={{ '--min': min, '--max': max, '--value': sliderValue  }} value={sliderValue} name="volume" min={min} max={max} onChange={e => handleSetSliderValue(e)} ref={slider}/>
        </div>
    )
}

export default Slider;