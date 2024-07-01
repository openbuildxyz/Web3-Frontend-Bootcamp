

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'
import { routeList, routeItemType } from '@/config/route';


export default function Header() {
  return (
    <div className="lg:flex flex-1 p-8 lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1 lg:flex ">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          <Link href="/">Market</Link >
        </h2>

        <ul className="lg:flex flex-1 lg:items-center pl-12">
          {
            routeList.map((item: routeItemType) => {
              return <li className="m-2 text-base mr-5" key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            })
          }

        </ul>


      </div>
      <ConnectButton showBalance={false} chainStatus="name" accountStatus="avatar" />
    </div >
  )
}