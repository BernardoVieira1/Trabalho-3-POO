import { api } from "@/lib/axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { Task } from "@/Components/Task"


import Image from "next/image"
import IconPlus from "../assets/IconPlus.svg"
import NovaTarefa from "@/Components/NovaTarefa"
import Alert from "@/Components/Alert"


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
  const [openAlert, setOpenAlert] = useState(false);  

  const [alertTitulo,setAlertTitulo] = useState('');
  const [alertDes,setAlertDes] = useState('');
  const [colorF,setColorF] = useState('');
  const [colorB,setcolorB] = useState('');


    
  useEffect(()=> {
    if(auth){
      api.get(`/tarefas/user/${auth}`).then((res) =>{
        setTarefas(res.data)
        
        // setAlertTitulo("Sucesso!")
        // setAlertDes("Tarefa cadastrada com sucesso!")
        // setOpenAlert(true)
    
      })

      .catch((err)=>{
       console.log(err)

      //  setAlertTitulo("Cadastro não realizado")
      //  setAlertDes("Houve um erro ao cadastrar o usuário. Por favor, tente novamente")
      //  setOpenAlert(true)

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
      {/* <div className="flex justify-end animate__animated.animate__slideOutUp">
        <Alert titulo={alertTitulo} msg={alertDes} colorB={colorB} colorF={colorF} isOpen={openAlert} onClose={()=> setOpenAlert(false)}/>
      </div> */}
      <div className=" h-10 w-screen flex justify-center" >
        <div className=" w-2/4" >
          <div className=" flex justify-end  "> 
            <button onClick={()=> setOpenModal(true)} className="bg-violet-500 hover:bg-violet-600 shadow-xl hover:animate-bounce hover:shadow-violet-600/50 text-white font-bold rounded-xl p-2 px-4 mt-4 mb-3 flex items-center" >
              <Image className="" src={IconPlus} alt="imagem de mais referenciano a adição de uma tarefa" />
              <span className="ml-2">Nova Tarefa </span>
            </button>
            {/* <div className="h-10 w-10 bg-green-800">
              <button onClick={()=> setOpenAlert(true)} >Alerta</button>
            </div> */}
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

