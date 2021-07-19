const NumberInput = ({data}) => {
    return (
        <>
            <input type="number" onChange={e => data(e.target.value)} />
            <span>{data}</span>
        </>
    )
}
export default NumberInput;