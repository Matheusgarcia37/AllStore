import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
export default function NavbarAdmin( { children } ) {
    const { user } = useContext(AuthContext);
    return (
        <ContainerAdmin>
            <MenuBar>
                <Title>
                    <h1>Loja {user?.username}</h1>
                    <Items>
                        <Item>
                            <Link href="/admin/products">
                                <a>Produtos</a>
                            </Link>
                        </Item>
                    </Items>
                </Title>
            </MenuBar>
            {children}
        </ContainerAdmin>
    );
}

const ContainerAdmin = styled.div`
    display: flex;
`;
const MenuBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 250px;
    background-color: black;
`;
const Title = styled.div`
    h1 {
        font-size: 1.2rem;
        color: white;
    }
`;
const Items = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a {
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        text-decoration: none;
        :hover {
            opacity: 0.8;
        }
    }
`;