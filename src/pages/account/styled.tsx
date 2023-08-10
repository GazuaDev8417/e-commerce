import styled from 'styled-components'


export const Container = styled.div`
    .content{
        border-radius: 5px;
        box-shadow: 2px 2px 4px black;
        width: 20vw;
        padding: 5px 10px;
        margin: 10vh 0px 5vh 20px;

        @media(max-width: 600px){
            width: 50vw;
            font-size: 10pt;
        }
    }

    h4{
        @media(max-width: 600px){
            font-size: 12pt;
        }
    }

    .cart{
        margin: 0 20px 15px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @media(max-width: 600px){
            display: flex;
            flex-direction: column;
        }
    }

    .card{
        border-radius: 5px;
        box-shadow: 2px 2px 4px black;
        padding: 5px;
        margin: 5px;

        @media(max-width: 600px){
            width: 80vw;
        }
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

    button{
        @media(max-width: 600px){
            width: 30vw;
            font-size: 10pt;            
        }
    }

    .total{
        text-align: center;
        font-size: 20pt;

        @media(max-width: 600px){
            font-size: 12pt;
        }
    }
`
export const Line = styled.div`
    width: 100vw;
    border-bottom: 1px solid;    
`