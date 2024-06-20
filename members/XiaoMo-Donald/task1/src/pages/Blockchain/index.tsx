import Header from "@/components/Header";
import {useEffect} from "react";
import {GlobalAppMetadata} from "@/constants";

const Blockchain = () => {

    useEffect(() => {
        document.title = `Task2：Blockchain basic QA 丨  ${GlobalAppMetadata.title} - ${GlobalAppMetadata.subtitle}`;
    }, [])

    return (
        <>
            <Header title="Task2：Blockchain Basic QA"></Header>
            <div className="w-full h-[600px] flex flex-col items-center justify-center text-green-500">
                this is Blockchain Basic QA page,it's todo...
            </div>
        </>
    )
}


export default Blockchain;
