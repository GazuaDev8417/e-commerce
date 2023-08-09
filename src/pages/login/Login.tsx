import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import { MdArrowBackIosNew } from 'react-icons/md'
import { Top, Container, Bottom } from './styled.tsx'


interface User{
    email:string
    password:string
}

const Login = ()=>{
    const navigate = useNavigate()
    const [form, setForm] = useState<User>({
        email:'visitante@email.com',
        password:'123456'
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


    const signin = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            email: form.email,
            password: form.password
        }

        axios.post('https://e-commerce-server-rho.vercel.app/login', body).then(res=>{
            localStorage.setItem('token', res.data)
            limpar()
            navigate('/e-commerce')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const limpar = ()=>{
        setForm({
            email:'',
            password:''
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
            <form onSubmit={signin}>
                <fieldset>
                    <legend>Login</legend>
                    <input type="email" className="form-control" 
                        name="email" value={form.email} onChange={onChange}
                        placeholder="nome@email.com" required/>
                    <input type="password" className="form-control" 
                        name="password" value={form.password} onChange={onChange}
                        placeholder="Sua senha" required/>
                    <div className="btn-container">
                        <input type="reset" value="Limpar" className="btn btn-secondary"
                            onClick={limpar}/>
                        <button className="btn btn-secondary">Entrar</button>
                    </div>
                </fieldset>
            </form>
        </Container>
        <Bottom>Se não tiver cadastro clique&nbsp;<Link to='/e-commerce/signup'>aqui</Link></Bottom>
        </>
    )
}

export default Login

