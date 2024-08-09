import type { ReactNode } from 'React'
export default function Header({ children }: { children?: ReactNode }) {
  return (
    <div className="text-3xl font-bold text-gray-900">{children || '标题'}</div>
  )
}
