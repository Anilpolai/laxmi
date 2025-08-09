import './App.css'
import Kurti from './Pages/Kurti'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Endlayout from './component/Endlayout'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Endlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kurti" element={<Kurti />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
