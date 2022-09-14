import { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../../components/Layout';
export default function About() {
    const store = useContext(StoreContext);
    console.log("store",store)
    return (
        <Content>
            <Title>Sobre</Title>

            {store && store.about && (<>
                <Text>{store.about}</Text>
            </>)}
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
    font-size: 1rem;
    font-weight: 500;
    text-align: justify;
    color: ${({ theme }) => theme.colors.primary};
`;
