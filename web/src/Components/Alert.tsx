
import Image from "next/image"
import Close from "../assets/fechar.svg"

interface Props{
    isOpen: boolean
    onClose: () => void
    titulo: string
    msg: string
    colorB: string
    colorF: string
}

export default function Alert(props: Props){



    return (
        <>
            {props.isOpen && (
               
                <div className={`z-20 w-[25%] mt-2 mr-2 flex justify-end fixed ${props.colorB} ${props.colorF} border-4 rounded-lg`}>
                    <div className="h-full w-full justify-between flex" >
                        <div className="">
                            <div className="mt-2 ml-2">
                                <p className="text-xl font-bold block">{props.titulo}</p>
                            </div>
                            <div className="ml-2 mt-2 text-lg">
                                <p>{props.msg}</p>
                            </div>
                        </div>
                        <div>
                            <button className="mt-2 mr-2">
                                <Image height={30} src={Close} onClick={props.onClose}  alt=""/>
                            </button>
                        </div>
                        
                    </div>
               
                </div>
            )}
        </>
    )

   
}
