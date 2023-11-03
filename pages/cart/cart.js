const radioButtons = Array.from(document.querySelectorAll("input[type='radio']"))
const result = document.getElementById('result')
const buy = document.getElementById('buyBtn')
const storagedCart = localStorage.getItem('cart')
const cartItems = document.querySelector('#cartItems')
const cart = storagedCart === '' || storagedCart === null || storagedCart === undefined ? '' : JSON.parse(storagedCart)




const removeItemFromCart = (item)=>{
    const decide = window.confirm('Tem certeza que deseja remover o produto do carrinho?')

    if(!decide){
        return
    }

    const cartIndex = cart.findIndex(cartItem => cartItem.id === item.id)
    if(cartIndex !== -1){
        cart.splice(cartIndex, 1)
    }
    localStorage.setItem('cart', cart)
}

cart && cart.map(item=>{
    cartItems.innerHTML +=`
        <div class='item-container'>
            <img src=${item.product} alt='Imagem do produto' class='cart-image'>
            <div class='product-price'>
                <span>${item.price}</span>
                <button onclick='removeItemFromCart(${JSON.stringify(item)})'>Remover</button>
            </div>
        </div>
    `
})    

const total = cart && cart.reduce((acc, product)=>{
    let accumulator = acc + Number(product.price)
    
    return accumulator 
}, 0)

result.innerHTML = `Total: R$ ${total ? total : '0.00'}`

let paymentMethod = ''

radioButtons.map(radio=>{
    radio.addEventListener('click', ()=>{
        if(radio.checked){  
            paymentMethod = radio.value
        }
    })
})

buy.onclick = ()=>{
    if(cart !== ''){
        if(!paymentMethod){
            alert('Selecione um método de pagamento, por favor.')
        }else{
            alert(`Compra realizada pelo ${paymentMethod}`)
            localStorage.clear()
            location.reload()
        }
    }else{
        const decide = window.confirm('Seu carrinho ainda está vázio. Escolha um produto.')
        if(decide){
            location.href = '../products/index.html#styles'
        }
    }
}

