import Button from '../common/button'
import NumberInput from '../common/NumberInput'

const HomepageCalculator = ({ transitionIn, transitionOut, totalDataTB, startCalculator }) => {
    const handleButtonClick = (e) => {
        startCalculator(e)
        window.location.hash = "calculator"
    }
    return (
        <section className={`homepage-data-input offset-top-large offset-bottom-large ${transitionIn} ${transitionOut}`} id="next">
            <div className="gc">
                <div className="d-1-13">
                    <article className="text-block">
                        <h3 className="mobile-only black h2">Data</h3>
                        <p className="dark-blue medium semi-bold m-body">Put the total TB you have in object storage</p>
                        <div className="input-container">
                        <NumberInput 
                            data={e => totalDataTB(e)}
                        />
                        <div className="fixed-label large semi-bold blue">TB</div>
                        </div>
                    </article>
                    <div className="flex flex-to-right">
                        <div onClick={handleButtonClick}>
                            <Button 
                                type="primary"
                                text="Next"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomepageCalculator;