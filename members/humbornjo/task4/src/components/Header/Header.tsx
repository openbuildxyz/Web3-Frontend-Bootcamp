
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return (
    <>
      <div className='static w-full h-16 bg-slate-50'>
        <div className='absolute top-3 right-5'>
          <ConnectButton />
        </div>
      </div>
    </>
  )

}


export default Header
