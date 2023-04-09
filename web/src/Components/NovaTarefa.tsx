import { api } from "@/lib/axios";
import { FormEvent, useState } from "react";
import Image from "next/image";

import Close from "../assets/fechar.svg"

interface Props{
    isOpen: boolean
    onClose: () => void
    id: string | string[] | undefined
}

export default function NovaTarefa(props: Props){

    const [titulo, settitulo] = useState('');
    const [descricao,setdescricao] = useState('')  
  
    async function cadastrarNovaTarefa(event: FormEvent){
      event.preventDefault()
  
  
      try {
          await api.post("/tarefas",{
              usuario:{
                  id: props.id
              },
              titulo: titulo,
              descricao: descricao
          });
  
          alert("Tarefa crida com sucesso!")
  
          settitulo("")
          setdescricao("")

          
  
      } catch (error) {
          console.log(error)
          alert("falha ao criar Tarefa")
      }
  
    }

    return (
        <>
            {props.isOpen && (
                <div className="z-10 w-full h-full bg-gray-100 flex fixed justify-center items-center">
                    <div className="h-1/2 w-1/2 bg-gray-800 shadow-2xl rounded-2xl opacity-100">
                        <div className="w-full flex justify-end">
                            <button onClick={props.onClose}>
                                <Image className="mt-2 mr-2" height={30} src={Close} alt="" />
                            </button>
                        </div>
                        <div className="">
                            <div className=" flex justify-center items-center">
                                <h1 className="text-white font-bold text-3xl">Crie uma nova tarefa</h1>
                            </div>

                            <div className=" w-full h-full items-center mt-1" >
                                <form onSubmit={cadastrarNovaTarefa} action="paginaInicial" className="">

                                    <div className=" flex  justify-center "> 
                                        <div className=" w-3/4 h-full ">
                                            <div className="" >
                                                <label className="block text-white " htmlFor="">Titulo</label>
                                                <input 
                                                    className=" w-full p-2 mt-1" 
                                                    onChange={event => settitulo(event.target.value)}
                                                    value={titulo}
                                                    type="text"
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label className="block mb-2 text-white" htmlFor="">Descrição</label>
                                                <input 
                                                    className=" w-full flex break-before-auto items-start p-1 h-20" 
                                                    onChange={event => setdescricao(event.target.value)}
                                                    value={descricao}
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex justify-center items-center mt-3">
                                        <button
                                            className="bg-violet-500 p-2 rounded-lg text-white"
                                            type="submit"
                                            >Criar tarefa</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )

   
}
