const gallery = Array.from(document.querySelectorAll('.image-gallery'))
const darkbox = document.getElementById("darkbox")
const darkboxImage = document.getElementById("darkbox-image")
const productPrice = document.getElementById('product-price')
const closeButton = document.getElementById("close-button")
const prevButton = document.getElementById("prev-button")
const nextButton = document.getElementById("next-button")
const buyBtn = document.getElementById('buyBtn')
const cartIcon = document.querySelector('#cart-icon')
const storagedCart = localStorage.getItem('cart')
const cart = storagedCart === '' || storagedCart === null || storagedCart === undefined || storagedCart === '[]' ? [] : JSON.parse(storagedCart)
let currentImageIndex = 0;




const displayImage = (index)=>{
  const imageUrl = gallery[index].getAttribute('data-image')
  const price = gallery[index].getAttribute('image-price')
  
  darkboxImage.setAttribute('src', imageUrl)
  productPrice.innerHTML = `R$ ${price}`
  currentImageIndex = index
}

gallery.forEach((image, index)=>{
  image.addEventListener('click', ()=>{
    displayImage(index)
    darkbox.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }) 
})

buyBtn.onclick = ()=>{
  const imageUrl = gallery[currentImageIndex].getAttribute('data-image')
  const price = gallery[currentImageIndex].getAttribute('image-price')
  const cartObj = {
    id: `${Date.now()}-${Math.random().toString(16)}`,
    product: imageUrl,
    price
  }

  const existingItem = cart.findIndex(item => item.product === imageUrl)

  if(existingItem === -1){
    cart.push(cartObj)
    localStorage.setItem('cart', JSON.stringify(cart))
    location.href = '../cart/index.html'  
  }else{
    location.href = '../cart/index.html'
  }

  /* STORE IN COOKIES */
  document.cookie = `product${currentImageIndex}=${imageUrl} - R$ ${price}`
}

cartIcon.onclick = ()=>{
  const imageUrl = gallery[currentImageIndex].getAttribute('data-image')
  const price = gallery[currentImageIndex].getAttribute('image-price')
  const cartObj = {
    id: `${Date.now()}-${Math.random().toString(16)}`,
    product: imageUrl,
    price
  }

  const existingItem = cart.findIndex(item => item.product === imageUrl)

  if(existingItem === -1){
    cart.push(cartObj)
    localStorage.setItem('cart', JSON.stringify(cart))  
  }else{
    const decide = window.confirm('Você já adicionou esse produto. Verifique seu carrinho.')
    if(decide){
      location.href = '../cart/index.html'
    }
  }
}

closeButton.onclick = ()=>{
  darkbox.style.display = 'none'
  document.body.style.overflow = 'auto'
}

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && darkbox.style.display === 'block'){
    darkbox.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
})

prevButton.addEventListener('click', ()=>{
  if(currentImageIndex > 0){
    displayImage(currentImageIndex - 1)
  }
})

nextButton.addEventListener('click', ()=>{
  if(currentImageIndex < gallery.length - 1){
    displayImage(currentImageIndex + 1)
  }
})
