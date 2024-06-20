import { useState } from 'react'
// import './App.css'
import Header from './todoComponents/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <div>
        Tom
      </div>
    </>
  )
}

export default App
