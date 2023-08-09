import { FunctionComponent, useState, useRef } from "react"
import { BsPersonCircle } from 'react-icons/bs'
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

    img{
        width: 50px;
        cursor: pointer;
        border-radius: 50%;
        border: 1px solid;
    }
`


const Header:FunctionComponent = ()=>{
    const inputFile = useRef<HTMLInputElement>(null)
    const [profileImage, setProfileImage] = useState<undefined | string>()



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
            {profileImage ? (
                <img src={profileImage} alt="Profile Image"
                    onClick={()=> inputFile.current?.click()}/>
            ) : <BsPersonCircle className='icon'
                    onClick={()=> inputFile.current?.click()}/>}
        </Container>
    )
}

export default Header