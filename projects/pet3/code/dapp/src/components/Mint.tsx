import React, { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import Pet3Png from '../assets/pet3.png'
import './mint.css'
import MintButton from './MintButton'
import { Pet3Abi } from '../abi/Pet3'
import { CONTRACT_ADDRESS } from '../common/const'
import { useAccount, useReadContract } from 'wagmi'
import ScoreContent from './ScoreContent'

const Mint = () => {
  const { address, isConnected } = useAccount()
  const result = useReadContract({
    abi: Pet3Abi,
    address: CONTRACT_ADDRESS,
    functionName: 'balanceOf',
    args: [address],
  })
  const minted = result.status === 'success' && (result.data as number) > 0
  let content
  if (result.status === 'pending') {
    content = <div className='text-white'>Loading...</div>
  } else {
    if (!minted) {
      content = (
        <>
          <TiltCard />
          <div className='mt-[30px] flex justify-center'>
            <MintButton
              minted={minted}
              isConnected={isConnected}
              address={address}
            ></MintButton>
          </div>
        </>
      )
    } else {
      content = <ScoreContent address={address}></ScoreContent>
    }
  }

  return (
    <div className='flex justify-center flex-col items-center w-full place-content-center  px-4 py-12 text-slate-900'>
      {content}
    </div>
  )
}

const ROTATION_RANGE = 32.5
const HALF_ROTATION_RANGE = 32.5 / 2

const TiltCard = () => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (e: any) => {
    if (!ref.current) return [0, 0]

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
    const rY = mouseX / width - HALF_ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className='relative h-48 w-40 rounded-xl bg-gradient-to-br from-yellow-300 to-red-300'
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className='absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg'
      >
        <p
          style={{
            transform: 'translateZ(50px)',
          }}
          className='text-center text-2xl font-bold'
        >
          <img src={Pet3Png} alt='' />
        </p>
      </div>
    </motion.div>
  )
}

export default Mint
