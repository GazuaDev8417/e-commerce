import { IProductsInCart } from '../pages/home/Home'
import { useNavigate } from 'react-router-dom'
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
  
  
  const onAddProductToCart = (product:IProductsInCart):void=>{
      const body = {
        name: product.name,
        price: Math.floor(Math.random() * 1000).toFixed(2)
      }
  
      fetch(`https://e-commerce-server-rho.vercel.app/cart/${product.id}`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(()=> props.getProductsInCart())
      .catch(e=>{
        alert(e.message)
        console.log(e.message)
      })
    }


    const buy = ()=>{
      const token = localStorage.getItem('token')

      if(!token){
        const decide = window.confirm('Necessário efetuar login para fazer compras?')

        if(decide){
          navigate('/e-commerce/login')
        }
      }
    }


      


    return(
        <CardContainer className='border border-3 rounded'> 
          <img src={product.photo} alt="Imagem do produto"/>
          <CardInfo>
            <p>{product.name}</p>
            <p>R$ {Math.floor(Math.random() * 1000)},00</p>
            <ButtonContainer>
              <ProductButton className='btn btn-dark'
                onClick={buy}>
                Comprar
              </ProductButton>
              <ProductButton className='btn btn-dark'
                onClick={() => onAddProductToCart(product)}>
                Adicionar ao carrinho
              </ProductButton>
            </ButtonContainer>
          </CardInfo>
      </CardContainer>
    )
}

export default ProductCard