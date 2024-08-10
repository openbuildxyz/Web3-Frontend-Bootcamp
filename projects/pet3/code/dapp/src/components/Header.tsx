import { ConnectKitButton } from 'connectkit'

export default function Header() {
  return (
    <header className='flex justify-end p-2'>
      <ConnectKitButton
        mode='dark'
        theme='retro'
        showAvatar={false}
      ></ConnectKitButton>
    </header>
  )
}
