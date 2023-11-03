const cart = JSON.parse(localStorage.getItem('cart'))


cart.map(item=>{
    document.getElementById('cartItems').innerHTML +=`
        <div class='item-container'>
            <img src=${item.product} alt='Imagem do produto' class='cart-image'>
            <div class='product-price'>
                <span>${item.price}</span>
                <button>Remover</button>
            </div>
        </div>
    `
})