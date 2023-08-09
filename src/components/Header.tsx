import { FunctionComponent, useState, useRef } from "react"
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;

    .icon{
        font-size: 30pt;
        cursor: pointer;
    }

    .menu{
        position: absolute;
        top: 2vh;
        right: -10vw;
    }

    ul{
        list-style: none;
        background-image: linear-gradient(lightgray, gray);
        width: 10vw;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
    }

    ul .icon{
        margin-bottom: 15px;
    }

    ul .close{
        position: relative;
        top: -4vh;
        left: 2.5vw;
        font-size: 15pt;
        cursor: pointer;
    }

    li{
        cursor: pointer;
        margin: 5px;
        text-align: left;
    }

    li:hover{
        background-color: lightgray;
        border-radius: 5px;
        padding-left: 5px;
    }

    img{
        width: 50px;
        cursor: pointer;
        border-radius: 50%;
        border: 1px solid;
    }
`


const Header:FunctionComponent = ()=>{
    const inputFile = useRef<HTMLInputElement>(null)
    const menu = useRef<HTMLDivElement>(null)
    const [mode, setMode] = useState<Boolean>(false)
    const [profileImage, setProfileImage] = useState<undefined | string>()



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
                    <img src={profileImage} alt="Profile Image"/>
                ) : <BsPersonCircle className='icon'
                        onClick={showMenu}/>}
                <div className="menu" ref={menu}>
                    <ul>
                        {/* <div className="topMenu"> */}
                            <BsPersonCircle className='icon'/>
                            <IoIosClose className='close' onClick={showMenu}/>
                        {/* </div> */}
                        <li>Usuário</li>
                        <li>Conta</li>
                        <li>Login</li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default Header