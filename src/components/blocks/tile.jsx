import { Doughnut } from 'react-chartjs-2';

const Tile = ({ tileName, chartData, tilePrice, dataCost, apiCost, egressCost, arrow }) => {
    return(
        <div className={`span-6 datacom-tile tile ${tileName}`}>
            <div className="span-2 tile-title">
            <h3 className={`large bold ${tileName === 'market-leader-tile' ? 'dark-blue' : ''}`}>${tilePrice}</h3>
            </div>
        <div className="chart-block flex flex-center flex-middle">
            <Doughnut data={chartData} />
        </div>
        <div className="chart-data">
            <div className="chart-data-block">
                <h3><span className="arrow">{arrow}</span> Data</h3>
                <div className="flex flex-r flex-middle chart-data-info">
                    <div className="chart-identifier data"></div>
                    <div className="total-price bold">${dataCost}</div>
                </div>
            </div>
            <div className="chart-data-block">
                <h3><span className="arrow">{arrow}</span> API Requests</h3>
                <div className="flex flex-r flex-middle chart-data-info">
                    <div className="chart-identifier api"></div>
                    <div className="total-price bold">${apiCost}</div>
                </div>
            </div>
            <div className="chart-data-block">
                <h3><span className="arrow">{arrow}</span> Egress</h3>
                <div className="flex flex-r flex-middle chart-data-info">
                    <div className="chart-identifier egress"></div>
                    <div className="total-price bold">${egressCost}</div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Tile;