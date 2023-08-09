import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;

    .icon{
        font-size: 30pt;
        cursor: pointer;
    }

    .menu{
        position: absolute;
        top: 2vh;
        right: -10vw;
    }

    ul{
        list-style: none;
        background-image: linear-gradient(lightgray, gray);
        width: 10vw;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
    }

    ul .icon, img{
        margin-bottom: 25px;
    }

    ul .close{
        position: absolute;
        top: -0.5vh;
        left: 8.5vw;
        font-size: 15pt;
        cursor: pointer;
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