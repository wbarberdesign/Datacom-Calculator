import React from 'react'

const SliderNew = ({start, handleSliderUpdate, min, max, type, textColor}) => {
    const slider = React.createRef();
    const handleSetSliderUpdate = (slider) => {
        handleSliderUpdate(slider.target.value)
        slider.target.style.setProperty('--value', start);
            slider.target.style.setProperty('--min', slider.target.min === '' ? '0' : slider.target.min);
            slider.target.style.setProperty('--max', slider.target.max === '' ? '100' : slider.target.max);
            slider.target.addEventListener('input', () => slider.target.style.setProperty('--value', start));

    }
    return (
        <div className={`slider-container ${textColor}`}>
            <div><p class="large semi-bold" style={{ marginBottom: 0 }}>{type === ' Million' && start >= 1000 ? (start / 1000).toFixed(1) : start}{type === ' Million' && start >= 1000 ? 'Billion' : type}</p></div>
            <input type="range" id="volume" className="styled-slider slider-progress" style={{ '--min': min, '--max': max, '--value': start  }} value={start} name="volume" min={min} max={max} onChange={e => handleSetSliderUpdate(e)} ref={slider}/>
        </div>
    )
}

export default SliderNew;