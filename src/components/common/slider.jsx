import React, {useState, useEffect} from 'react'

const Slider = ({ data, min, max, type, sliderActivated, start }) => {
    const slider = React.createRef();
    const [sliderValue, setSliderValue] = useState(0)
    const [sliderChanged, setSliderChanged] = useState(false)

    useEffect(() => {
        if(start > 5 && start < 1000 && sliderActivated === 'transition-in' && sliderChanged === false && type === ' Million') {
            setSliderValue(start.toFixed(0))
            setSliderChanged(true)
        } else if(start <= 5 && sliderActivated === 'transition-in' && sliderChanged === false && type === ' Million') {
            setSliderValue(5)
            setSliderChanged(true)
        } else if(start >= 1000 && sliderActivated === 'transition-in' && sliderChanged === false && type === ' Million') {
            setSliderValue(100)
            setSliderChanged(true)
        } else if(start >= 30 && sliderActivated === 'transition-in' && sliderChanged === false && type === 'TB') {
            setSliderValue(30)
            setSliderChanged(true)
        } else if(start < 30 && sliderActivated === 'transition-in' && sliderChanged === false && type === 'TB') {
            if(start < 1.7) {
                setSliderValue(1)
                setSliderChanged(true)
            } else {
                setSliderValue(start.toFixed(0))
                setSliderChanged(true)
            }
        }
    });

    data(sliderValue);

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
            <input type="range" id="volume" className="styled-slider slider-progress" style={{ '--min': min, '--max': max, '--value': sliderValue  }} value={sliderValue} name="volume" min={min} max={max} onChange={e => handleSetSliderValue(e)} ref={slider}/>
        </div>
    )
}

export default Slider;