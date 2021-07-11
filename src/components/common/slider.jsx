const slider = ({ data }) => {
    return (
        <div className="slider-container">
            <input type="range" id="volume" name="volume" min="0" max="100000" onChange={e => data(e.target.value)}/>
            <label for="volume">Volume</label>
        </div>
    )
}

export default slider;