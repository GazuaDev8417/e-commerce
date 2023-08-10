import styled from 'styled-components'


export const Container = styled.div`
    .content{
        border-radius: 5px;
        box-shadow: 2px 2px 4px black;
        width: 20vw;
        padding: 5px 10px;
        margin: 10vh 0px 5vh 20px;
    }

    .cart{
        margin: 0 20px 15px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .card{
        border-radius: 5px;
        box-shadow: 2px 2px 4px black;
        padding: 5px;
        margin: 5px;
    }

    .btn-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .icon{
        font-size: 30pt;
        cursor: pointer;
    }

    .total{
        text-align: center;
        font-size: 20pt;
    }
`
export const Line = styled.div`
    width: 100vw;
    border-bottom: 1px solid;    
`