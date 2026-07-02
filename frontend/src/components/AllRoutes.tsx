import { Routes, Route } from 'react-router-dom'
import { Home } from './contents/Home'
import { Surat } from './contents/Surat'
import { NotFound } from './contents/NotFound'
import Liturgi from './contents/Liturgi'
import { About } from './contents/About'

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liturgi" element={<Liturgi />} />
      <Route path="/surat" element={<Surat />} />
      <Route path="/About" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
