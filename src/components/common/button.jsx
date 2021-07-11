const Button = ({type, text, url}) => {
    return(
        <button className={type}>
            {text}
        </button>
    )
}

export default Button;