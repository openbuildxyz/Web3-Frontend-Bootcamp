import { useEffect } from 'react'
import bgMatter from '../matter/app-bg'

export default function AppBg() {
  useEffect(() => {
    bgMatter()
  }, [])
  return (
    <div
      id='app-bg-wrapper'
      className='absolute top-0 left-0 right-0 bottom-0 -z-1'
    ></div>
  )
}
