import { useState } from "react"
import axios from 'axios'
import Header from "../../components/Header"
import Filters from "../../components/Filters"
import Products from "../../components/Products"
import Cart from "../../components/Cart"
import styled from 'styled-components'
import { IProductsInCart } from "../../interfaces/interfaces"



const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 16px;
  gap: 8px;
  @media(max-width: 700px){
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`



function Home() {  
  const [productsInCart, setProductsInCart] = useState<IProductsInCart[]>([])
  const [minFilter, setMinFilter] = useState<number>(0)
  const [maxFilter, setMaxFilter] = useState<number>(0)
  const [nameFilter, setNameFilter] = useState<string>('Produto')



  const handleMinFilter = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setMinFilter(Number(e.target.value))
  }
  
  const handleMaxFilter = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setMaxFilter(Number(e.target.value))
  }

  const handleNameFilter = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setNameFilter(e.target.value)
  }

  
  const getProductsInCart = ()=>{
    const token = localStorage.getItem('token')
    
    axios.get(`https://e-commerce-server-rho.vercel.app/cart/`, {
      headers: { Authorization: token }
    })
      .then(res=>{
        setProductsInCart(res.data)
      }).catch(e=>{
        alert(e.response.data)
      })
  }


  return (
    <>
    <Header leftIcon={<div/>}/>
    <AppContainer>
      <Filters
        minFilter={minFilter}
        maxFilter={maxFilter}
        nameFilter={nameFilter}
        handleMinFilter={handleMinFilter}            
        handleMaxFilter={handleMaxFilter}            
        handleNameFilter={handleNameFilter}/>
      <Products 
        minFilter={minFilter}
        maxFilter={maxFilter}
        nameFilter={nameFilter}
        getProductsInCart={getProductsInCart}/>
      <Cart
        getProductsInCart={getProductsInCart}
        productsInCart={productsInCart}/>
    </AppContainer>
    </>
  )
}

export default Home
