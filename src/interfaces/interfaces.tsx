export interface IProductsInCart{
    id:string
    name:string
    price:number
    productId:string
    quantity:number
  }

export interface ProductsProps{
    minFilter:number
    maxFilter:number
    nameFilter:string
    getProductsInCart: ()=> void
}

export interface IProducts{
    id:string
    name:string
    photo:string
    price:number
}

export interface FilterProps{
    minFilter:number
    maxFilter:number
    nameFilter:string
    handleMinFilter:React.ChangeEventHandler<HTMLInputElement> | undefined
    handleMaxFilter:React.ChangeEventHandler<HTMLInputElement> | undefined
    handleNameFilter:React.ChangeEventHandler<HTMLInputElement> | undefined
}

export interface CartProps{
    getProductsInCart: ()=> void
    productsInCart:IProductsInCart[]
  }