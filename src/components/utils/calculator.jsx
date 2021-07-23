const Calculator = ({ totalDataTB, selectedCountry, totalInEgress, totalAPIRequests, singleOrDuo, datacomStorageCost }) => {

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

        // Exchange Rate
        if (Country == "AU") {
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
        
        
        
            document.write("<br>All pricing is in " + Country +"D<br><br>");
            document.write("<br>Storage " + Storage);
            document.write("<br>Replication " + RepOption);
            document.write("<br>API Requests " + APIReqs + " million (" + Puts + " million PUTs & " + Gets + " million GETs)");
            document.write("<br>Egress " + Egress);
        
            document.write("<br>Egress " + Egress);
            document.write("<br>Competitor Storage Cost = $" + AWSStorCost.toFixed(2));
            document.write("<br>Competitor API Cost = $" +  AWSAPICost.toFixed(2));
            document.write("<br>Competitor Egress Cost = $" +  AWSEgressCost.toFixed(2));
            document.write("<br>Competitor Total Cost = $" +  AWSTotalCost.toFixed(2));
            document.write("<br>Competitor Non Storage % of Total Cost = " +  AWSNonStorPerc.toFixed(3) * 100 + "%<br>");
            document.write("<br>Datacom Storage Cost = $" +  DStorCost.toFixed(2));
            document.write("<br>Datacom API Cost = $" + 0);
            document.write("<br>Datacom Egress Cost = $" +  DEgressCost.toFixed(2));
            document.write("<br>Datacom Total Cost = $" +  DTotalCost.toFixed(2));
            document.write("<br>Datacom Non Storage % of Total Cost = " +  DNonStorPerc.toFixed(3) * 100 + "%");

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