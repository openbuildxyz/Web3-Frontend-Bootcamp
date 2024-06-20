export default function Header({ peddingCount }) {
  const title = `Todo List ${peddingCount > 0 ? `(${peddingCount})` : ''}`
  return (
    <header>
      <h1 className='font-bold text-5xl p-5 pl-0'> {title} </h1>
    </header>
  )
}
