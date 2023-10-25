//HUMBURGER MENU

const humburger = document.querySelector('.humburger')
const inputEmail = document.querySelector('#inputEmail')
const btnShare = document.querySelector('#btn-share')

humburger.onclick = ()=>{
    const navBar = document.querySelector('.nav-bar')
    navBar.classList.toggle('active')
}

btnShare.addEventListener('click', async()=>{
    try{
        const shareData = {
            text: inputEmail.value
        }

        if(inputEmail.value === ''){
            alert('Preencha com seu endereço de email')
            return
        }

        if(!navigator.share || !navigator.canShare){
            alert('Navigador não suporta compartilhamento por desktop')
            return
        }
        
        await navigator.share(shareData)
    }catch(error){
        alert(error)
    }
})
