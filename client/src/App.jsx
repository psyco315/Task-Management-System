import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import LoginBase from './components/login/Base.jsx'
import HomeBase from './components/home/Base.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [userList, setUserList] = useState([])
  const [currUser, setCurrUser] = useState('')

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginBase />} />
        <Route path="/task" element={<HomeBase />} />
      </Routes>
    </>
  )
}

export default App
