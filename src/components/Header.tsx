import { FunctionComponent, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import { Container } from './headerStyle'



const Header:FunctionComponent = ()=>{
    const navigate = useNavigate()
    const inputFile = useRef<HTMLInputElement>(null)
    const menu = useRef<HTMLDivElement>(null)
    const [mode, setMode] = useState<Boolean>(false)
    const [profileImage, setProfileImage] = useState<undefined | string>()
    const token = localStorage.getItem('token')



    const showMenu = ()=>{
        if(!mode){
            if(menu.current){
                menu.current.style.right = '0.3vw'
                menu.current.style.transition = '1s'  
                setMode(true)          
            }
        }else{
            if(menu.current){
                menu.current.style.right = '-10vw'
                menu.current.style.transition = '1s'
                setMode(false) 
            }
        }
    }


    const handleProfileImage = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        const file:File | undefined = e.target.files?.[0]

        if(file){
            setProfileImage(URL.createObjectURL(file))
        }
    }


    const logout = ()=>{
        const decide = window.confirm('Tem certeza que deseja se deslogar?')

        if(decide){
            localStorage.clear()
            navigate('/e-commerce/login')
        }
    }

    

    return(
        <Container>
            <div/>
            <h1>E-Commerce</h1>
            <input style={{display:'none'}}
                ref={inputFile} 
                type="file" 
                accept="image/*" 
                onChange={handleProfileImage}/>
            <div>
                {profileImage ? (
                    <img src={profileImage} alt="Profile Image"
                        onClick={showMenu}/>
                ) : <BsPersonCircle className='icon'
                        onClick={showMenu}/>}
                <div className="menu" ref={menu}>
                    <ul>
                        <div className="topMenu">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile Image"
                                    onClick={()=> token ? inputFile.current?.click() : null}/>
                            ) : <BsPersonCircle className='icon'
                                    onClick={()=> token ? inputFile.current?.click() : null}/>}
                            <IoIosClose className='close' 
                                onClick={showMenu}/>
                        </div>
                        <li>Usuário</li>
                        <li>Conta</li>
                        <li onClick={()=> !token ? navigate('/e-commerce/login') : logout()}>
                            {token ? 'Logout' : 'Login'}
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default Header