import Button from '../common/button'
import NumberInput from '../common/NumberInput'

const HomepageCalculator = ({ transitionIn, transitionOut, totalDataTB, startCalculator }) => {
    return (
        <section className={`homepage-data-input offset-top-large ${transitionIn} ${transitionOut}`}>
            <div className="gc">
                <div className="d-1-13">
                    <article className="text-block">
                        <p className="dark-blue medium semi-bold">Put the total TB you have in object storage</p>
                        <NumberInput 
                            data={e => totalDataTB(e)}
                        />
                    </article>
                    <div className="flex flex-to-right">
                        <div onClick={startCalculator}>
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