import Button from '../common/button'
import Slider from '../common/slider'
import NumberInput from '../common/NumberInput'
import RadioGroup from '../common/RadioGroup'

const HomepageCalculator = ({ transitionIn, startResults, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry }) => {
    return (
        <section className={`homepage-calculator offset-top-large ${transitionIn}`}>
            <div className="gc">
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>Data</h2>
                        <p>Put the total TB you have in object storage</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <p className="v-large blue semi-bold">{totalDataTB}tb</p>
                    </div>
                </div>
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>API Requests</h2>
                        <p>How many API read and writes you carry out each month in support of your operations</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <Slider 
                            data={e => totalAPIRequests(e)}
                            min={0}
                            max={100}
                            type="m"
                        />
                    </div>
                </div>
                <div className="span-4 t-span-12 flex flex-column flex-s-between">
                    <article className="text-block">
                        <h2>In/Egress*</h2>
                        <p>How much data do you move inside and outside of your network per month</p>
                    </article>
                    <div className="homepage-calculator-box">
                        <Slider 
                            data={e => totalInEgress(e)}
                            min={0}
                            max={10}
                            type="tb"
                        />
                    </div>
                </div>
                <div className="span-6">
                    <RadioGroup 
                        mainLabel="My data is:"
                        radioOne="Single"
                        radioTwo="Dual"
                        data={e => singleOrDuo(e)}
                    />
                </div>
                <div className="span-6">
                    <RadioGroup 
                        mainLabel="I am based in:"
                        radioOne="NZ"
                        radioTwo="AU"
                        defaultSelection="NZ"
                        data={e => selectedCountry(e)}
                    />
                </div>
                <div className="d-1-10 t-1-8">
                    <p>*To make it easy for you to see how you can have the lowest cost option with Datacom’s object storage without compromise, we’ve used an equation of average API’s and In/Egress related to the data you have in object storage per month. Use the sliders to add in your numbers.</p>
                </div>
                <div className="d-10-13 t-8-13 flex flex-to-right">
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