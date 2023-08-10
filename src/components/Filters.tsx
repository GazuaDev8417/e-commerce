import { FunctionComponent } from 'react'
import { FilterProps } from '../interfaces/interfaces'


const Filters:FunctionComponent<FilterProps> = (props)=>{    

    return(
        <div className='border border-2 p-2 shadow-lg rounded'>
            <h3>Filtros</h3>
            Valor mínimo:
            <input className='form-control' 
                type="number" 
                min='1'
                value={props.minFilter}
                onChange={props.handleMinFilter}/>
            Valor máximo:
            <input className='form-control' 
                type="number"
                min='1'
                value={props.maxFilter}
                onChange={props.handleMaxFilter}/>
            Busca por nome:
            <input className='form-control' 
                type="text"
                value={props.nameFilter}
                onChange={props.handleNameFilter}/>
        </div>
    )
}

export default Filters