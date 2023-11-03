//HUMBURGER MENU
const humburger = document.querySelector('#humburger')
//const moreBtn = document.querySelector('#moreBtn')


humburger.onclick = ()=>{
    const navBar = document.querySelector('.nav-bar')
    navBar.classList.toggle('active')
    humburger.classList.toggle('fa-times')
    
}

/* moreBtn.addEventListener('click', ()=>{
    location.href = 'pages/products/index.html#products'
}) */
