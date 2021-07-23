const RadioGroup = ({ mainLabel, radioOne, radioTwo, data }) => {
    const updateData = (radioData) => {
        data(radioData)
    }
    return (
        <div className="radio-group">
            {mainLabel ? 
                <h4 className="bold">{mainLabel}</h4>
            :null}
            {radioOne ?
                <label>
                    <input name={mainLabel} type="radio" value={radioOne} onClick={e => updateData(e.target.value)} />
                    {radioOne === 'Single' ? 'Single site' : 'New Zealand'}
                </label>
            :null}
            {radioTwo ?
                <label>
                    <input name={mainLabel} type="radio" value={radioTwo} onClick={e => updateData(e.target.value)} />
                    {radioTwo === 'Dual' ? 'Dual-site geo-replicated' : 'Australia' }
                </label>
            :null}
        </div>
    )
}

export default RadioGroup;