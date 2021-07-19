import Tile from '../blocks/tile'

const HomepageResults = ({transitionIn, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry, datacomStorageCost}) => {

var Storage = totalDataTB;  // Customer Storage in TB 
var Country = selectedCountry; // Country is either "NZ" or "AU"
var RepOption = singleOrDuo; // Replication is either "Single" or "Dual"
var Puts = Storage * 0.02; // Number of API Puts in Millions (default formula is Storage * 2%)
var Gets = Storage * 0.08; // Number of API Gets in Millions (default formula is Storage * 8%)
var Egress = totalInEgress; // Egress to Internet in TB (default formula is Storage * 10%)
var FXAUD = 1.3473511; // Exchange Rate as of 16 July 2021
var FXNZD = 1.4325155; // Exchange Rate as of 16 July 2021
var FX=FXAUD
var AWSEgressCost, AWSStorCost, AWSAPICost, AWSTotalCost, AWSNonStorPerc, DStorRate, DStorCost, DEgressCost, DTotalCost, DNonStorPerc;
// Exchange Rate
if (Country === "AU") {
    FX = FXAUD;
} else {
    FX = FXNZD;
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
if (singleOrDuo === "Dual") {
    AWSStorCost = AWSStorCost * 2;
} else {
    AWSStorCost = AWSStorCost * 1;
}
//API Costs
AWSAPICost = (Puts * 1000000 / 1000 * 0.0055) + (Gets * 1000000 / 1000 * 0.00044);

//Egress Costs
if (Egress < 10) {
    AWSEgressCost = (Egress * 1024 - 1) * 0.114;
} else if (Egress < 50) {  
    AWSEgressCost = (Egress - 10) * 1024 * 0.098 + (10239 - 1) * 0.114;
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
if (singleOrDuo == "Dual") {
    DStorRate = 0.069;
} else {
    DStorRate = 0.034;
}

//Datacom Cost Calculation
DStorCost = (Storage * 1024 * DStorRate) * FX;
DEgressCost = ((Egress - 1) * 1024 * 0.09) * FX;
DTotalCost = DStorCost + DEgressCost;
DNonStorPerc= DEgressCost / DTotalCost;

const marketLeaderData = {
    datasets: [
    {
        label: '# of Votes',
        data: [DStorCost, 0, DEgressCost],
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
        label: '# of Votes',
        data: [AWSStorCost, 0, AWSEgressCost],
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

    return (
    <section class={`homepage-results offset-top-large ${transitionIn}`}>
        <div className="gc">
            <div className="d-1-10">
                <h2>Your Results:</h2>
                <h3 className="x-large light-blue">${numberWithCommas(DTotalCost.toFixed(0))}<span>{selectedCountry}D p/m</span></h3>
            </div>
            <div className="d-4-10 offset-top-medium">
                <h3 className="large bold">Make bill-shock a thing of the past</h3>
            </div>
            <div className="d-5-10 offset-bottom-medium">
                <p className="large-body">With the lowest per-gig pricing, fee caps and all-inclusive features, Datacom’s object storage is designed to leave you with no surprises at the end of the month.</p>            
            </div>
            <div className="span-6">
                <h3 className="medium bold">Datacom</h3>
            </div>
            <div className="span-6">
                <h3 className="medium bold">Market Leader</h3>
            </div>
                <Tile 
                    chartData={datacomData}
                    tileName="datacom-tile"
                    tilePrice={numberWithCommas(DTotalCost.toFixed(0))}
                    dataCost={DStorCost.toFixed(0)}
                    apiCost={0}
                    egressCost={DEgressCost.toFixed(0)}
                    arrow={'↓'}
                />
                <Tile 
                    chartData={marketLeaderData}
                    tileName="market-leader-tile"
                    tilePrice={numberWithCommas(AWSTotalCost.toFixed(0))}
                    dataCost={numberWithCommas(AWSStorCost.toFixed(0))}
                    apiCost={numberWithCommas(AWSAPICost.toFixed(0))}
                    egressCost={numberWithCommas(AWSEgressCost.toFixed(0))}
                    arrow={'↑'}
                />
                
        </div>
    </section>
)
}

export default HomepageResults;