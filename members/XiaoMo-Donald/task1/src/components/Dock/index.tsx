import {useEffect, useState} from "react";
import {DockNavbarList} from '@/constants'
import type {IDockNavbar} from "@/types";
import {useLocation, useNavigate} from "react-router-dom";

interface IProps {
    activeNavbar?: IDockNavbar
}

const Dock = ({activeNavbar}: IProps) => {
    const [routerActive, setRouterActive] = useState<IDockNavbar>()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSetCurrentActiveRouter = () => {
        console.log('location', location)
        const findRouter = DockNavbarList.find(x => x.path === location.pathname)
        setRouterActive(findRouter)
    }

    useEffect(() => {
        if (activeNavbar) {
            setRouterActive(activeNavbar)
        } else {
            handleSetCurrentActiveRouter()
        }
    }, [activeNavbar])


    const routeTo = (item: IDockNavbar) => {
        setRouterActive(item)
        navigate(item.path)
    }
    return (
        <ul className="fixed z-10 bottom-8 left-[50%] translate-x-[-50%] flex items-center justify-center gap-x-3 border border-gray-200 rounded-full p-2 pl-4 pr-4 shadow-lg shadow-gray-200 bg-white bg-opacity-70">
            {
                DockNavbarList.map((item, index) => (
                    <li key={index}
                        className={`rounded-3xl pt-1 pb-1 pl-4 pr-4 text-center text-[14px] cursor-pointer transition-all hover:bg-blue-400 hover:text-white ${item.key === routerActive?.key ? 'bg-blue-400 text-white' : ''}`}
                        onClick={() => routeTo(item)}>
                        <div>{item.title}</div>
                        <div className="text-xs mt-[1px]">{item.desc}</div>
                    </li>
                ))
            }
        </ul>
    )
}

export default Dock
