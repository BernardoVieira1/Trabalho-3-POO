import Image from "next/image"

import Logo from "../assets/Logo.svg"
import { FormEvent, useState } from "react"
import { api } from "@/lib/axios";
import { useRouter } from "next/router";



export default function Home() {
  
  const [email, setEmail] = useState('');
  const [senha, setsenha] = useState('');
  const [submit,setSubmit] = useState(false);

  const [auth,setAuth]= useState(null);

  const router = useRouter();


  async function login(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post("/usuario/login",{
        email: email, 
        senha: senha
      })

        if(response.status === 200){

          router.push(`/paginaInicial?auth=${encodeURIComponent(JSON.stringify(response.data.id))}`)

          setEmail("")
          setsenha("")

        }

       setAuth(response.data.id)

    } catch (error) {
      console.log(error)
      alert("falha ao Logar")
    }

  }
  
  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <Image className="" src={Logo} alt="LogoDoPrograma" />
        <main className="mt-8 justify-center flex bg-gray-500 py-6 shadow-2xl rounded-lg">
          <form onSubmit={login}  className="" action="">
            <div>
              <label className="text-white text-base" htmlFor="">Email</label>
              <input 
              className="block mt-1 rounded shadow-xl flex-1 px-6 py-3" 
              onChange={event => setEmail(event.target.value)}
              value={email}
              type="email" />
            </div>
            <div className="mt-4">
              <label className="text-white" htmlFor="">Senha</label>
              <input 
              className="block mt-1 rounded shadow-xl px-6 py-3" 
              onChange={event => setsenha(event.target.value)}
              value={senha}
              type="password"/>
            </div>
            <p className="text-white" >Não tem conta?<a href="/cadastro" className="text-violet-400">cadastre-se</a></p>
            <button 
              className="flex-1 mt bg-violet-500 p-2 text-white font-bold rounded-xl"
              
              
              >Entrar</button>


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