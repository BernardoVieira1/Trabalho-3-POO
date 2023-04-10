// import { api } from "@/lib/axios";
// import { FormEvent, useState } from "react";

// interface Props{

// }

// export function CriarTarefas(props: Props){
    
//     const [titulo, settitulo] = useState('');
//     const [descricao,setdescricao] = useState('')  
  
//     async function cadastrarNovaTarefa(event: FormEvent){
//       event.preventDefault()
  
  
//       try {
//           await api.post("/tarefas",{
//               usuario:{
//                   id: 5
//               },
//               titulo: titulo,
//               descricao: descricao
//           });
  
//           alert("Tarefa crida com sucesso!")
  
//           settitulo("")
//           setdescricao("")

          
  
//       } catch (error) {
//           console.log(error)
//           alert("falha ao criar Tarefa")
//       }
  
//     }
    
//     return (
//       <div className="flex h-screen justify-center items-center">
//         <div>
//           <main className="mt-8 justify-center flex bg-gray-500 py-6 shadow-2xl rounded-lg">
//             <form  onSubmit={cadastrarNovaTarefa} action="paginaInicial" className="">
//                 <h1 className="font-bold text-white text-2xl">Crie uma nova tarefa</h1>
//               <div>
//                 <label className="text-white text-base" htmlFor="">Titulo</label>
//                 <input 
//                 className="block mt-1 rounded shadow-xl flex-1 px-6 py-3" 
//                 onChange={event => settitulo(event.target.value)}
//                 value={titulo}
//                 type="text" />
//               </div>
//               <div className="mt-4">
//                 <label className="text-white" htmlFor="">Descrição</label>
//                 <input 
//                 className="block mt-1 rounded shadow-xl px-6 py-6" 
//                 onChange={event => setdescricao(event.target.value)}
//                 value={descricao}
//                 type="text"/>
//               </div>
        
//               <button 
//                 className="flex-1 mt-2 bg-violet-500 p-2 text-white font-bold rounded-xl"
//                 type="submit"
//                 >Cadastrar</button>
//             </form>
//           </main>
//         </div>
         
//       </div>
  
//     )
//   }