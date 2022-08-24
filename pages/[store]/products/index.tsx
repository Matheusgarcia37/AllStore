import { useState } from 'react';
import styled from 'styled-components';
export default function Index () {
    const [products, setProducts] = useState([]);

    const [skip, setSkip] = useState(0);
    const limit = 10;

    return (
        <Container>
            <RightSpace>
                <Categorias>
                    <h1>Categorias</h1>
                    <ul>
                        <li>
                            <a href="#">Categoria 1</a>
                        </li>
                        <li>
                            <a href="#">Categoria 2</a>
                        </li>
                        <li>
                            <a href="#">Categoria 3</a>
                        </li>
                        <li>
                            <a href="#">Categoria 4</a>
                        </li>
                    </ul>
                </Categorias>
            </RightSpace>
            <LeftSpace>
                <HeaderPage>
                    <h1>Resultados</h1>
                </HeaderPage>
                <Products>
                    <ul>
                        {products.map((produto) => (
                        <li key={produto.id}>
                            <img src={"https://picsum.photos/200/300"} alt={produto.name} />
                            <strong>{produto.name}</strong>
                            <span>{produto.price}</span>
                        </li>
                        ))}
                    </ul>
                </Products>
            </LeftSpace>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
`;

const RightSpace = styled.div`
    width: 20%;
    height: 100%;
    position: relative;
    margin-right: 1rem;
`;

const LeftSpace = styled.div`
    width: 80%;
    height: 100%;
    position: relative;
    margin-left: 1rem;
`;

const Categorias = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    h1 {

    }
    ul {
        list-style: none;
        li {
            a {
                display: block;
                padding: 1rem;
                font-size: 1rem;
                font-weight: bold;
                color: black;
                text-transform: uppercase;
                text-decoration: none;
                border-bottom: 1px solid #ccc;
                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }
`;

const HeaderPage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
    //shadow
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    h1 {

    }
`;

export const Products = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    h2 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: ${({ theme }) => theme.colors.secondary};
    }
    ul {
        margin-left: 0;
        padding-left: 0;
        display: grid;
        justify-items: center;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            cursor: pointer;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            img {
                width: 150px;
                height: 150px;
                object-fit: cover;
            }
            strong {
                font-size: 1.2rem;
                font-weight: bold;
            }
            p {
                font-size: 1rem;
                margin-top: 5px;
            }
        }
    }
`;
