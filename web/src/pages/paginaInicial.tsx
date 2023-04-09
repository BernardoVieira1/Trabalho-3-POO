import { api } from "@/lib/axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { Task } from "@/Components/Task"

import Image from "next/image"
import IconPlus from "../assets/IconPlus.svg"
import NovaTarefa from "@/Components/NovaTarefa"

interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
  }

interface Props {
    tarefasList: Tarefa[];
}

export default function homepage(props:Props){
    
  const router = useRouter();
  let { auth } = router.query
    
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [openModal, setOpenModal] = useState(false);  

    
  useEffect(()=> {
    if(auth){
      api.get(`/tarefas/user/${auth}`).then((res) =>{
        setTarefas(res.data)
      })

      .catch((err)=>{
       console.log(err)
       alert("erro ao encontrar lista de tarefas")
      })
    }

  },[auth])

 //9999999999999999999999999999999999999999999999999999999999999999999999999999999






 //9999999999999999999999999999999999999999999999999999999999999999999999999999999

  return (
    <div>
      <div className="" >
        <NovaTarefa isOpen={openModal} onClose={()=> setOpenModal(false)}  id={auth} />
      </div>

      <div className=" h-10 w-screen flex justify-center" >
        <div className=" w-2/4" >
          <div className=" flex justify-end  "> 
            <button onClick={()=> setOpenModal(true)} className="bg-violet-500 hover:bg-violet-600 shadow-xl hover:shadow-violet-600/50 text-white font-bold rounded-xl p-2 px-4 mt-4 mb-3 flex items-center" >
              <Image className="" src={IconPlus} alt="imagem de mais referenciano a adição de uma tarefa" />
              <span className="ml-2">Nova Tarefa </span>
            </button>
          </div>

          <div className=" h-10 w-full  ">
            {tarefas.map((tarefa, index) => (
              <div className="" key={index}>
                <Task titulo={tarefa.titulo} descricao={tarefa.descricao} id={tarefa.id} status={tarefa.status}/>
              </div>
            ))}
          </div>
        </div>
      </div>      
    </div>

  )
}

