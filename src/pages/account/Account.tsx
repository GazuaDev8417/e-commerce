import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { url } from "../../constants/url"
import Header from "../../components/Header"
import { MdArrowBackIosNew } from 'react-icons/md'
import { IProductsInCart } from "../../interfaces/interfaces"
import { Container, Line } from './styled'




interface Client{
    id:string
    name:string
    phone:string
    email:string
    password:string
    credits:number
}

const Account = ()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [cart, setCart] = useState<IProductsInCart[]>([])
    const [client, setClient] = useState<Client>({
        id:'',
        name:'',
        phone:'',
        email:'',
        password:'',
        credits:0
    })




    useEffect(()=>{
        if(!token){
            navigate('/e-commerce')
        }

        getClient()
        getProductsInCart()
    }, [])


    const getClient = ()=>{
        axios.get(`${url}/client`, {
            headers: { Authorization: token }
        }).then(res=>{
            setClient(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const getProductsInCart = ()=>{
        axios.get(`${url}/cart/`, {
            headers: { Authorization: token }
        }).then(res=>{
            setCart(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const removeItem = (item:IProductsInCart)=>{
        axios.delete(`${url}/cart/${item.id}`, {
            headers: { Authorization: token }
        })
            .then(()=> getProductsInCart()).catch(e=>{
                alert(e.response.data)
            })
    }


    const buyProduct = (item:IProductsInCart)=>{
        const body = {
            value: item.price
        }

        axios.post(`${url}/product`, body, {
            headers: { Authorization: token }
        })
            .then(res=>{
                alert(res.data)
                removeItem(item)
                getClient()
            }).catch(e=>{
                alert(e.response.data)
            })
    }


    const getTotal = ()=>{
        if(cart.length > 0){
            const result = cart.reduce((accumulator, value)=> accumulator + (value.price * value.quantity), 0)

            return result
        }
    }



    return(
        <>
        <Header leftIcon={<MdArrowBackIosNew className='icon'
            onClick={()=> navigate(-1)}/>}/>
        <Line/>
        <Container>
            <div className="content">
                <h4 style={{textAlign:'center'}}>{client.name}</h4>
                <b>Email: </b>{client.email}<br/>
                <b>Creditos: </b>{client.credits}
            </div>
            <h4 style={{marginLeft:20}}>Seu carrinho:</h4>
            <div className="total">
                Total R$ {getTotal()?.toFixed(2)}
            </div>
            <div className="cart">
                {cart && cart.map(item=>{
                    return(
                        <div className="card" key={item.id}>
                            {item.name}<br/>
                            Valor: R${item.price.toFixed(2)}<br/>
                            Quantidade: {item.quantity}<br/>
                            Total: R${(item.price * item.quantity).toFixed(2)}<br/>
                            <div className="btn-container">
                                <button className="btn btn-secondary"
                                    onClick={()=> buyProduct(item)}>Comprar</button>
                                <button className="btn btn-secondary"
                                    onClick={()=> removeItem(item)}>Remover</button>
                            </div>
                        </div>
                    )
                })}
            </div>            
        </Container>   
        </> 
    )
}

export default Account