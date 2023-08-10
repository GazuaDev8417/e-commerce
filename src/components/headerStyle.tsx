import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;

    h1{
        @media(max-width: 600px){
            font-size: 15pt;
        }
    }

    .icon{
        font-size: 30pt;
        cursor: pointer;

        @media(max-width: 600px){
            font-size: 15pt;
        }
    }

    .menu{
        position: absolute;
        top: 2vh;
        right: -10vw;

        @media(max-width: 600px){
            top: -40vw;
        }

        @media(max-width: 300px){
            right: -30vw;
        }
    }

    ul{
        list-style: none;
        background-image: linear-gradient(lightgray, gray);
        width: 10vw;
        padding: 10px;
        text-align: center;
        border-radius: 5px;

        @media(max-width: 600px){
            width: 30vw;
        }

        @media(max-width: 300px){
            width: 30vw;
        }
    }

    ul .icon, img{
        margin-bottom: 25px;
    }

    ul .close{
        position: absolute;
        top: -0.5vh;
        left: 8vw;
        font-size: 20pt;
        cursor: pointer;

        @media(max-width: 600px){
            left: 23vw;
        }

        @media(max-width: 300px){
            left: 23.5vw;
        }
    }

    li{
        cursor: pointer;
        margin: 5px;
        text-align: left;
    }

    li:hover{
        background-color: lightgray;
        border-radius: 5px;
        padding-left: 5px;
    }

    img{
        width: 50px;
        cursor: pointer;
        border-radius: 50%;
        border: 1px solid;
    }
`