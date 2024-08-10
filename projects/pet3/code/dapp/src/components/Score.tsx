export default function Score({ score }: { score: number }) {
  return (
    <div className='flex flex-col items-center justify-center text-white'>
      <div className='text-3xl'>Your Score</div>
      <div className='text-[8rem] py-6'>{score || 0}</div>
    </div>
  )
}
