import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import EntrepreneurLogin from './pages/EnterprenuerLogin'
import InvestorLogin from './pages/InvestorLogin'
import EnterprenuerDashboard from './pages/EnterprenuerDashboard'
import InvestorDashboard from './pages/investorDashboard'
import NewProjectForm from './pages/NewProjectForm'
import ProjectList from './pages/ProjectList'
import Register from './pages/Register'
import InvestorProfile from './pages/InvestorProfile'
import ViewProfile from './pages/Profile'
import InvestmentTracking from './pages/InvestementTracking'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enterprenuer-login" element={<EntrepreneurLogin />} />
      <Route path="/investor-login" element={<InvestorLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/entrepreneur-dashboard" element={<EnterprenuerDashboard />} />
      <Route path="/new-project" element={<NewProjectForm />} />
      <Route path="/investor-profile" element={<InvestorProfile />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/investor-dashboard" element={<InvestorDashboard />} />
      <Route path="/investment-tracking" element={<InvestmentTracking />} />
      <Route path="/profile" element={<ViewProfile />} />

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
