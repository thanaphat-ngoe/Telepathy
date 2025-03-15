import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import PartnerIDPage from './pages/PartnerIDPage'
import ChatingPage from './pages/ChatingPage'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/partnerid" element={<PartnerIDPage />} />
        <Route path="/chat" element={<ChatingPage />} />
      </Routes>
    </Router>
  )
}

export default App;
