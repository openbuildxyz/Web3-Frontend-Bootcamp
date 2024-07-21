import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <header className="flex justify-between px-2 sm:px-4">
        <div className="flex items-center gap-x-4 flex-1">
          <Link to="/">
            <img src="/textLogo.png" className="h-12 hidden sm:block" />
          </Link>
          <nav className="flex-1 pt-[6px]">
            <ul className="flex items-center w-full justify-between sm:justify-end gap-x-4 pr-4 sm:pr-10 sm:gap-x-10">
              <li>
                <Link to="/" className="hover:text-primaryColor duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/mint"
                  className="hover:text-primaryColor duration-200"
                >
                  Mint
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-primaryColor duration-200"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <ConnectButton showBalance={false} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
