import Button from '../common/button'
import NumberInput from '../common/NumberInput'
import Slider from '../common/slider'
import SliderNew from '../common/slider-new'

const HomepageCalculator = ({ totalDataState, transitionIn, transitionOut, totalDataTB, startCalculator, start, reset }) => {
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
                        <p className="dark-blue medium semi-bold m-body">Enter the number of terabytes of backup data you want to store on object storage</p>
                        <div className="input-container">
                        {/* <NumberInput 
                            data={e => totalDataTB(e)}
                        /> */}
                        {/* <Slider 
                            data={e => totalDataTB(e)}
                            min={10}
                            max={1000}
                            type="TB"
                            sliderActivated={transitionIn}
                            start={10}
                            textColor="blue"
                            key={reset}
                        /> */}
                        <SliderNew 
                            min={10}
                            max={1000}
                            start={totalDataState}
                            textColor="blue"
                            type="TB"
                            handleSliderUpdate={e => totalDataTB(e)}
                        />
                        {/* <div className="fixed-label large semi-bold blue">TB</div> */}
                        </div>
                    </article>
                </div>
            </div>
            <div className="next-button flex flex-to-right">
                <div onClick={handleButtonClick}>
                    <Button 
                        type="primary"
                        text="Next"
                    />
                </div>
            </div>
        </section>
    )
}

export default HomepageCalculator;