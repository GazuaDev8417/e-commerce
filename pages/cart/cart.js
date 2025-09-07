const radioButtons = Array.from(document.querySelectorAll("input[type='radio']"))
const totalContainer = document.getElementById('totalContainer')
const buy = document.getElementById('buyBtn')
const qrCodeContainer = document.getElementById('qr-code-container')
const paymentContainer = document.getElementById('payment')
const cartItems = document.querySelector('#cartItems')
const BASE_URL = 'https://max-menu-server.vercel.app'
const storagedCart = localStorage.getItem('cart')
const cart = storagedCart === '' || storagedCart === null || storagedCart === undefined || storagedCart === '[]' ? '' : JSON.parse(storagedCart)




const removeItemFromCart = (item)=>{
    const decide = window.confirm('Tem certeza que deseja remover o produto do carrinho?')

    if(!decide){
        return
    }

    const cartIndex = cart.findIndex(cartItem => cartItem.id === item.id)
    if(cartIndex !== -1){
        cart.splice(cartIndex, 1)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    location.reload()
}

cart !== '' ? cart.map(item=>{
    cartItems.innerHTML +=`
        <div class='item-container'>
            <img src=${item.product} alt='Imagem do produto' class='cart-image'>
            <div class='product-price'>
                <span>R$ ${item.price}</span>
                <button onclick='removeItemFromCart(${JSON.stringify(item)})'>Remover</button>
            </div>
        </div>
    `
}) : cartItems.innerHTML = '<p>Seu carrinho está vazio</p>'  

/* MÉTODOS PARA COMPOSIÇÃO DO PAGAMENTO COM PIX */
const getRequestItems = ()=>{
    const requestItems = []
    cart.forEach(item=>{
        requestItems.push({
            title: 'Produto Abelhakaah',
            quantity: 1,
            unit_price: Number(item.price)
        })
    })
    return requestItems
}


const copiarTexto = ()=>{
    const copyArea = qrCodeContainer.querySelector('.copy-paste')
    const textToCopy = copyArea.textContent

    navigator.clipboard.writeText(textToCopy)
    .then(() => window.alert('Copiado para área de transferência'))
    .catch(e =>{
        console.error('Erro ao copiar código: ', e)
        window.alert('Erro ao copiar código. Tente novamente.')
    })
}
/* ============================================== */

const total = cart !== '' && cart.reduce((acc, product)=>{
    let accumulator = acc + Number(product.price)
    
    return accumulator 
}, 0)

totalContainer.innerHTML = `Total: R$ ${total ? total.toFixed(2) : '0.00'}`


/* INTEGRAÇÃO MERADO PAGO */
const mp = new MercadoPago('TEST-39d56206-34f1-40ff-93b5-f5be9b5c7a80', {
    locale: 'pt-BR'
});
/* CARTÃO */
const cardModal = document.getElementById('modal-card')
const cardContent = document.querySelector('.modal-content')
const cardBtn = document.getElementById('card')

//const amount = (cartTotal !== null && cartTotal !== undefined && cartTotal !== '')
cardForm = mp.cardForm({
        amount: String(total),
        iframe: true,
        form: {
            id: "form-checkout",
            cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número do cartão" },
            expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/YY" },
            securityCode: { id: "form-checkout__securityCode", placeholder: "CVC" },
            cardholderName: { id: "form-checkout__cardholderName", placeholder: "Nome e sobrenome" },
            cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "E-mail" },
            installments: { id: "form-checkout__installments", placeholder: "Parcelas" },
            issuer: { id: "form-checkout__issuer", placeholder: "Banco emissor" },
        },
        callbacks: {
            onReady: () => console.log('Formulário carregado.'),
            onFormMounted: (error) => error && console.warn('Form Mounted failed: ', error),
            onError: (error) => console.error('Erro no cardForm:', error),
            onSubmit: (event) => {
                event.preventDefault();
                console.log('Submit detectado')

                cardForm.submit({
                    onSuccess: async (cardData) => {
                      console.log('Dados do cartão: ', cardData)
                        const {
                            token,
                            payment_method_id: paymentMethodId,
                            installments,
                            email
                        } = cardData;

                        try {
                            const res = await fetch(`${BASE_URL}/pay`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    token,
                                    paymentMethodId,
                                    email,
                                    installments: Number(installments)
                                })
                            });

                            const data = await res.json();
                            console.log('Pagamento processado:', data);

                            const orderId = data.orderId;
                            const interval = setInterval(async () => {
                                const statusRes = await fetch(`${BASE_URL}/payments/status/${orderId}`);
                                const statusData = await statusRes.json();
                                if (statusData.status === 'approved') {
                                    clearInterval(interval);
                                    alert('Pagamento com cartão aprovado! 🎉');
                                }
                            }, 5000);

                        } catch (e) {
                            console.error('Erro ao processar pagamento:', e);
                            alert('Erro ao processar pagamento.');
                        }
                    },
                    onError: (error) => {
                        console.error('Erro no submit do cardForm:', error);
                        console.log('Detalhes do erro:', JSON.stringify(error, null, 2));
                        alert('Erro ao criar token do cartão.');
                    }
                });
            }
        }
})

