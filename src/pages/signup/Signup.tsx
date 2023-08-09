import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { MdArrowBackIosNew } from 'react-icons/md'
import { Top, Container } from './styled'


interface User{
    name:string
    phone:string
    email:string
    password:string
    confirmPass:string
}

const Signup = ()=>{
    const navigate = useNavigate()
    const [form, setForm] = useState<User>({
        name:'',
        phone:'',
        email:'',
        password:'',
        confirmPass:''
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/e-commerce')
        }
    }, [])


    const onChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({...form, [name]:value})
    }


    const registUser = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password,
            confirmPass: form.confirmPass
        }

        axios.post('https://e-commerce-server-rho.vercel.app/client', body).then(res=>{
            localStorage.setItem('token', res.data)
            navigate('/e-commerce')
            limpar()
        }).catch(e=>{
            alert(e.response.data)
        })
    } 


    const limpar = ()=>{
        setForm({
            name:'',
            email:'',
            phone:'',
            password:'',
            confirmPass:''
        })
    }


    
    return(
        <>
        <Top>
            <MdArrowBackIosNew className='icon' onClick={()=> navigate(-1)}/>
            <h1>E-Commerce</h1>
            <div/>
        </Top>
        <Container>
            <form onSubmit={registUser}>
                <fieldset>
                    <legend>Novo usuário</legend>
                    <input type="text" className="form-control" 
                        name="name" value={form.name} onChange={onChange}
                        placeholder="Seu nome" required/>
                    <input type="tel" className="form-control" 
                        name="phone" value={form.phone} onChange={onChange}
                        placeholder="Telefone(apenas números)" required/>
                    <input type="email" className="form-control" 
                        name="email" value={form.email} onChange={onChange}
                        placeholder="nome@email.com" required/>
                    <input type="password" className="form-control" 
                        name="password" value={form.password} onChange={onChange}
                        placeholder="Sua senha" required/>
                    <input type="password" className="form-control" 
                        name="confirmPass" value={form.confirmPass} onChange={onChange}
                        placeholder="Confirme ua senha" required/>
                    <div className="btn-container">
                        <input type="reset" value="Limpar" className="btn btn-secondary"
                            onClick={limpar}/>
                        <button className="btn btn-secondary">Entrar</button>
                    </div>
                </fieldset>
            </form>
        </Container>
        </>
    )
}

export default Signup

