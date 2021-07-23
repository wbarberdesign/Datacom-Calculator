const NumberInput = ({data}) => {
    return (
        <>
            <input type="number" onChange={e => data(e.target.value)} />
            <span>TB</span>
        </>
    )
}
export default NumberInput;