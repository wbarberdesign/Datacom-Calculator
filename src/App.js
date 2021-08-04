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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [dataInputStart, setDataInputStart] = useState(false)
  const [calculatorStart, setCalculatorStart] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [resetApp, setResetApp] = useState(false)
  
  const handleDataInputStart = () => {
    // Everytime button is clicked - reset app variables
    console.log('resetstate');
    setCalculatorStart(false)
    setShowResults(false)
    setDataInputStart(true)
    setTotalDataTB(10)
    setTotalAPIRequests(77)
    setTotalInEgress(1)
    setSingleOrDuo('Dual')
    setSelectedCountry('NZ')
    setUserEmail('')
  }
  const handleCalculatorStart = () => {
    setCalculatorStart(true)

  }
  const handleResultsStart = () => {
    setShowResults(true)
    if(buttonClicked === false) {
      setButtonClicked(true) 
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
        };

        fetch(`https://seven.co.nz/media/datacom-send.php?data=${totalDataTB}&api=${totalAPIRequests}&egress=${totalInEgress}&country=${selectedCountry}&single=${singleOrDuo}&email=${userEmail}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log('Mail sent successfully.'))
        .catch(error => console.log('error', error));
    } else {
      console.log('button already been clicked.. dont send email');
    }
  }
  // console.log('Site by https://barber.codes')

  // ----------------------------- *
  // CALCULATOR STATE
  // ----------------------------- *
  const [totalDataTB, setTotalDataTB] = useState(10)
  const [totalAPIRequests, setTotalAPIRequests] = useState(77)
  const [totalInEgress, setTotalInEgress] = useState(1)
  const [singleOrDuo, setSingleOrDuo] = useState('Dual')
  const [selectedCountry, setSelectedCountry] = useState('NZ')
  const [userEmail, setUserEmail] = useState('')


  const handleTotalDataTB = (data) => {
    setTotalDataTB(data);
    setTotalAPIRequests((data * 7.7).toFixed(0))
    setTotalInEgress((data / 20).toFixed(0))
  }

  const handleResetApp = () => {
    setTotalDataTB(10);
    setTotalAPIRequests(77)
    setTotalInEgress(1)
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
        transitionOut={calculatorStart ? 'transition-out' : ''}
        totalDataTB={handleTotalDataTB}
        totalDataState={totalDataTB}
        startCalculator={handleCalculatorStart}
        reset={handleResetApp}
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
        reset={resetApp}
        totalAPIRequestsState={totalAPIRequests}
        totalEgressState={totalInEgress}
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
