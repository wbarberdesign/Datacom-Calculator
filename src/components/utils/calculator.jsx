const Calculator = ({ totalDataTB, selectedCountry, totalInEgress, singleOrDuo, datacomStorageCost }) => {
	var Storage = totalDataTB;  // Customer Storage in TB 
	var Country = "NZ"; // Country is either "NZ" or "AU"
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
	if (singleOrDuo === "Dual-site geo-replicated") {
		AWSStorCost = AWSStorCost * 2;
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
	if (singleOrDuo == "Dual-site geo-replicated") {
		DStorRate = 0.069;
	} else {
		DStorRate = 0.034;
	}

	//Datacom Cost Calculation
	DStorCost = Storage * 1024 * DStorRate;
	DEgressCost = (Egress - 1) * 1024 * 0.09;
	DTotalCost = DStorCost + DEgressCost;
	DNonStorPerc= DEgressCost / DTotalCost;

	return (
		<div className="calculator" onLoad={e => datacomStorageCost(DStorCost)}>
			<div>All pricing is in {Country}D</div>
			<div>Competitor api cost: {AWSAPICost}</div>
			<div>Competitor Egress cost: {AWSEgressCost}</div>
			<div>Competitor Non Storage % of Total Cost = {AWSNonStorPerc}</div>
			<div>Datacom Storage Cost = {DStorCost}</div>
		</div>
	)
}

export default Calculator;