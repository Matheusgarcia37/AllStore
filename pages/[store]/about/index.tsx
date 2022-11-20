import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../../components/Layout';
export default function About() {
    const store = useContext(StoreContext);
    console.log("store",store)

    useEffect(() => {
        if(store){
            const setText = () => {
                const textDiv = document.getElementById('bodyText');
                const fullTextFormatted = store.about.replace(/.+/g, "<div class='rslines'>$&</div>");
                textDiv.innerHTML = fullTextFormatted;
            }
            setText();
        }
    }, [store])
    return (
        <Content>
            <Title>Sobre</Title>

            <Text id="bodyText">

            </Text>
        </Content>
    );
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    //padding: 2rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
`;

const Text = styled.text`
    font-size: 1.2rem;
    font-weight: 500;
    text-align: justify;
    color: ${({ theme }) => theme.colors.primary};
    //text-shadow: 0px 0px 2px ${({ theme }) => theme.colors.secondary};
    .rslines {
        text-indent: 3ch;
        margin-bottom: 1rem;
    }

    padding: 1rem;
    margin-bottom: 25px;
    //sombra
    border-radius: 1rem;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
`;
