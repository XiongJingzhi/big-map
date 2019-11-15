import React from 'react'
import { ToggleProvider } from './components/content'
import Main from './components/main'
import Header from './components/header'
import AsideSection from './components/aside'
import './App.css'
import 'normalize.css'

function App() {
  return (
    <div className="App">
      <ToggleProvider>
        <Header/>
        <Main />
        <AsideSection />
      </ToggleProvider>
    </div>
  );
}

export default App;
