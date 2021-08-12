import Button from '../common/button'
import SliderNew from '../common/slider-new'
import { useState } from 'react'

const HomepageCalculator = ({ transitionIn, startResults, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry, userEmail, totalAPIRequestsState, totalEgressState }) => {
    const [selectedCountryInput, updateSelectedCountryInput] = useState('NZ');
    const [selectedDualInput, updateSelectedDualInput] = useState('Dual');

    const handleCalculateClick = (e) => {
        startResults(e)
        window.location.hash="results";
    }

    const handleSelectedCountryInput = (e) => {
        updateSelectedCountryInput(e.target.value);
        selectedCountry(e.target.value);
    }

    const handleSelectedDualInput = (e) => {
        updateSelectedDualInput(e.target.value);
        singleOrDuo(e.target.value);
    }

    const updateTotalAPIRequests = (e) => {
        totalAPIRequests(e);
    }

    const updateTotalEgress = (e) => {
        totalInEgress(e);
    }
    
    return (
        <section className={`homepage-calculator offset-top-large ${transitionIn}`} id="calculator">
            <div className="gc">
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2 className="exclude-mobile-line">Backup Data</h2>
                        <p>This is the amount of backup data you have in object storage</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <p className="v-large blue semi-bold">{totalDataTB}TB</p>
                    </div>
                </div>
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>API Requests*</h2>
                        <p>How many API reads and writes carried out each month in support of your backup operations</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <SliderNew 
                            min={1}
                            max={5000}
                            type={' Million'}
                            start={totalAPIRequestsState < 1 ? 1 : totalAPIRequestsState}
                            handleSliderUpdate={e => updateTotalAPIRequests(e)}
                        />
                    </div>
                </div>
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>Egress*</h2>
                        <p>How much data transferred from object storage through the internet per month through your backup solution</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <SliderNew 
                            min={1}
                            max={50}
                            type={"TB"}
                            start={totalEgressState < 1 ? 1 : totalEgressState}
                            handleSliderUpdate={e => updateTotalEgress(e)}
                        />
                    </div>
                </div>
                <div className="span-6 m-r-2 m-span-12">
                    <div className="radio-group">
                        <h4 className="bold">My data is:</h4>
                            <label key={`radio-1`}>
                                <input checked={selectedDualInput === 'Single'} type="radio" value='Single' onChange={e => handleSelectedDualInput(e)} />
                                Single site
                            </label>
                            <label key={`radio-2`}>
                                <input checked={selectedDualInput === 'Dual'} type="radio" value='Dual' onChange={e => handleSelectedDualInput(e)} />
                                Dual-site multi-region replicated
                            </label>
                    </div>
                </div>
                <div className="d-9-13 t-span-6 m-span-12">
                    <div className="radio-group">
                        <h4 className="bold">I am based in:</h4>
                            <label key={`radio-3`}>
                                <input checked={selectedCountryInput === 'NZ'} type="radio" value='NZ' onChange={e => handleSelectedCountryInput(e)} />
                                New Zealand
                            </label>
                            <label key={`radio-4`}>
                                <input checked={selectedCountryInput === 'AU'} name="country" type="radio" value='AU' onChange={e => handleSelectedCountryInput(e)} />
                                Australia
                            </label>
                    </div>
                </div>
                <div className="d-1-9 m-1-13 flex flex-column">
                    <label htmlFor="emailAddress"><b>Email Address (in case you want a Datacom expert to contact you to discuss object storage in more detail)</b></label>
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
                    <p style={{ color: "#111144", fontSize: "14px", lineHeight: "20px" }}>*To make it easy for you to see how you can have the lowest cost option with Datacom’s object storage without compromise, we’ve used an equation of average API’s and Egress related to the data you have in object storage per month. Use the sliders to fine-tune your numbers.</p>
                </div>
            </div>
        </section>
    )
}

export default HomepageCalculator;