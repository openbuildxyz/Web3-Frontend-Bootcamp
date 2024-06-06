
export interface Todo {
  readonly id: number
  title: string
  description?: string
  create_time: Date
  update_time: Date
}

export type Todos = Todo[];
