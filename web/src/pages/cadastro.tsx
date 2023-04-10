import Image from "next/image"


import Logo from "../assets/Logo.svg"
import { FormEvent, useState } from "react"
import { api } from "@/lib/axios";
import {useRouter} from "next/router";
import Alert from "@/Components/Alert";

export default function cadastro() {
  
  const [nome, setnome] = useState('');
  const [email,setEmail] = useState('')
  const [senha, setsenha] = useState('');

  const [submit,setSubmit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);  


  const [alertTitulo,setAlertTitulo] = useState('');
  const [alertDes,setAlertDes] = useState('');
  const [colorF,setColorF] = useState('');
  const [colorB,setcolorB] = useState('');



  
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
          setEmail("")
          setnome("")
          setsenha("")

        setAlertTitulo("Sucesso!")
        setAlertDes("Usuario cadastrado com sucesso!")
        setColorF("bg-green-100")
        setcolorB("border-green-200")
        setOpenAlert(true)


          router.push("/")

        }

        

    } catch (error) {
        console.log(error)
        setAlertTitulo("Cadastro não realizado")
        setAlertDes("Houve um erro ao cadastrar o usuário. Por favor, tente novamente")
        setColorF("bg-red-100")
        setcolorB("border-red-300")
       setOpenAlert(true)
  
    }

  }
  
  return (
    <div>
      <div className="flex justify-end animate__animated.animate__slideOutUp">
        <Alert titulo={alertTitulo} msg={alertDes} colorB={colorB} colorF={colorF} isOpen={openAlert} onClose={()=> setOpenAlert(false)}/>
      </div>
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