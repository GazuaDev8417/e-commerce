import { IProductsInCart, IProducts } from '../interfaces/interfaces' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../constants/url'
import styled from 'styled-components'


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media(max-width: 700px){
    img {
      height: 200px;
    }
  }
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  p {
    margin: 4px 0;
  }
`
const ButtonContainer = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const ProductButton = styled.button`
  align-self: center;
  margin-top: 4px;
`



const ProductCard = (props:any)=>{
  const navigate = useNavigate()
  const product = props.product  
  const token = localStorage.getItem('token')
  
  
  const onAddProductToCart = (product:IProductsInCart):void=>{
      if(!token){
        const decide = window.confirm('Necessário efetuar login para fazer compras?')

        if(decide){
          navigate('/e-commerce/login')
        }
      }else{
        const body = {
          name: product.name,
          price: product.price,
          clientId: token
        }
        
        axios.post(`${url}/cart/${product.id}`, body, {
          headers: { Authorization: token }
        })
          .then(()=> props.getProductsInCart()).catch(e=>{
            alert(e.response.data)
          })        
      }
    }


    const buy = (product:IProducts)=>{
      if(!token){
        const decide = window.confirm('Necessário efetuar login para fazer compras?')

        if(decide){
          navigate('/e-commerce/login')
        }
      }else{
        const body = {
          value: product.price
        }

        axios.post(`${url}/product`, body, {
          headers: { Authorization: token }
        }).then(res=>{
          alert(res.data)
        }).catch(e=>{
          alert(e.response.data)
        })
      }
    }


      


    return(
        <CardContainer className='border border-3 rounded'> 
          <img src={product.photo} alt="Imagem do produto"/>
          <CardInfo>
            <p>{product.name}</p>
            <p>R$ {product.price.toFixed(2)}</p>
            <ButtonContainer>
              <ProductButton className='btn btn-dark'
                onClick={()=> buy(product)}>
                Comprar
              </ProductButton>
              <ProductButton className='btn btn-dark'
                onClick={() => onAddProductToCart(product)}>
                Carrinho
              </ProductButton>
            </ButtonContainer>
          </CardInfo>
      </CardContainer>
    )
}

export default ProductCard