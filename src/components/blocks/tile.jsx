import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import useOnScreen from '../utils/isOnScreen'
import { useRef } from 'react';

const Tile = ({ tileName, chartData, tilePrice, dataCost, apiCost, egressCost, arrow, percentage }) => {
    const ref = useRef()
    const isVisible = useOnScreen(ref)
    return(
        <div className={`span-6 t-span-12 datacom-tile tile ${tileName}`} ref={ref}>
            <div className="span-2 tile-title flex flex-r flex-to-bottom">
            {isVisible ?
                    <div className={`large bold ${tileName === 'market-leader-tile' ? 'dark-blue' : ''}`}>
                        $<CountUp 
                        start={0}
                        duration={3}
                        separator=","
                        end={tilePrice} 
                        />
                    </div>
                :null}
            {tileName === 'market-leader-tile' ? 
                <span style={{ marginBottom: '8px', marginLeft: '10px' }} className="arrow">{arrow} {(percentage * 100).toFixed(0)}%</span>
            :null}
            </div>
        <div className="chart-block flex flex-center flex-middle">
            <Doughnut data={chartData} />
        </div>
        <div className="chart-data">
            <div className="chart-data-block">
                <h3><span className="arrow">{arrow}</span> Data</h3>
                <div className="flex flex-r flex-middle chart-data-info">
                    <div className="chart-identifier data"></div>
                    {isVisible ?
                    <div className="total-price h2 bold">
                    $<CountUp 
                    start={0}
                    duration={3}
                    separator=","
                    end={dataCost} 
                    />
                    </div>
                    :null}
                </div>
            </div>
            <div className="chart-data-block">
                <h3><span className="arrow">{arrow}</span> API Requests</h3>
                <div className="flex flex-r flex-middle chart-data-info">
                    <div className="chart-identifier api"></div>
                    {isVisible ?
                    <div className="total-price h2 bold">
                        $<CountUp 
                        start={0}
                        duration={3}
                        separator=","
                        end={apiCost} 
                        />
                    </div>
                    :null}
                </div>
                {tileName === 'market-leader-tile' ?
                    <div className="warning-block flex flex-center flex-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="82.064" height="72.949" viewBox="0 0 82.064 72.949">
                            <defs>
                            </defs>
                            <path id="exclamation-triangle-light" style={{fill: "white"}} class="cls-1" d="M38.521,22.8h5.058a.855.855,0,0,1,.855.883L43.365,51.606a.861.861,0,0,1-.855.826H39.589a.852.852,0,0,1-.855-.826L37.666,23.68A.855.855,0,0,1,38.521,22.8Zm2.536,32.485a3.989,3.989,0,1,0,3.989,3.989A3.983,3.983,0,0,0,41.057,55.282Zm40.108,7.409L46.984,3.419a6.847,6.847,0,0,0-11.854,0L.949,62.691A6.845,6.845,0,0,0,6.876,72.949H75.252A6.841,6.841,0,0,0,81.164,62.691Zm-5.913,5.7H6.862a2.285,2.285,0,0,1-1.98-3.419L39.076,5.7a2.28,2.28,0,0,1,3.947,0L77.218,64.97a2.277,2.277,0,0,1-1.966,3.419Z" transform="translate(-0.027)"/>
                        </svg>
                    </div>
                :null}
            </div>
            <div className="chart-data-block">
                <h3><span className="arrow">{arrow}</span> Egress</h3>
                <div className="flex flex-r flex-middle chart-data-info">
                    <div className="chart-identifier egress"></div>
                    {isVisible ?
                        <div className="total-price bold h2">
                            $<CountUp 
                            start={0}
                            duration={3}
                            separator=","
                            end={egressCost} 
                            />
                        </div>
                    :null}
                </div>
                {tileName === 'market-leader-tile' ?
                    <div className="warning-block flex flex-center flex-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="82.064" height="72.949" viewBox="0 0 82.064 72.949">
                            <defs>
                            </defs>
                            <path id="exclamation-triangle-light" style={{fill: "white"}} class="cls-1" d="M38.521,22.8h5.058a.855.855,0,0,1,.855.883L43.365,51.606a.861.861,0,0,1-.855.826H39.589a.852.852,0,0,1-.855-.826L37.666,23.68A.855.855,0,0,1,38.521,22.8Zm2.536,32.485a3.989,3.989,0,1,0,3.989,3.989A3.983,3.983,0,0,0,41.057,55.282Zm40.108,7.409L46.984,3.419a6.847,6.847,0,0,0-11.854,0L.949,62.691A6.845,6.845,0,0,0,6.876,72.949H75.252A6.841,6.841,0,0,0,81.164,62.691Zm-5.913,5.7H6.862a2.285,2.285,0,0,1-1.98-3.419L39.076,5.7a2.28,2.28,0,0,1,3.947,0L77.218,64.97a2.277,2.277,0,0,1-1.966,3.419Z" transform="translate(-0.027)"/>
                        </svg>
                    </div>
                :null}
            </div>
        </div>
        <div className="country-replication flex flex-r flex-middle span-2 ">
            {tileName === 'market-leader-tile' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="82.064" height="72.949" viewBox="0 0 82.064 72.949">
                    <defs>
                    </defs>
                    <path id="exclamation-triangle-light" style={{fill: "#E60060"}} class="cls-1" d="M38.521,22.8h5.058a.855.855,0,0,1,.855.883L43.365,51.606a.861.861,0,0,1-.855.826H39.589a.852.852,0,0,1-.855-.826L37.666,23.68A.855.855,0,0,1,38.521,22.8Zm2.536,32.485a3.989,3.989,0,1,0,3.989,3.989A3.983,3.983,0,0,0,41.057,55.282Zm40.108,7.409L46.984,3.419a6.847,6.847,0,0,0-11.854,0L.949,62.691A6.845,6.845,0,0,0,6.876,72.949H75.252A6.841,6.841,0,0,0,81.164,62.691Zm-5.913,5.7H6.862a2.285,2.285,0,0,1-1.98-3.419L39.076,5.7a2.28,2.28,0,0,1,3.947,0L77.218,64.97a2.277,2.277,0,0,1-1.966,3.419Z" transform="translate(-0.027)"/>
                </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g id="Group_57" data-name="Group 57" transform="translate(-382 -3445)">
                    <g id="Ellipse_50" data-name="Ellipse 50" transform="translate(382 3445)" fill="none" stroke="#1dba00" stroke-width="1.5">
                    <circle cx="12" cy="12" r="12" stroke="none"/>
                    <circle cx="12" cy="12" r="11.25" fill="none"/>
                    </g>
                    <path id="Path_17" data-name="Path 17" d="M5471.5,3647.02l3.486,3.487,6.495-6.494" transform="translate(-5082.486 -190.26)" fill="none" stroke="#1dba00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </g>
            </svg>
            } 
            <p>In country replication: <b>{tileName === 'market-leader-tile' ? 'no' : 'yes'}</b></p>
        </div>
    </div>
    )
}

export default Tile;