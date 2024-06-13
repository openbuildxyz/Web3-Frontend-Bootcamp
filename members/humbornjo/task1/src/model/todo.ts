
export interface Todo {
  readonly id: number
  title: string
  state: number
  description?: string
  create_time: Date
  update_time: Date
}

