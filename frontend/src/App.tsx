/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import { AllRoutes } from './components/AllRoutes'
import Footer from './components/Footer'
import Main from './components/Main'

export default function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col font-sans bg-icy-aqua/90">
        <BrowserRouter>
          <Header />
          <Main>
            <AllRoutes />
          </Main>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  )
}
