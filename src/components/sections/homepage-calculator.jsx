import Button from '../common/button'
import Slider from '../common/slider'
import NumberInput from '../common/NumberInput'
import RadioGroup from '../common/RadioGroup'

const HomepageCalculator = ({ transitionIn, startResults, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry, userEmail }) => {
    const handleCalculateClick = (e) => {
        startResults(e)
        window.location.hash="results";
    }

    return (
        <section className={`homepage-calculator offset-top-large ${transitionIn}`} id="calculator">
            <div className="gc">
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2 className="exclude-mobile-line">Data</h2>
                        <p>Put the total TB you have in object storage</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <p className="v-large blue semi-bold">{totalDataTB}TB</p>
                    </div>
                </div>
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>API Requests*</h2>
                        <p>How many API read and writes you carry out each month in support of your operations</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <Slider 
                            data={e => totalAPIRequests(e)}
                            min={5}
                            max={100}
                            type=" Million"
                            sliderActivated={false}
                        />
                    </div>
                </div>
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>Egress*</h2>
                        <p>“How much data you transfer from object storage through the internet per month”</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <Slider 
                            data={e => totalInEgress(e)}
                            min={1}
                            max={20}
                            type="TB"
                            sliderActivated={false}
                        />
                    </div>
                </div>
                <div className="span-6 m-r-2 m-span-12">
                    <RadioGroup 
                        mainLabel="My data is:"
                        radioOne="Single"
                        radioTwo="Dual"
                        data={e => singleOrDuo(e)}
                    />
                </div>
                <div className="d-9-13 m-span-12">
                    <RadioGroup 
                        mainLabel="I am based in:"
                        radioOne="NZ"
                        radioTwo="AU"
                        defaultSelection="NZ"
                        data={e => selectedCountry(e)}
                    />
                </div>
                <div className="d-1-9 m-1-13 flex flex-column">
                    <label htmlFor="emailAddress"><b>Email Address</b></label>
                    <input type="email" id="emailAddress" onKeyUp={(e) => userEmail(e.target.value)}/>
                </div>
                <div className="d-10-13 t-8-13 m-1-13 flex flex-to-right m-flex-to-left flex-to-bottom">
                    <div onClick={handleCalculateClick}>
                        <Button 
                            type="primary"
                            text="Calculate "
                        />
                    </div>
                </div>
                <div className="d-1-9 t-1-8 m-1-13">
                    <p style={{ color: "#111144", fontSize: "14px", lineHeight: "20px" }}>*To make it easy for you to see how you can have the lowest cost option with Datacom’s object storage without compromise, we’ve used an equation of average API’s and In/Egress related to the data you have in object storage per month. Use the sliders to add in your numbers.</p>
                </div>
            </div>
        </section>
    )
}

export default HomepageCalculator;