cardBtn.addEventListener('click', ()=>{
    if(cart.length === 0){
        window.alert('Seu carrinho ainda está vazio. Sinta-se a vontade para escolher um produto')
        window.location.href = '../products/index.html'
        return
    }

    cardModal.style.display = 'block'
    qrCodeContainer.innerHTML = ''
    setTimeout(() => cardContent.classList.add('active'), 100)
})

cardContent.addEventListener('click', (e) => e.stopPropagation())

window.addEventListener('click', (e)=>{
  if(e.target === cardModal){
    cardContent.classList.remove('active')
    setTimeout(() => cardModal.style.display = 'none', 100)
  }
})

document.querySelector('.close').addEventListener('click', ()=>{
    cardContent.classList.remove('active')
    setTimeout(() => cardModal.style.display = 'none', 100)
})

/* ====================== PIX =========================== */
document.getElementById('qr-close-button').addEventListener('click', ()=>{
    document.getElementById('pix-container').style.display = 'none'
})

document.getElementById('pix').addEventListener('click', async () => { 
    if(cart.length === 0){
        window.alert('Seu carrinho ainda está vazio. Sinta-se a vontade para escolher um produto')
        window.location.href = '../products/index.html'
        return
    }

    document.getElementById('pix-container').style.display = 'block'
    try {
        const res = await fetch(`${BASE_URL}/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodId: 'pix',
                email: 'visitante@email.com',
                items: getRequestItems(),
                total: total
            })
        })

        if(!res.ok){
            const error = await res.text()
            throw new Error(error)
        }

        const data = await res.json()
        qrCodeContainer.innerHTML = ''
        
        if (data.qr_code_base64) {
            qrCodeContainer.innerHTML += `
                <p>Escaneie o QR Code para pagar:</p>
                <img src="data:image/jpeg;base64,${data.qr_code_base64}" alt="QR Code Pix">
            `        
        }

        if(data.qr_code){
            qrCodeContainer.innerHTML += `
            <p>Ou use o Pix Copia e Cola:</p><br>
                <p class='copy-paste'>${data.qr_code}</p>
            <button onclick="copiarTexto()">Copiar</button>
            `       
        }

        if(data.qr_code_link){
            qrCodeContainer.innerHTML += `
            <p>
                <a href="${data.qr_code_link}" target="_blank">Clique aqui para ver o ticket de pagamento</a>
            </p>
            `        
        }

        // Lógica de polling (igual à sua)
        /* const orderId = data.orderId;
        const interval = setInterval(async () => {
            const statusRes = await fetch(`${BASE_URL}/payments/status/${orderId}`);
            const statusData = await statusRes.json();
            if (statusData.status === 'approved') {
                clearInterval(interval);
                alert('Pagamento com Pix aprovado! 🎉');
            }
        }, 5000); */

    } catch (e) {
        console.error('Erro ao processar pagamento Pix:', e);
        alert('Erro ao processar pagamento Pix.');
    }
})
/* FIM DA INTEGRAÇÃO */


