import Button from '../common/button'
import Slider from '../common/slider'
import NumberInput from '../common/NumberInput'
import RadioGroup from '../common/RadioGroup'

const HomepageCalculator = ({ transitionIn, startResults, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry }) => {
    return (
        <section className={`homepage-calculator offset-top-large ${transitionIn}`}>
            <div className="gc">
                <div className="span-4">
                    <article className="text-block">
                        <h2>Data</h2>
                        <p>Put the total TB you have in object storage</p>
                        <NumberInput 
                            data={e => totalDataTB(e)}
                        />
                    </article>
                </div>
                <div className="span-4">
                    <article className="text-block">
                        <h2>API Requests</h2>
                        <p>How many API read and writes you carry out each month in support of your operations</p>
                        <Slider 
                            data={e => totalAPIRequests(e)}
                        />
                    </article>
                </div>
                <div className="span-4">
                    <article className="text-block">
                        <h2>In/Egress*</h2>
                        <p>How much data do you move inside and outside of your network per month</p>
                        <Slider 
                            data={e => totalInEgress(e)}
                        />
                    </article>
                </div>
                <div className="span-6">
                    <RadioGroup 
                        mainLabel="My data is:"
                        radioOne="Single Site"
                        radioTwo="Dual-site geo-replicated"
                        data={e => singleOrDuo(e)}
                    />
                </div>
                <div className="span-6">
                    <RadioGroup 
                        mainLabel="I am based in:"
                        radioOne="New Zealand"
                        radioTwo="Australia"
                        defaultSelection="New Zealand"
                        data={e => selectedCountry(e)}
                    />
                </div>
                <div className="d-1-13">
                    <div onClick={startResults}>
                        <Button 
                            type="primary"
                            text="Calculate"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomepageCalculator;