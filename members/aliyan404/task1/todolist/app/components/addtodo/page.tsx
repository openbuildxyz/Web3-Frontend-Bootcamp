import { TODO } from '@/app/utils/interface/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useState } from 'react'

export default function AddToDo({ add }: any) {
  const [todo, setToDo] = useState<TODO>({ title: '', completed: false })

  return (
    <div className="flex flex-row gap-2 bg-slate-400">
      <Input
        placeholder="Add a todo"
        onChange={(e) => setToDo({ title: e.target.value, completed: false })}
      />
      <Button onClick={() => add(todo)}>Add</Button>
    </div>
  )
}
