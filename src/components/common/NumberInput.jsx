const NumberInput = ({data}) => {
    return (
        <>
            <input type="number" onChange={e => data(e.target.value)} />
        </>
    )
}
export default NumberInput;