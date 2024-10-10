import './index.css'

interface HeaderProps {
    title: string
}
export default function Header({ title }: HeaderProps) {
    return <h1>{title}</h1>
}