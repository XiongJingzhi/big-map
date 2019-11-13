import React from 'react';
import Main from './components/main'
import Header from './components/header'
import AsideSection from './components/aside'
import './App.css';

function App() {
  function updateSize() {
    const widthScale = window.innerWidth / 1920
    const heightScale = window.innerHeight / 1080
    console.log('widthScale', widthScale, heightScale)
    document.body.style.transform = `scale(${widthScale}, ${heightScale})`
  }
  updateSize()
  window.addEventListener('resize', updateSize)
  
  return (
    <div className="App">
      <Header/>
      <Main />
      <AsideSection />
    </div>
  );
}

export default App;
