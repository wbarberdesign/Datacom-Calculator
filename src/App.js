import React, {useState, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group';

import './scss/main.scss';
import HomepageIntro from './components/sections/homepage-intro';
import HomepageDataInput from './components/sections/homepage-data-input';
import HomepageCalculator from './components/sections/homepage-calculator';
import HomepageResults from './components/sections/homepage-results';
import Calculator from './components/utils/calculator'

function App() {
  // ----------------------------- *
  // TRANSITION STATE FUNCTIONS
  // ----------------------------- *
  const [dataInputStart, setDataInputStart] = useState(false)
  const [calculatorStart, setCalculatorStart] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  const handleDataInputStart = () => {
    setDataInputStart(true)
  }
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
  const [selectedCountry, setSelectedCountry] = useState('NZ')
  const [userEmail, setUserEmail] = useState('')


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

  const handleUserEmail = (data) => {
    setUserEmail(data)
  }

  return (
    <main className="App">
      <HomepageIntro 
        startDataInput={handleDataInputStart}
      />
      <HomepageDataInput 
        transitionIn={dataInputStart ? 'transition-in' : 'transition-out '}
        // transitionOut={calculatorStart ? 'transition-out' : ''}
        totalDataTB={handleTotalDataTB}
        startCalculator={handleCalculatorStart}
      />
      <HomepageCalculator 
        transitionIn={calculatorStart ? 'transition-in' : 'transition-out '}
        startResults={handleResultsStart}
        totalDataTB={totalDataTB}
        totalAPIRequests={handleTotalAPIRequests}
        totalInEgress={handleTotalInEgress}
        singleOrDuo={handleSingleOrDuo}
        selectedCountry={handleSelectedCountry}
        userEmail={handleUserEmail}
      />
      <HomepageResults 
        transitionIn={showResults ? 'transition-in' : 'transition-out '}
        totalDataTB={totalDataTB}
        totalAPIRequests={totalAPIRequests}
        totalInEgress={totalInEgress}
        singleOrDuo={singleOrDuo}
        selectedCountry={selectedCountry}
        userEmail={userEmail}
      />
    </main>
  );
}

export default App;
