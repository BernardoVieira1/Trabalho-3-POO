import Image from "next/image"


import Logo from "../assets/Logo.svg"
import { FormEvent, useState } from "react"
import { api } from "@/lib/axios";
import {useRouter} from "next/router";

export default function cadastro() {
  
  const [nome, setnome] = useState('');
  const [email,setEmail] = useState('')
  const [senha, setsenha] = useState('');

  const [submit,setSubmit] = useState(false);
  
  const router = useRouter();

  async function cadastrar(event: FormEvent){
    event.preventDefault()


    try {
        const response = await api.post("/usuario",{
            nome: nome,
            email: email,
            senha: senha
        });

        
        if(response.status === 200 ){
           
          alert("Usuario crido com sucesso!")
          setEmail("")
          setnome("")
          setsenha("")

          router.push("/")

        }

        

    } catch (error) {
        console.log(error)
        alert("falha ao criar usuario")
    }

  }
  
  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <Image className="" src={Logo} alt="LogoDoPrograma" />
        <main className="mt-8 justify-center flex bg-gray-500 py-6 shadow-2xl rounded-lg">
          <form  onSubmit={cadastrar} className="">
            <div>
              <label className="text-white text-base" htmlFor="">Nome</label>
              <input 
              className="block mt-1 rounded shadow-xl flex-1 px-6 py-3" 
              onChange={event => setnome(event.target.value)}
              value={nome}
              type="text" />
            </div>
            <div className="mt-4">
              <label className="text-white" htmlFor="">Email</label>
              <input 
              className="block mt-1 rounded shadow-xl px-6 py-3" 
              onChange={event => setEmail(event.target.value)}
              value={email}
              type="email"/>
            </div>
            <div className="mt-4">
              <label className="text-white" htmlFor="">Senha</label>
              <input 
              className="block mt-1 rounded shadow-xl px-6 py-3" 
              onChange={event => setsenha(event.target.value)}
              value={senha}
              type="password"/>
            </div>
            

            <button 
              className="flex-1 mt bg-violet-500 p-2 text-white font-bold rounded-xl"
              type="submit"
              >Cadastrar</button>
          </form>
        </main>
      </div>
       
    </div>

  )
}

// export const getServerSideProps = async () => {
//   const [] = await Promise.all([

//   ])

//   return {
//     props:{

//     }
//   }

  
// }