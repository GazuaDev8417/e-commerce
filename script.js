//HUMBURGER MENU
const humburger = document.querySelector('#humburger')



humburger.onclick = ()=>{
    const navBar = document.querySelector('.nav-bar')
    navBar.classList.toggle('active')
    humburger.classList.toggle('fa-times')    
}
