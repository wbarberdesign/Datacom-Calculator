const RadioGroup = ({ mainLabel, radioOne, radioTwo, data }) => {
    return (
        <div className="radio-group">
            {mainLabel ? 
                <h4>{mainLabel}</h4>
            :null}
            {radioOne ?
                <label>
                    {radioOne}
                    <input name={mainLabel} type="radio" value={radioOne} checked onChange={e => data(e.target.value)} />
                </label>
            :null}
            {radioTwo ?
                <label>
                    {radioTwo}
                    <input name={mainLabel} type="radio" value={radioTwo} onChange={e => data(e.target.value)} />
                </label>
            :null}
        </div>
    )
}

export default RadioGroup;