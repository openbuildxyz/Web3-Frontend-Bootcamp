import './App.css'
import { Web3Provider } from './common/Web3Provider'
import AppBg from './components/AppBg'
import Header from './components/Header'
import Mint from './components/Mint'

function App() {
  return (
    <Web3Provider>
      <div className='w-full'>
        <AppBg></AppBg>
        <Header></Header>
        <main>
          <Mint></Mint>
        </main>
      </div>
    </Web3Provider>
  )
}

export default App
