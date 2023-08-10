import { FunctionComponent, useEffect } from 'react'
import axios from 'axios'
import { IProductsInCart } from '../pages/home/Home'
import styled from 'styled-components'



const CartListContainer = styled.div`
  display: grid;
  gap: 8px;  
`
const ItemContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;

  p {
    margin: 0;
  }
`


interface CartProps{
  getProductsInCart: ()=> void
  productsInCart:IProductsInCart[]
}



const Cart:FunctionComponent<CartProps> = (props)=>{


    useEffect(()=>{
      const token = localStorage.getItem('token')

      token ? props.getProductsInCart() : null
    }, [])


    const getTotalValue = () => {
        let totalValue = 0
    
        for(let product of props.productsInCart) {
          totalValue += product.price * product.quantity
        }
    
        return totalValue
    }


    const onRemoveProductFromCart = (product:IProductsInCart)=>{
      axios.delete(`https://e-commerce-server-rho.vercel.app/cart/${product.id}`)
        .then(()=> props.getProductsInCart()).catch(e=>{
          alert(e.response.data)
        })
    }


    return(
        <div className='border border-2 shadow-lg rounded p-2'>
            <h3>Carrinho:</h3>
            <CartListContainer>
            {props.productsInCart.map((product) => {
                return(
                    <ItemContainer>
                        <p>{product.quantity}x {product.name}</p>
                        <button className='btn btn-dark'
                            onClick={() => onRemoveProductFromCart(product)}>
                            Remover
                        </button>
                    </ItemContainer>
                )
            })}
            </CartListContainer>
            <p>Valor total: R${getTotalValue()},00</p>
        </div>
    )
}

export default Cart