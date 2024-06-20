import { Header, ToDoList } from '@/components'
export default function App() {
  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-y-4'>
      <Header />
      <ToDoList />
    </div>
  )
}