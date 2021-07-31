import Tile from '../blocks/tile'
import useOnScreen from '../utils/isOnScreen'
import CountUp from 'react-countup';
import { useRef  } from 'react';

const HomepageResults = ({transitionIn, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry, datacomStorageCost, userEmail}) => {
    const ref = useRef()
    const isVisible = useOnScreen(ref)
    
    if(transitionIn === 'transition-in') {
        console.log(`results - total api ${totalAPIRequests}`);
    }
		// --------------- //
		// DEFAULT VARIABLES FROM DATACOM
		// --------------- //
		var Storage = 100;  // Customer Storage in TB 
        var Country = "NZ"; // Country is either "NZ" or "AU"
        var RepOption = "Dual"; // Replication is either "Single" or "Dual"
        var APIReqs = Storage * 0.1; // Number of API requests in Millions (default formula is Storage * 10%)
        var Egress = Storage * 0.1; // Egress to Internet in TB (default formula is Storage * 10%)
        var FXAUD = 1.3473511; // Exchange Rate as of 16 July 2021
        var FXNZD = 1.4325155; // Exchange Rate as of 16 July 2021
        var FX = FXNZD;
        var AWSEgressCost, AWSStorCost, AWSAPICost, AWSTotalCost, AWSNonStorPerc, DStorRate, DStorCost, DEgressCost, DTotalCost, DNonStorPerc;
		// --------------- //
		// OVVERIDE WITH USER INPUTS
		// --------------- //
		Storage=totalDataTB;
		Country=selectedCountry;
		Egress=totalInEgress;
		APIReqs=totalAPIRequests;
		RepOption=singleOrDuo;

        // Pass in 10% into slider automatically.

        // Exchange Rate
        if (Country === "AU") {
            FX = FXAUD;
        }
        
        // Storage Costs (var = StorCost)
        if (Storage < 50) {
                AWSStorCost = Storage * 1024 * 0.025;
        } else if (Storage < 500) {
             AWSStorCost = (Storage - 50) * 1024 * 0.024 + (50 * 1024 * 0.025);
        } else {
             AWSStorCost = (Storage - 500) * 1024 * 0.023 + (50 * 1024 * 0.025) + (450 * 1024 * 0.024);
        }
        
        //Replication Aspect
        if (RepOption == "Dual") {
            AWSStorCost = AWSStorCost * 2;
        }
        
        //API Costs
        var Puts = APIReqs * 0.2 // 20% of API requests are Puts
        var Gets = APIReqs * 0.8 // 80% of API requests are Gets
        
        AWSAPICost = (Puts * 1000 * 0.0055) + (Gets * 1000 * 0.00044);
        
        //Egress Costs
        if (Egress < 1/1024) {
            AWSEgressCost = 0;
        }  else if (Egress < 10) {
            AWSEgressCost = (Egress * 1024 - 1) * 0.114;
        } else if (Egress < 50) {  
            AWSEgressCost = ((Egress - 10) * 1024 * 0.098) + (10239 * 0.114);
        } else if (Egress < 150) {
            AWSEgressCost = (Egress - 50) * 1024 * 0.094 + (40 * 1024 * 0.098) + (10239 * 0.114);
        } else {
            AWSEgressCost = (Egress - 150) * 1024 * 0.092 + (150 * 1024 * 0.094) + (40 * 1024 * 0.098) + (10239 * 0.114);
        }
        
        // Final FX Application
        AWSStorCost = AWSStorCost * FX;
        AWSAPICost = AWSAPICost * FX;
        AWSEgressCost = AWSEgressCost * FX;
        AWSTotalCost = AWSStorCost + AWSAPICost + AWSEgressCost; 
        AWSNonStorPerc = (AWSAPICost + AWSEgressCost) / AWSTotalCost;
        
        //Datacom Costs - Rate for Dual or Single site replication
        if (RepOption == "Dual") {
            DStorRate = 0.069;
        } else {
            DStorRate = 0.034;
        }
        
        //Datacom Cost Calculation
        DStorCost = Storage * 1024 * DStorRate;
        if(Egress < 1) {
            DEgressCost = 0;
        } else {
          DEgressCost = (Egress - 1) * 1024 * 0.09;
        }
        DTotalCost = DStorCost + DEgressCost;
        DNonStorPerc= DEgressCost / DTotalCost;

const marketLeaderData = {
    datasets: [
    {
        data: [AWSStorCost, AWSAPICost, AWSEgressCost],
        backgroundColor: [
        '#76C4FF',
        '#DE5835',
        '#0054FF'
        ],
        borderWidth: 1,
    },
    ],
};

const datacomData = {
    datasets: [
    {
        data: [DStorCost, 0, DEgressCost],
        backgroundColor: [
        '#76C4FF',
        '#DE5835',
        '#0054FF'
        ],
        borderWidth: 0,
        cutoutPercentage: 0
    },
    ],
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const percentageDifference = (AWSTotalCost - DTotalCost) / DTotalCost * 100;
const billShock = (AWSAPICost + AWSEgressCost) / AWSTotalCost * 100;

    return (
    <section class={`homepage-results offset-top-large ${transitionIn}`} id="results" ref={ref}>
        <div className="gc">
            <div className="d-1-13">
                <h2 style={{ marginBottom: "5rem" }}>Your Results:</h2>
                {isVisible ?
                    <h3 className="x-large light-blue">
                        $<CountUp 
                        start={0}
                        duration={4}
                        separator=","
                        end={DTotalCost.toFixed(0)} 
                        />
                        <span>{selectedCountry}D p/m</span>
                    </h3>
                :null}
            </div>
            <div className="d-4-10 t-2-12 offset-top-medium">
                <h3 className="large bold">Make bill-shock a thing of the past</h3>
            </div>
            <div className="d-5-10 t-3-12 offset-bottom-medium">
                <p className="large-body">With low per-gig pricing, no API charges and a generous 1 TB of free egress to internet per month, Datacom’s object storage is designed to leave you with no surprises at the end of the month.</p>            
            </div>
            <div className="span-6 t-span-12">
                <h3 className="medium bold">Datacom</h3>
            </div>
            <div className="span-6 t-span-12 t-r-6">
                <h3 className="medium bold">Alternate Provider</h3>
            </div>
                <Tile 
                    chartData={datacomData}
                    tileName="datacom-tile"
                    tilePrice={DTotalCost.toFixed(0)}
                    dataCost={DStorCost.toFixed(0)}
                    apiCost={0}
                    egressCost={DEgressCost.toFixed(0)}
                    arrow={'↓'}
                />
                <Tile 
                    chartData={marketLeaderData}
                    tileName="market-leader-tile"
                    tilePrice={AWSTotalCost.toFixed(0)}
                    dataCost={AWSStorCost.toFixed(0)}
                    apiCost={AWSAPICost.toFixed(0)}
                    egressCost={AWSEgressCost.toFixed(0)}
                    arrow={'↑'}
                    percentage={percentageDifference.toFixed(0)}
                    billShock={billShock}
                />
                
                {singleOrDuo === 'Dual' && selectedCountry === 'AU' ?
                    <div className="warning-block span-4 t-span-12 flex flex-r flex-middle data-sovereignty-warning" style={{ backgroundColor: "#B10044" }}>
                        <img src="https://seven.co.nz/media/site/3054248027-1626921512/exclamation-triangle-light.svg" alt="Exclaimation mark" />
                        <img src="https://seven.co.nz/media/site/1228275226-1626921512/path-18.svg" alt="" />
                        <div className="warning-block-description">
                            <p>Your primary site data remains in country (Sydney), but your secondary site data will be stored overseas (eg Singapore or Hong Kong)</p>
                        </div>
                    </div>
                : selectedCountry === 'NZ' ?
                    <div className="warning-block span-4 t-span-12 flex flex-r flex-middle data-sovereignty-warning" style={{ backgroundColor: "#B10044" }}>
                        <img src="https://seven.co.nz/media/site/3054248027-1626921512/exclamation-triangle-light.svg" alt="Exclaimation mark" />
                        <img src="https://seven.co.nz/media/site/1228275226-1626921512/path-18.svg" alt="" />
                        <div className="warning-block-description">
                            <p>Your data will be stored overseas</p>
                        </div>
                    </div>
                :null}

                <div className="warning-block span-8 t-span-12 flex flex-r flex-middle" style={{ backgroundColor: "#E60060" }}>
                <img src="https://seven.co.nz/media/site/3054248027-1626921512/exclamation-triangle-light.svg" alt="Exclaimation mark" />
                <h3 className="large bold" style={{ marginRight: "20px"}}>{billShock.toFixed(0)}%</h3>
                    <div className="warning-block-description">
                        <p>of your monthly bill is made up of unexpected non-storage costs</p>
                    </div>
                    <div className="up-indicator" style={{ backgroundColor: "#E60060" }}></div>
                </div>
                <div className="d-1-13 offset-top-large">
                    <h3 className="medium bold">And not only that...</h3>
                </div>
                <div className="more-info-tile span-4 t-span-12 flex flex-center flex-middle flex-column text-center">
                    <img src="https://seven.co.nz/media/site/3109965777-1626921513/server-light.svg" alt="" />
                    <p className="large-body">It’s all locally stored, which means lower latency and faster for you.</p>
                </div>
                <div className="more-info-tile span-4 t-span-12 flex flex-center flex-middle flex-column text-center">
                    <img src="https://seven.co.nz/media/site/45446754-1626921513/tachometer-alt-fastest.svg" alt="" />
                    <p className="large-body">Save time because our API employs the S3 protocol, reducing time spent on backups.</p>
                </div>
                <div className="more-info-tile span-4 t-span-12 flex flex-center flex-middle flex-column text-center">
                    <img src="https://seven.co.nz/media/site/1769772506-1626921513/user-headset-light.svg" alt="" />
                    <p className="large-body">Like our data storage, we’re local too, making our support and response fast.</p>
                </div>

                <div className="span-6 m-span-12 offset-top-large">
                    <h3 className="large bold">It's the best cost. It's good. It's fast.</h3>
                </div>
                <div className="d-1-6 t-span-12 offset-bottom-large">
                    <p className="x-large-body"><a className="bold white blue-underline" href="https://datacom.com/nz/en/about-us/partners/dell-technologies/object-storage">Contact us</a> to find out more</p>
                </div>
                <div className="offset-bottom-large d-1-13">
                <ol>
                    <li>Alternate object storage provider pricing sourced from publicly published pricing and is accurate as of 16/07/2021</li>
                    <li>Exchange rates sourced from <a href="www.xe.com">www.xe.com</a> and are accurate as of 16/07/2021</li>
                    <li>API Request costs assume 20% of requests are PUTs, and 80% of requests are GETs</li>
                    <li>The costs displayed are for comparison only, final costs will be determined after the completion of a detailed analysis of your particular circumstances</li>
                    <li>Comparison product is an established public cloud provider and in accordance with an online calculator of fees</li>
                </ol>
            </div>
        </div>
    </section>
)
}

export default HomepageResults;