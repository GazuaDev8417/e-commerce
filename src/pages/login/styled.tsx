import styled from 'styled-components'


export const Top = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 10px;

    h1{
        @media(max-width: 600px){
            font-size: 15pt;
        }
    }

    .icon{
        cursor: pointer;
        font-size: 30pt;

        @media(max-width: 600px){
            font-size: 12pt;
        }
    }
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    form{
        margin-top: 10vh;
    }

    legend{
        text-align: center;
        margin-bottom: 40px;
    }

    input{
        width: 30vw;
        margin: 10px 0;
        border: 1px solid;

        @media(max-width: 600px){
            width: 70vw;
        }
    }

    .btn-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    input[type='reset'], button{
        width: 10vw;

        @media(max-width: 600px){
            width: 30vw;
        }
    }
`
export const Bottom = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
`
