import { useEffect, useState } from 'react';
import IconLixo from '../assets/IconLixo.svg'
import Image from 'next/image';
import { api } from '@/lib/axios';


interface Props {
    id: number;
    titulo: string;
    descricao: string;
    status?: "INICIAR" | "FINALIZADO"|MyStringUnion;
  }

type MyStringUnion = string & { 
    readonly INICIAR?: never; 
    readonly FINALIZADO?: never; 

  }

export function Task(props: Props){

  const [check,setCheck] = useState(false)
  const [cor,setCor] = useState('')

//99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999

// {
// 	"usuario":{
// 		"id": 2
// 	},
// 	"titulo": "Nova tarefa de Bernardo",
// 	"descricao": "Ontem eu comi pipoca com sal",
// 	"status": "FINALIZADO"
// }


const [editando,setEditando] = useState(false)
const [editandoT,setEditandoT] = useState(false)
const [editandoD,setEditandoD] = useState(false)
const [titulo,setTitulo] = useState(props.titulo)
const [descricao,setDescricao] = useState(props.descricao)
const [verificar,setVerificar] = useState(false)


function habilidarEdicao(){
  
  editando ?  editarTitulo() : setEditando(true) 
  editandoT ?  editarTitulo() : setEditandoT(true) 
  editandoD ?  editarTitulo() : setEditandoD(true) 
  
}

function edicaoTitulo(){

  editandoT ?  editarTitulo() : setEditandoT(true) 
  
}
function edicaoDescricao(){

  editandoD ?  editarTitulo() : setEditandoD(true) 
  
}


function editarTitulo(){
  
  try {
        api.put(`/tarefas/editar/${props.id}`,{
        titulo: titulo,
        descricao: descricao,
        
        }).then((res)=>{
          if(res.status === 200){
            setEditando(false)
            setEditandoT(false)
            setEditandoD(false)

          }
        })
        
  

      } catch (error) {
        
        alert("Falha ao editar tarefa")


      }



}


//99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999




function alterarStatus(){
  try {

    api.put(`/tarefas/editar/${props.id}/status`).then((res)=>{
      switch (res.data.status) {
        case 'FINALIZADO':
          setCor('bg-green-600');
          setCheck(true);
          break;
        case 'INICIAR':
          setCor('bg-gray-500');
          setCheck(false);
          break;
        default:
          break;
      }
    })

    

  } catch (error) {
    
    console.log("erro ao alterar o valor")
  }
}


  useEffect(() => {
    let bgColor = '';
    let check = false;
    
    switch (props.status) {
      case 'FINALIZADO':
        bgColor = 'bg-green-600';
        check = true;
        break;
      case 'INICIAR':
        bgColor = 'bg-gray-500';
        check = false;
        break;
      default:
        break;
    }
  
    setCheck(check);
    setCor(bgColor)
  },[props.status,editando]);



  async function apagarTarefa(){
    try {
      const response = await api.delete(`/tarefas/${props.id}`)

      if(response.status === 204){
        alert("tarefa apagada com sucesso")
      } 

    } catch (error) {
      console.log(error)
      alert(`não foi possivel apagar a tarefa id: ${props.id}`)
    }
  }

  return(
    <div className={`${cor} flex rounded-lg justify-evenly items-center w-full shadow-2xl mb-2`}>
      <div>
        
          <input checked={check} onChange={(event)=> {setCheck(event.target.checked); alterarStatus()}} className="
          flex
          items-center
          appearance-none
          h-5
          w-5
          border-2
          rounded-3xl
          border-wite
          checked:bg-blue-600
          checked: 
          
          " type="checkbox" value="guerreiro" name="" id="" />
        

      </div>
      <div className=" w-3/5 p-5">
        <div className='' onDoubleClick={edicaoTitulo}>
          {editandoT ? (
            <input className=' w-full text-black font-bold text-2xl  '  onChange={event => setTitulo(event.target.value)} type="text" value={titulo}/>
            ):(  
            <p className='font-bold text-2xl text-white'>{titulo}</p>
          )}
        </div>
        <div className='' onDoubleClick={edicaoDescricao}>
          {editandoD ? (
            <input className='mt-2 text-black w-full'  type="text" value={descricao} onChange={event => setDescricao(event.target.value)}  />

          //  <input className='border-none bg-transparent text-white font-bold text-2xl border-b-gray-50 '  type="text" />
          ):(

            <p className=' mt-2 text-white'>{descricao}</p>
          )
          
          }
        </div>
      </div>
      <div className="  flex gap-2  ">

        <div className="bg-red-300 hover:bg-red-400 shadow-lg hover:shadow-red-400/50 flex justify-center p-1 px-3 pt-2 items-center rounded-full">
          <a href="">
            <button onClick={apagarTarefa} >
              <Image height={15} src={IconLixo} alt='' />  
            </button>
          </a>
        </div>
      </div>
    </div>
   
  )
}
