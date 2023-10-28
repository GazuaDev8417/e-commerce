const gallery = Array.from(document.querySelectorAll('.image-gallery'))
const darkbox = document.getElementById("darkbox")
const darkboxImage = document.getElementById("darkbox-image")
const closeButton = document.getElementById("close-button")
const prevButton = document.getElementById("prev-button")
const nextButton = document.getElementById("next-button")
let currentImageIndex = 0;



const displayImage = (index)=>{
  const imageUrl = gallery[index].getAttribute('data-image')
  darkboxImage.setAttribute('src', imageUrl)
  currentImageIndex = index
}


gallery.forEach((image, index)=>{
  image.addEventListener('click', ()=>{
    displayImage(index)
    darkbox.style.display = 'block'
    document.body.style.overflow = 'hidden'
  })
})


closeButton.onclick = ()=>{
  darkbox.style.display = 'none'
}

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