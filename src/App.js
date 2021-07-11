import React, {useState, useEffect} from 'react'

import './scss/main.scss';
import HomepageIntro from './components/sections/homepage-intro';
import HomepageCalculator from './components/sections/homepage-calculator';
import HomepageResults from './components/sections/homepage-results';

function App() {
  // ----------------------------- *
  // TRANSITION STATE FUNCTIONS
  // ----------------------------- *
  const [calculatorStart, setCalculatorStart] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  const handleCalculatorStart = () => {
    setCalculatorStart(true)
  }
  const handleResultsStart = () => {
    setShowResults(true)
  }

  // ----------------------------- *
  // CALCULATOR STATE
  // ----------------------------- *
  const [totalDataTB, setTotalDataTB] = useState(0)
  const [totalAPIRequests, setTotalAPIRequests] = useState(0)
  const [totalInEgress, setTotalInEgress] = useState(0)
  const [singleOrDuo, setSingleOrDuo] = useState('single')
  const [selectedCountry, setSelectedCountry] = useState('New Zealand')

  const handleTotalDataTB = (data) => {
    setTotalDataTB(data)
  }

  const handleTotalAPIRequests = (data) => {
    setTotalAPIRequests(data)
  }

  const handleTotalInEgress = (data) => {
    setTotalInEgress(data)
  }

  const handleSingleOrDuo = (data) => {
    setSingleOrDuo(data)
  }

  const handleSelectedCountry = (data) => {
    setSelectedCountry(data)
  }

  return (
    <div className="App">
      <HomepageIntro 
        startCalculator={handleCalculatorStart}
      />
      {/* Handle calculations inside this component? Then Pass to results as plain text? */}
      <HomepageCalculator 
        transitionIn={calculatorStart ? 'transition-in' : ''}
        startResults={handleResultsStart}
        totalDataTB={handleTotalDataTB}
        totalAPIRequests={handleTotalAPIRequests}
        totalInEgress={handleTotalInEgress}
        singleOrDuo={handleSingleOrDuo}
        selectedCountry={handleSelectedCountry}
      />
      {showResults ?
        <HomepageResults 
          transitionIn={showResults ? 'transition-in' : null}
          totalDataTB={totalDataTB}
          totalAPIRequests={totalAPIRequests}
          totalInEgress={totalInEgress}
          singleOrDuo={singleOrDuo}
          selectedCountry={selectedCountry}
        />
      :null}
    </div>
  );
}

export default App;
